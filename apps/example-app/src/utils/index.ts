import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createConfig } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import { localhost, mainnet } from '@wagmi/core/chains'

export const chains = [localhost, mainnet]
export const projectId = '878dce5d1117482fcf857ecf7c0768f8'

const { publicClient, webSocketPublicClient } = configureChains(chains, [publicProvider(), w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
  webSocketPublicClient,
})

export function initWeb3Modal() {
  const ethereumClient = new EthereumClient(wagmiConfig, chains)
  const web3Modal = new Web3Modal({ projectId }, ethereumClient)
  return { ethereumClient, web3Modal }
}
