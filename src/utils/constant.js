import mint from "./MintNFT.json";
import mint2 from "./MintNFT2.json";
import mint3 from "./MintNFT3.json";
import token from "./BEP20.json";
import dsltestnet from "./DSLTestnet.json";
// import dslmainnet from "./DSLMainnet.json";
// import usdsc from "./USDSC.json";
import S39 from "./S39.json";
import Quest from "./Quest.json";
import busd from "./BUSDTestnet.json";

export const mintAddressTestnet = "0x128481da51fAc2b63B47DA9b4373E243bbc0009e";
export const mintABITestnet = mint.abi;

export const mintAddressTestnet2 = "0x306dB735E92849DA511D6278b34F81ffB44069e0";
export const mintABITestnet2 = mint2.abi;

export const mintAddressTestnet3 = "0x2995E3bd041E4C737537f033ca608713414E0e3e"; //certificatemint
export const mintABITestnet3 = mint3.abi;

export const RPC = "https://data-seed-prebsc-1-s1.binance.org:8545";

export const chainId = "97";

export const USDSCtokenAddressTestnet =
  "0x8d671b650248B4BfaF411CB36Cc1C8bD8429F2A3";
export const USDSCtokenABITestnet = token.abi;

export const DSLtokenAddressTestnet =
  "0x203507762cF4B63bFEF530a87497c7F5FDad7b0B";
export const DSLtokenABITestnet = dsltestnet.abi;

// export const USDSCtokenAddressMainnet =
//   "0x13b852e276f10281C72ccF33EdF81d81DD198Aae";
// export const USDSCtokenABIMainnet = usdsc.abi;

// export const DSLtokenAddressMainnet =
//   "0x4A1530Fb85BdB9250Db2bE251584874179eB8Dc5";
// export const DSLtokenABIMainnet = dslmainnet.abi;

export const S39tokenAddressTestnet =
  "0x80aAeA2450F81a67fcEB2dEDABCbC57ebF346Ee7";
export const S39tokenABITestnet = S39.abi;

export const QuesttokenAddressTestnet =
  "0x5C6e946b94b2c79563b1fB2B73bD60bB7bd0Cf5B";
export const QuesttokenABITestnet = Quest.abi;

export const BUSDtokenAddressTestnet =
  "0xEB35Fc2712C2fD4Fe4B484f815564880774153E6";
export const BUSDtokenABITestnet = busd.abi;
