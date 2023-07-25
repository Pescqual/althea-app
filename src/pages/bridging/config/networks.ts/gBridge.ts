import { ETHMainnet } from "global/config/networks";
import { GravityBridgeNetwork } from "../bridgingInterfaces";
import { ADDRESSES } from "global/config/addresses";
import { TOKENS } from "global/config/tokenInfo";

enum MainnetGBridgeNetworks {
  ETH = "ETH",
}
type GBridgeNetworkData = {
  [key in MainnetGBridgeNetworks]: GravityBridgeNetwork;
};

const GBRIDGE_MAIN_NETWORKS: GBridgeNetworkData = {
  [MainnetGBridgeNetworks.ETH]: {
    ...ETHMainnet,
    gravityBridgeAddress: ADDRESSES.ETHMainnet.GravityBridge,
    wethAddress: ADDRESSES.ETHMainnet.WETH,
    tokens: {
      toAlthea: [
        TOKENS.ETHMainnet.USDC,
        TOKENS.ETHMainnet.USDT,
        TOKENS.ETHMainnet.WETH,
        TOKENS.ETHMainnet.WSTETH,
      ],
      fromAlthea: [],
    },
  },
};
const GBRIDGE_TEST_NETWORKS = {};

export { GBRIDGE_MAIN_NETWORKS, GBRIDGE_TEST_NETWORKS };
