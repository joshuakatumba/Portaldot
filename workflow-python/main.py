import os
import json
import requests
from dotenv import load_dotenv

# Assuming portaldot-sdk follows standard Substrate python library patterns
# (Based on the documentation outline provided earlier)
from sdk_interface.contracts import ContractInterface
from sdk_interface.base import Keypair

load_dotenv()

PORTALDOT_RPC = os.getenv("WESTEND_ASSET_HUB_RPC_URL", "wss://testnet.portaldot.io")
VAULT_ADDRESS = os.getenv("VAULT_ADDRESS", "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY")
ACURAST_SECRET = os.getenv("PRIVATE_KEY", "//Alice")

def get_best_yield_strategy():
    """
    Mock function to determine the best yield strategy.
    In production, this queries external APIs or the LendDot pool.
    """
    print("Evaluating current yield strategies...")
    # 1 = LendDot Stablecoin Strategy
    best_strategy = 1
    projected_apy = 500  # 5.00%
    return best_strategy, projected_apy

def main():
    print(f"Connecting to Portaldot Hub TestNet at {PORTALDOT_RPC}")
    
    # Initialize the Acurast TEE Keypair (Authorized Proxy)
    keypair = Keypair.create_from_uri(ACURAST_SECRET)
    print(f"Acurast Proxy Address: {keypair.ss58_address}")

    strategy, apy = get_best_yield_strategy()

    # Load the GhostFundVault ink! metadata (ABI)
    metadata_path = "../contracts-ink/ghostfund_vault/target/ink/ghostfund_vault.json"
    if not os.path.exists(metadata_path):
        print(f"Warning: Metadata file not found at {metadata_path}. Please compile the ink! contract first.")
        # Proceeding with mock data for demonstration purposes if missing
        return

    with open(metadata_path, 'r') as f:
        metadata = json.load(f)

    # Initialize the Portaldot Contract Interface
    contract = ContractInterface(
        url=PORTALDOT_RPC,
        address=VAULT_ADDRESS,
        metadata_dict=metadata
    )

    print(f"Reporting Strategy: {strategy} with APY: {apy / 100}%")
    
    # Pack the report data (4 bytes strategy, 4 bytes APY)
    report_data = strategy.to_bytes(4, byteorder='big') + apy.to_bytes(4, byteorder='big')
    
    # Submit the on_report extrinsic to the ink! contract
    receipt = contract.call(
        keypair=keypair,
        function_name="on_report",
        args={"report_data": list(report_data)}
    )

    if receipt.is_success:
        print(f"✅ Yield Strategy Updated Successfully. TxHash: {receipt.extrinsic_hash}")
    else:
        print(f"❌ Failed to update yield strategy: {receipt.error_message}")

if __name__ == "__main__":
    main()
