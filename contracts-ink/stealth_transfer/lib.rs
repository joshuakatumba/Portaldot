#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod stealth_transfer {
    use ink::prelude::vec::Vec;

    #[ink(storage)]
    pub struct StealthTransfer {
        owner: AccountId,
    }

    #[ink(event)]
    pub struct Announcement {
        #[ink(topic)]
        scheme_id: u256,
        #[ink(topic)]
        stealth_address: AccountId,
        #[ink(topic)]
        caller: AccountId,
        ephemeral_pub_key: Vec<u8>,
        metadata: Vec<u8>,
    }

    // Since u256 is not native to ink!, we'll use a 32-byte array representation
    pub type u256 = [u8; 32];

    impl StealthTransfer {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                owner: Self::env().caller(),
            }
        }

        #[ink(message, payable)]
        pub fn announce(
            &mut self,
            scheme_id: u256,
            stealth_address: AccountId,
            ephemeral_pub_key: Vec<u8>,
            metadata: Vec<u8>,
        ) {
            let caller = Self::env().caller();
            let value = Self::env().transferred_value();

            // Transfer native token to the stealth address
            if value > 0 {
                if Self::env().transfer(stealth_address, value).is_err() {
                    panic!("Stealth transfer failed");
                }
            }

            Self::env().emit_event(Announcement {
                scheme_id,
                stealth_address,
                caller,
                ephemeral_pub_key,
                metadata,
            });
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn default_works() {
            let mut stealth = StealthTransfer::new();
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            
            let scheme_id = [1u8; 32];
            let pub_key = ink::prelude::vec![1, 2, 3];
            let meta = ink::prelude::vec![4, 5, 6];

            ink::env::test::set_value_transferred::<ink::env::DefaultEnvironment>(100);
            
            // Should not panic
            stealth.announce(scheme_id, accounts.bob, pub_key, meta);
        }
    }
}
