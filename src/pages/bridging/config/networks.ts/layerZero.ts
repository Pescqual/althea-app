import { LayerZeroNetwork } from "../bridgingInterfaces";
import {
  AltheaTestnet,
  FantomTestnet,
  MumbaiTestnet,
  GoerliTestnet,
  AvalancheTestnet,
  OptimismTestnet,
  AltheaMainnet,
  ETHMainnet,
} from "global/config/networks";
import { ALTHEA_OFT } from "../tokens.ts/layerZeroTokens";
enum TestnetLZNetworks {
  ALTHEA_TEST = "ALTHEA_TEST",
  MUMBAI_TEST = "MUMBAI_TEST",
  FANTOM_TEST = "FANTOM_TEST",
  GOERLI_TEST = "GOERLI_TEST",
  AVALANCHE_TEST = "AVALANCHE_TEST",
  OPTIMISM_TEST = "OPTIMISM_TEST",
}
type LZTestNetworkData = {
  [key in TestnetLZNetworks]: LayerZeroNetwork;
};

const LAYER_ZERO_TEST_NETWORKS: LZTestNetworkData = {
  [TestnetLZNetworks.ALTHEA_TEST]: {
    ...AltheaTestnet,
    lzChainId: 10159,
    tokens: {
      toAlthea: [],
      fromAlthea: [],
    },
  },
  [TestnetLZNetworks.MUMBAI_TEST]: {
    ...MumbaiTestnet,
    lzChainId: 10109,
    tokens: {
      toAlthea: [ALTHEA_OFT("0x6175a322E284E6a5ff5f8BcdBE82d30B047E22d4", false)],
      fromAlthea: [
        ALTHEA_OFT("0x6175a322E284E6a5ff5f8BcdBE82d30B047E22d4", true),
      ],
    },
  },
  [TestnetLZNetworks.FANTOM_TEST]: {
    ...FantomTestnet,
    lzChainId: 10112,
    tokens: {
      toAlthea: [ALTHEA_OFT("0x6175a322E284E6a5ff5f8BcdBE82d30B047E22d4", false)],
      fromAlthea: [
        ALTHEA_OFT("0x6175a322E284E6a5ff5f8BcdBE82d30B047E22d4", true),
      ],
    },
  },
  [TestnetLZNetworks.GOERLI_TEST]: {
    ...GoerliTestnet,
    lzChainId: 10121,
    tokens: {
      toAlthea: [ALTHEA_OFT("0xd310F11Fb1bdd95568a5dB507a891946ec23642D", false)],
      fromAlthea: [
        ALTHEA_OFT("0x6175a322E284E6a5ff5f8BcdBE82d30B047E22d4", true),
      ],
    },
  },
  [TestnetLZNetworks.AVALANCHE_TEST]: {
    ...AvalancheTestnet,
    lzChainId: 10106,
    tokens: {
      toAlthea: [ALTHEA_OFT("0x6175a322E284E6a5ff5f8BcdBE82d30B047E22d4", false)],
      fromAlthea: [
        ALTHEA_OFT("0x6175a322E284E6a5ff5f8BcdBE82d30B047E22d4", true),
      ],
    },
  },
  [TestnetLZNetworks.OPTIMISM_TEST]: {
    ...OptimismTestnet,
    lzChainId: 10132,
    tokens: {
      toAlthea: [ALTHEA_OFT("0x6175a322E284E6a5ff5f8BcdBE82d30B047E22d4", false)],
      fromAlthea: [
        ALTHEA_OFT("0x6175a322E284E6a5ff5f8BcdBE82d30B047E22d4", true),
      ],
    },
  },
};
enum MainnetLZNetworks {
  ALTHEA_MAIN = "ALTHEA_MAIN",
  ETH_MAIN = "ETH_MAIN",
}
type LZMainNetworkData = {
  [key in MainnetLZNetworks]: LayerZeroNetwork;
};
const LAYER_ZERO_MAIN_NETWORKS: LZMainNetworkData = {
  [MainnetLZNetworks.ALTHEA_MAIN]: {
    ...AltheaMainnet,
    lzChainId: 159,
    tokens: {
      toAlthea: [],
      fromAlthea: [],
    },
  },
  [MainnetLZNetworks.ETH_MAIN]: {
    ...ETHMainnet,
    lzChainId: 101,
    tokens: {
      toAlthea: [ALTHEA_OFT("0x56C03B8C4FA80Ba37F5A7b60CAAAEF749bB5b220", false)],
      fromAlthea: [
        ALTHEA_OFT("0x56C03B8C4FA80Ba37F5A7b60CAAAEF749bB5b220", true),
      ],
    },
  },
};

export { LAYER_ZERO_TEST_NETWORKS, LAYER_ZERO_MAIN_NETWORKS };
