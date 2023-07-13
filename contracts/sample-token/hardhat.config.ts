import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "hardhat-abi-exporter";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  abiExporter: {
    path: "./abis",
    runOnCompile: true,
    clear: true,
    spacing: 2,
    pretty: true,
  }
};

export default config;
