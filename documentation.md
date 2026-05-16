# GhostFund: Comprehensive Technical Documentation

## 1. Executive Summary

**GhostFund** is a next-generation, compliant private DeFi yield vault built on the **Portaldot Dual-VM** ecosystem. It bridges the robust security of Rust-based `ink!` smart contracts with the deep liquidity of EVM-based DeFi protocols. 

The primary objective of GhostFund is to provide a seamless, automated yield-generation experience for users while strictly enforcing compliance policies at the smart-contract level and offering a privacy-preserving stealth withdrawal mechanism. GhostFund eliminates the need for manual portfolio rebalancing while giving users cryptographic guarantees over their financial privacy.

---

## 2. System Architecture

The GhostFund architecture is uniquely designed to leverage Portaldot's capabilities:

### 2.1 Dual-VM Integration
Portaldot runs both a Substrate-native Wasm VM and an Ethereum Virtual Machine (EVM) in parallel. GhostFund operates at the intersection of these two environments:
- **`ink!` Contracts (Wasm):** Serve as the entry point and core logic layer. They handle user deposits, compliance checks, and privacy features.
- **EVM Protocols (Solidity):** GhostFund interacts directly with EVM-based liquidity pools (like LendDot/Aave) via native Substrate Cross-VM (XVM) calls, allowing the Rust contracts to seamlessly deploy and retrieve capital from Solidity contracts.

### 2.2 Off-chain Automation (Acurast TEE & Relayer)
To automate yield without requiring a human-in-the-loop for every rebalance:
- An **Acurast Trusted Execution Environment (TEE)** runs scheduled cron jobs (e.g., every 5 minutes).
- The TEE queries market APY data across various protocols.
- A **Python-based Relayer**, utilizing the Portaldot SDK, processes this data and submits a secure Substrate transaction (`on_report`) to the `ink!` Vault, updating the optimal yield strategy.

### 2.3 Frontend Application
The user interface is a modern **React + Vite + TypeScript** application featuring a high-fidelity "Industrial Cypherpunk" design system with glassmorphism UI elements. 
- **Web3Context:** Manages wallet connections and network states via `ethers.js` (and Polkadot.js extensions for native Substrate interactions).
- **Responsive Design:** Utilizes a custom CSS grid and unified component structure for a premium user experience.

---

## 3. Core Workflows (The Lifecycle)

### 3.1 Policy Engine (Compliance)
Before any capital enters the vault, it must pass through the `PortaldotPolicyEngine`. This modular compliance layer enforces rules configured by protocol administrators:
- **Allowlist Policy:** Verifies that the depositor's wallet is KYC/AML approved or explicitly authorized to interact with the vault.
- **Max Deposit Policy:** Prevents whale manipulation by enforcing per-transaction and total-value-locked (TVL) deposit caps.
- **Pause Policy:** Acts as an emergency circuit breaker that can instantly freeze all deposits in the event of a critical vulnerability or market crash.

### 3.2 Automated Yield Strategy
Once deposited, funds are aggressively optimized for yield:
1. **Market Analysis:** The off-chain Acurast TEE calculates the best available APY (e.g., comparing LendDot vs. other lending markets).
2. **Strategy Update:** The Python Relayer calls the `ink!` Vault with the new strategy data.
3. **Cross-VM Rebalancing:** The `ink!` Vault automatically executes an XVM call to withdraw funds from the underperforming EVM protocol and deposit them into the higher-yielding EVM protocol. This all happens natively within the Portaldot consensus layer.

### 3.3 Privacy Engine (Stealth Transfers)
GhostFund implements a privacy-preserving withdrawal system based on an adaptation of the **ERC-5564** stealth address standard for Substrate SS58 addresses.
- **Ephemeral Keys:** Instead of withdrawing to a publicly known address, the GhostFund frontend generates a one-time stealth address.
- **On-Chain Announcement:** The `StealthTransfer` module emits a public event containing an ephemeral public key.
- **Off-Chain Scanning:** The recipient's wallet scans the blockchain for these announcements, silently deriving the private key required to unlock the funds. This completely breaks the on-chain link between the original depositor and the final recipient.

---

## 4. Component Breakdown

### 4.1 Frontend Structure (`/frontend`)
- `src/components/`: Contains modular UI elements (`Header.tsx`, `Navigation.tsx`, `Layout.tsx`).
- `src/context/`: Contains the `Web3Context.tsx` for managing global wallet state, chain listeners, and connection logic.
- `src/pages/`: Main application views (`Dashboard.tsx`, `Stealth.tsx`, `Activity.tsx`, `Admin.tsx`).
- `src/index.css`: Global stylesheet implementing the unified glassmorphism design system.

### 4.2 Smart Contracts (`/contracts-ink` & `/contracts`)
- **`GhostFundVault`:** The central `ink!` contract managing deposits, XVM interactions, and yield accounting.
- **`PortaldotPolicyEngine`:** The compliance router validating all inbound transactions.
- **`StealthTransfer`:** The privacy module handling stealth address announcements and registry.

### 4.3 Automation Scripts (`/workflow-python`)
- **`main.py`:** The core Python script utilizing the Portaldot SDK to relay Acurast TEE data to the blockchain.

---

## 5. Getting Started & Development Guide

### 5.1 Prerequisites
- Node.js (v18+) and `npm`
- Rust toolchain (`cargo`, `rustup`) with the `wasm32-unknown-unknown` target
- Python 3.10+
- Polkadot.js browser extension and MetaMask

### 5.2 Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
The application will be available at `http://localhost:5173`. Ensure your Web3 wallet is configured for the Portaldot network.

### 5.3 Smart Contract Development
```bash
# Navigate to the ink! contracts directory
cd contracts-ink

# Build the contracts
cargo contract build
```

### 5.4 Running the Python Relayer
```bash
# Navigate to the workflow directory
cd workflow-python

# Install dependencies
pip install -r requirements.txt

# Execute the relayer script
python main.py
```
