# GhostFund — Technical Design Record (TDR)
## Portaldot Ecosystem Adaptation (Dual-VM)

**Version:** 3.0.0  
**Date:** 2026-05-12  
**Status:** In Progress  
**Author:** GhostFund Team  

---

## 1. Context & Motivation

GhostFund v1 was built on **Ethereum Sepolia** for the Chainlink Convergence Hackathon 2026,
combining three Chainlink primitives:

| Primitive | Role |
|---|---|
| Chainlink CRE | Cron-triggered off-chain yield monitoring workflow |
| Aave V3 | Lending protocol for idle vault token yield |
| Chainlink Private Transactions | Shielded EIP-712 sender-private fund distribution |
| Chainlink ACE | On-chain compliance enforcement (allowlist, cap, pause) |

GhostFund v3 completely reimagines this architecture to achieve **maximum technical depth and ecosystem alignment** on **Portaldot**. It pivots away from standard EVM development, embracing a **Dual-VM** architecture utilizing native **Rust / `ink!`** contracts and Portaldot's Cross-VM interaction capabilities.

---

## 2. Ecosystem Mapping

| v1 (Ethereum / Chainlink) | v3 (Portaldot Native Dual-VM) | Rationale |
|---|---|---|
| Ethereum Sepolia | **Portaldot Testnet** (ink! + PVM) | Maximizes ecosystem alignment by utilizing Portaldot's native smart contract frameworks. |
| Chainlink CRE | **Acurast & Portaldot Python SDK** | Acurast triggers off-chain workflows, and the Portaldot Python SDK relays the fulfillment to the `ink!` contract. |
| Aave V3 (Sepolia) | **LendDot** | Portaldot's native lending protocol built for dual-VM (Solidity-to-PVM) interactions. |
| Chainlink Private Transactions | **StealthTransfer** (ink!) | Custom Substrate-compatible stealth address scheme provides sender unlinkability. |
| Chainlink ACE (4 contracts) | **PortaldotPolicyEngine** (ink!) | Self-contained `ink!` compliance engine module. No external dependency. |
| MetaMask + ethers.js | **SubWallet / Talisman + Python SDK** | Native interaction with Substrate extrinsics and `ink!` WASM modules. |
| Foundry + Sepolia | **cargo-contract** | Native Rust toolchain for `ink!` smart contracts. |

---

## 3. Architecture

```
                    Acurast TEE Job (off-chain) / Python SDK
                    =========================================
                    Cron: every 5 minutes
                    Reads: LendDot APY via RPC
                    Logic: threshold + hysteresis + dust guard
                           |
                           | fulfillment() → Submits Substrate Extrinsic
                           v
           +----------------------------------+
           |       GhostFundVault             |
           |   (Portaldot Testnet - ink!)     |
           |----------------------------------|
           | Stores Recommendation            |
           | Owner calls userApprove()        |
           | Cross-VM calls to LendDot        |
           +----------------------------------+
                |                       |
      deposit   | Cross-VM call         | announce()
                v                       v
    +--------------------+   +------------------------+
    | LendDot Protocol   |   | StealthTransfer        |
    | (Solidity EVM/PVM) |   | (ink!)                 |
    | yield generation   |   | SS58 stealth addresses |
    +--------------------+   +------------------------+
                                        |
                              +---------+---------+
                              | PolicyEngine      |
                              | (ink!)            |
                              | AllowlistPolicy   |
                              | MaxPolicy         |
                              | PausePolicy       |
                              +-------------------+
```

---

## 4. Key Design Decisions

### 4.1 Native `ink!` vs `pallet-revive` (EVM)

**Decision:** Rewrite contracts in native Rust / `ink!`.

**Rationale:**
- For hackathon execution, demonstrating the ability to write native Substrate `ink!` contracts showcases a deeper commitment and technical integration with the core stack.
- The Vault, written in `ink!`, performs cross-VM execution (XVM) to call the `LendDot` EVM protocol, demonstrating Portaldot's shared address space capabilities.

### 4.2 Acurast + Python SDK vs Chainlink CRE

**Decision:** Combine Acurast for scheduling/TEE security with Portaldot's Python SDK for execution.

- Acurast handles the scheduled execution environment (via its native JS/TS runner or external webhooks).
- The `workflow-python/main.py` uses the `portaldot-sdk` to properly encode and submit the Substrate extrinsics to the `ink!` contracts.

### 4.3 LendDot vs Aave V3

**Decision:** LendDot as the yield source.
- LendDot is specifically designed for Portaldot's dual-VM architecture.
- Instead of using a standard Aave fork, leveraging LendDot proves we can navigate Portaldot's unique execution environments (calling EVM/PVM from ink!).

### 4.4 Privacy: StealthTransfer (ink!)

**Decision:** Tier-A stealth address scheme adapted for `ink!`.
- Provides **address unlinkability** on Substrate.
- Events are emitted natively on Portaldot using `ink!` event structures, obfuscating the receiver while ensuring compliance gates are checked prior to announcements.

---

## 5. Contract Changes Summary

| Contract | Status | Change |
|---|---|---|
| `GhostFundVault` | **Rewritten** | Ported to Rust `ink!`. Manages balances, Acurast proxy authorization, and executes Cross-VM calls to LendDot. |
| `PortaldotPolicyEngine` | **Rewritten** | Ported to Rust `ink!`. Enforces Pause, Max Deposit, and Allowlist logic in a single module. |
| `StealthTransfer` | **Rewritten** | Ported to Rust `ink!`. Emits stealth payment announcements natively. |
| Legacy Solidity (`.sol`) | **Deleted** | All Foundry configurations and Solidity files removed. |

---

## 6. Workflow Changes

| File | Status | Change |
|---|---|---|
| `workflow-python/main.py` | **New** | Uses `portaldot-sdk` and `python-dotenv` to submit strategy fulfillment extrinsics to the `ink!` contract. |
| `workflow/workflow/main.ts` | **Deleted** | Legacy ethers.js script removed in favor of Python SDK. |

---

## 7. Security Model

- `on_report()` in `GhostFundVault` validates `env().caller()` against the configured `acurast_proxy` AccountId.
- Cross-VM calls to LendDot are isolated within the `rebalance_lend_dot` module to contain potential reentrancy via EVM.
- `PortaldotPolicyEngine` strictly enforces entry constraints before any native tokens are mapped or transferred.

---

## 8. Testing Strategy

```bash
# Build the ink! workspaces
cd contracts-ink/ghostfund_vault && cargo contract build
cd ../portaldot_policy_engine && cargo contract build
cd ../stealth_transfer && cargo contract build

# Run native ink! unit tests
cargo test

# Run the Python off-chain workflow
cd ../workflow-python
pip install -r requirements.txt
python main.py
```

---

## 9. Open Items

- [ ] Obtain the deployed `LendDot` EVM address on the Portaldot Testnet.
- [ ] Determine the exact XVM encoding format required by Portaldot to trigger the EVM call from `ink!`.
- [ ] Finalize Acurast job registration to trigger the Python relay server on schedule.
