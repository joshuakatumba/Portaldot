#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod portaldot_policy_engine {
    use ink::storage::Mapping;

    #[ink(storage)]
    pub struct PortaldotPolicyEngine {
        /// The owner of the policy engine
        owner: AccountId,
        /// Is the protocol paused?
        paused: bool,
        /// Mapping of users who are allowed to deposit
        allowlist: Mapping<AccountId, bool>,
        /// Maximum allowed deposit per transaction
        max_deposit: Balance,
    }

    impl PortaldotPolicyEngine {
        #[ink(constructor)]
        pub fn new(max_deposit: Balance) -> Self {
            Self {
                owner: Self::env().caller(),
                paused: false,
                allowlist: Mapping::default(),
                max_deposit,
            }
        }

        #[ink(message)]
        pub fn is_allowed(&self, user: AccountId, amount: Balance) -> bool {
            if self.paused {
                return false;
            }
            if amount > self.max_deposit {
                return false;
            }
            // If allowlist is enforced, the user must be true
            self.allowlist.get(user).unwrap_or(false)
        }

        #[ink(message)]
        pub fn set_paused(&mut self, paused: bool) {
            self.ensure_owner();
            self.paused = paused;
        }

        #[ink(message)]
        pub fn set_max_deposit(&mut self, max: Balance) {
            self.ensure_owner();
            self.max_deposit = max;
        }

        #[ink(message)]
        pub fn add_to_allowlist(&mut self, user: AccountId) {
            self.ensure_owner();
            self.allowlist.insert(user, &true);
        }

        #[ink(message)]
        pub fn remove_from_allowlist(&mut self, user: AccountId) {
            self.ensure_owner();
            self.allowlist.insert(user, &false);
        }

        fn ensure_owner(&self) {
            assert!(Self::env().caller() == self.owner, "Not owner");
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn default_works() {
            let engine = PortaldotPolicyEngine::new(1000);
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            
            // Initially not allowed
            assert_eq!(engine.is_allowed(accounts.alice, 500), false);
        }

        #[ink::test]
        fn allowlist_works() {
            let mut engine = PortaldotPolicyEngine::new(1000);
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            
            engine.add_to_allowlist(accounts.alice);
            assert_eq!(engine.is_allowed(accounts.alice, 500), true);
            
            // Fails max deposit
            assert_eq!(engine.is_allowed(accounts.alice, 1500), false);
        }
    }
}
