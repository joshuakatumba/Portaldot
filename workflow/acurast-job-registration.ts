/**
 * Acurast Job Registration Script — GhostFund Polkadot Edition
 *
 * Registers the GhostFund yield-monitoring job on the Acurast marketplace.
 * This is a one-time setup step. After registration, Acurast TEE processors
 * pick up the job and execute it on the configured schedule.
 *
 * Prerequisites:
 *   1. Install @acurast/cli: bun add -g @acurast/cli
 *   2. Fund your Acurast Consumer account with ACU tokens (testnet faucet)
 *   3. Fill in ACURAST_CONSUMER_ADDRESS and GHOSTFUND_VAULT_ADDRESS in .env
 *
 * Usage:
 *   bun run acurast-job-registration.ts
 *
 * After running, copy the returned proxy address into:
 *   .env → ACURAST_PROXY_ADDRESS
 *   contracts: call vault.setAcurastProxy(proxyAddress, true)
 */

import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Config ─────────────────────────────────────────────────
const VAULT_ADDRESS = process.env.GHOSTFUND_VAULT_ADDRESS
const CONSUMER_ADDRESS = process.env.ACURAST_CONSUMER_ADDRESS
const SCHEDULE = '0 */5 * * * *' // every 5 minutes

if (!VAULT_ADDRESS || !CONSUMER_ADDRESS) {
  console.error('Missing GHOSTFUND_VAULT_ADDRESS or ACURAST_CONSUMER_ADDRESS in environment')
  process.exit(1)
}

// Load the workflow script to upload to Acurast
const workflowScript = readFileSync(
  join(__dirname, 'workflow/main.ts'),
  'utf-8'
)

const workflowConfig = JSON.parse(
  readFileSync(join(__dirname, 'workflow/config.json'), 'utf-8')
)

// ── Job Registration Payload ────────────────────────────────
// This payload is submitted to the Acurast marketplace via the @acurast/cli
// or directly via the Acurast parachain extrinsic `acurast.register`.
//
// Reference: https://docs.acurast.com/developers/job-registration
const jobRegistration = {
  // The TypeScript script to run in the TEE
  script: workflowScript,

  // Inject config.json as job parameters (read by main.ts as _STD_.job.parameters)
  parameters: JSON.stringify(workflowConfig),

  // Schedule — same cron as the CRE workflow
  schedule: {
    startTime: Date.now() + 60_000, // start 1 minute from now
    endTime: Date.now() + 365 * 24 * 60 * 60 * 1000, // run for 1 year
    interval: 5 * 60 * 1000, // every 5 minutes in ms
  },

  // The on-chain contract that receives fulfillment() calls
  // Acurast will set msg.sender = proxy address when calling onReport()
  fulfillmentDestination: {
    chain: 'westend-asset-hub',
    address: VAULT_ADDRESS,
    // The function selector for GhostFundVault.onReport(bytes)
    selector: '0x' + Buffer.from('onReport(bytes)').slice(0, 4).toString('hex'),
  },

  // Reward per execution (in ACU, Acurast's native token)
  // Adjust based on gas cost on Westend Asset Hub
  rewardPerExecution: '1000000000000', // 1 ACU in planck units

  // Number of independent TEE processors to use (redundancy)
  minProcessors: 1,
  maxProcessors: 3,
}

// ── Output ─────────────────────────────────────────────────
console.log('\n=== Acurast Job Registration ===')
console.log('Consumer:  ', CONSUMER_ADDRESS)
console.log('Vault:     ', VAULT_ADDRESS)
console.log('Schedule:  ', SCHEDULE)
console.log('\nJob Registration Payload:')
console.log(JSON.stringify(jobRegistration, null, 2))

console.log('\n=== Next Steps ===')
console.log('1. Submit this payload via Acurast CLI:')
console.log('   acurast register --payload job-registration.json --network westend')
console.log('')
console.log('2. After registration, note the Acurast proxy address from the output.')
console.log('   Then update your vault:')
console.log('   cast send $GHOSTFUND_VAULT_ADDRESS "setAcurastProxy(address,bool)" \\')
console.log('     <PROXY_ADDRESS> true --rpc-url $WESTEND_ASSET_HUB_RPC_URL')
console.log('')
console.log('3. Update .env:')
console.log('   ACURAST_PROXY_ADDRESS=<PROXY_ADDRESS>')

// Write payload to file for CLI submission
import { writeFileSync } from 'fs'
writeFileSync('job-registration.json', JSON.stringify(jobRegistration, null, 2))
console.log('\nWrote job-registration.json')
