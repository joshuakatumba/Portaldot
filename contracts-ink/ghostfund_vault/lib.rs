#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod ghostfund_vault {
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    #[ink(storage)]
    pub struct GhostFundVault {
        /// Owner of the vault
        owner: AccountId,
        /// The Acurast proxy authorized to report recommendations
        acurast_proxy: AccountId,
        /// Total deposits per user
        balances: Mapping<AccountId, Balance>,
        /// Last recorded APY
        last_apy: u32,
        /// Target strategy ID
        current_strategy: u32,
    }

    #[ink(event)]
    pub struct Deposited {
        #[ink(topic)]
        user: AccountId,
        amount: Balance,
    }

    #[ink(event)]
    pub struct Withdrawn {
        #[ink(topic)]
        user: AccountId,
        amount: Balance,
    }

    #[ink(event)]
    pub struct ReportReceived {
        #[ink(topic)]
        strategy: u32,
        apy: u32,
    }

    impl GhostFundVault {
        /// Initializes the vault with an Acurast proxy address
        #[ink(constructor)]
        pub fn new(acurast_proxy: AccountId) -> Self {
            let caller = Self::env().caller();
            Self {
                owner: caller,
                acurast_proxy,
                balances: Mapping::default(),
                last_apy: 0,
                current_strategy: 0,
            }
        }

        /// Deposits native tokens into the vault
        #[ink(message, payable)]
        pub fn deposit(&mut self) {
            let caller = Self::env().caller();
            let value = Self::env().transferred_value();
            assert!(value > 0, "Deposit must be greater than 0");

            let balance = self.balances.get(caller).unwrap_or(0);
            self.balances.insert(caller, &(balance + value));

            Self::env().emit_event(Deposited {
                user: caller,
                amount: value,
            });
        }

        /// Withdraws all native tokens for the caller
        #[ink(message)]
        pub fn withdraw(&mut self) {
            let caller = Self::env().caller();
            let balance = self.balances.get(caller).unwrap_or(0);
            assert!(balance > 0, "No balance to withdraw");

            self.balances.remove(caller);

            // Transfer the native tokens back to the user
            if Self::env().transfer(caller, balance).is_err() {
                panic!("Transfer failed");
            }

            Self::env().emit_event(Withdrawn {
                user: caller,
                amount: balance,
            });
        }

        /// Called by the Acurast TEE proxy to report the latest optimal strategy
        #[ink(message)]
        pub fn on_report(&mut self, report_data: Vec<u8>) {
            let caller = Self::env().caller();
            assert!(caller == self.acurast_proxy, "Unauthorized Acurast proxy");
            assert!(report_data.len() >= 8, "Invalid report format");

            // Simple decoding for demonstration purposes:
            // First 4 bytes: strategy_id
            // Next 4 bytes: apy
            let mut strategy_bytes = [0u8; 4];
            strategy_bytes.copy_from_slice(&report_data[0..4]);
            let strategy_id = u32::from_be_bytes(strategy_bytes);

            let mut apy_bytes = [0u8; 4];
            apy_bytes.copy_from_slice(&report_data[4..8]);
            let apy = u32::from_be_bytes(apy_bytes);

            self.current_strategy = strategy_id;
            self.last_apy = apy;

            Self::env().emit_event(ReportReceived {
                strategy: strategy_id,
                apy,
            });

            // Here we would perform the Cross-VM call to the LendDot EVM contract
            // leveraging Portaldot's shared address space.
            self.rebalance_lend_dot(strategy_id);
        }

        /// Internal function to interact with LendDot EVM
        fn rebalance_lend_dot(&mut self, _strategy_id: u32) {
            // Note: In Portaldot, calling EVM from ink! involves constructing the
            // SCALE encoded parameters for `pallet-revive` or using a standard `invoke_contract`
            // call to the LendDot address on the shared space.
            // This is a placeholder for the cross-VM interaction.
        }

        /// Returns the caller's balance
        #[ink(message)]
        pub fn get_balance(&self) -> Balance {
            let caller = Self::env().caller();
            self.balances.get(caller).unwrap_or(0)
        }

        /// Returns the current strategy and APY reported by Acurast
        #[ink(message)]
        pub fn get_current_strategy(&self) -> (u32, u32) {
            (self.current_strategy, self.last_apy)
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn default_works() {
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            let vault = GhostFundVault::new(accounts.alice);
            assert_eq!(vault.get_current_strategy(), (0, 0));
        }

        #[ink::test]
        fn deposit_works() {
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            let mut vault = GhostFundVault::new(accounts.bob);
            
            ink::env::test::set_value_transferred::<ink::env::DefaultEnvironment>(100);
            vault.deposit();
            assert_eq!(vault.get_balance(), 100);
        }

        #[ink::test]
        fn report_works() {
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            // Set Alice as the Acurast Proxy
            let mut vault = GhostFundVault::new(accounts.alice);
            
            let mut report_data = Vec::new();
            report_data.extend_from_slice(&1u32.to_be_bytes()); // strategy 1
            report_data.extend_from_slice(&500u32.to_be_bytes()); // 500 APY

            vault.on_report(report_data);
            assert_eq!(vault.get_current_strategy(), (1, 500));
        }
    }
}
