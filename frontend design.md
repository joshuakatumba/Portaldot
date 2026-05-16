# GhostFund Frontend Design System

## 1. Design Direction Summary

- **Aesthetic Name:** *Industrial Cypherpunk*
- **DFII Score:** 14 (Excellent)
  - Impact: 4 (Highly memorable, thematic)
  - Context Fit: 5 (Perfect for a privacy-focused DeFi vault)
  - Feasibility: 4 (Heavily reliant on CSS grids and typography, highly feasible)
  - Performance: 3 (Minimal heavy assets, lightweight DOM)
  - Consistency Risk: -2 (Strict grid and monochromatic palette makes scaling very safe)
- **Key Inspiration:** Vintage hardware diagnostics screens, brutalist utilitarian architecture, and encrypted terminal interfaces.

## 2. Design System Snapshot

### Typography
- **Display Font:** `Space Mono` or `JetBrains Mono` (Geometric, monospace, evokes code, cryptography, and raw execution).
- **Body Font:** `Inter` (Restrained, highly legible for financial data and APY metrics).
- **Usage:** Monospace is used for all numbers, wallet addresses, and APYs to create a "data-first" tabular rhythm.

### Color & Theme
- **Dominant Tone:** Obsidian Black (`#0a0a0a`) background with stark, raw grid lines (`#1f1f1f`).
- **Accent Color:** Acid Green (`#bbf7d0`) for active yields, success states, and the interactive elements.
- **Neutral System:** Slate/Zinc grays (`#71717a` to `#d4d4d8`) for secondary text and disabled policies.
- **Rationale:** Avoids generic "Web3 purple/blue gradients". Feels like an internal administrative tool that the user has gained unauthorized access to.

### Spatial Composition
- **Layout:** Strict, exposed CSS grid layouts. 1px borders around every major component to emulate a dashboard or schematic blueprint.
- **Rhythm:** Dense data packing. Negative space is used to isolate the primary call-to-action (Deposit/Withdraw), while the rest of the screen is filled with active system logs.

### Motion Philosophy
- **Entrance:** Slices of the UI "boot up" or decrypt sequentially like a terminal starting.
- **Interaction:** Instant, sharp state changes. No bouncy easings. Hover states invert the colors (black text on Acid Green background) rather than shifting opacity.

## 3. Required Pages (Architecture)

As requested, here is the list of pages needed to build this application (no code):

1. **`/` (The Vault Dashboard)**
   - The primary interface.
   - Shows Total Value Locked (TVL), Current Active Strategy (LendDot), and live APY.
   - Contains the core "Deposit" and "Withdraw" input panels.

2. **`/stealth` (Privacy Transact)**
   - A dedicated, high-security themed page for the `StealthTransfer` module.
   - Inputs for the recipient's meta-address.
   - Visualizes the "encryption" process before broadcasting the SS58 stealth announcement.

3. **`/activity` (System Logs & Acurast Feed)**
   - A raw, terminal-style feed displaying the Acurast TEE reports in real-time.
   - Shows a historical log of when the Vault shifted strategies or when the Python SDK triggered an `on_report` extrinsic.

4. **`/admin` (Policy Control Center)**
   - Restricted access page (only connects if the wallet matches the `PortaldotPolicyEngine` owner).
   - Stark toggle switches for `Pause`, `Max Deposit` adjustments, and the `Allowlist` registry.

## 4. Differentiation Callout

> **This avoids generic UI by relying heavily on an exposed 1px grid layout and strict monospace typography instead of floating soft-shadow cards and purple mesh gradients. It treats the user interface like a raw data schematic rather than a marketing landing page.**
