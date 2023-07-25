import { BigNumber } from "ethers";
import { truncateNumber } from "global/utils/formattingNumbers";
import { getStep1ButtonText } from "pages/bridging/utils/utils";
import { convertStringToBigNumber } from "global/utils/formattingNumbers";

import { parseUnits } from "ethers/lib/utils";
import { ALTHEA_MAIN_CONVERT_COIN_TOKENS } from "pages/bridging/config/tokens.ts/bridgingTokens";
import {
  MAINNET_IBC_NETWORKS,
  MainnetIBCNetworks,
} from "pages/bridging/config/networks.ts/cosmos";

test("check cosmos address is valid", () => {
  const testCases: { case?: string; validFor: MainnetIBCNetworks[] }[] = [
    {
      case: "cosmos1qqzky5czd8jtxp7k96w0d9th2vjxcxaeqk6292",
      validFor: [MainnetIBCNetworks.COSMOS_HUB],
    },
    {
      case: "osmo1qqzky5czd8jtxp7k96w0d9th2vjxcxaegdf6nc",
      validFor: [MainnetIBCNetworks.OSMOSIS],
    },
    {
      case: "gravity1qqzky5czd8jtxp7k96w0d9th2vjxcxaeyxgjqz",
      validFor: [MainnetIBCNetworks.GRAVITY_BRIDGE],
    },
    {
      case: "comdex1qqzky5czd8jtxp7k96w0d9th2vjxcxae8ecgua",
      validFor: [MainnetIBCNetworks.COMDEX],
    },
    {
      case: "inj1vzpglc8he97xeathu0wl99seh96mgl8aqchvjs",
      validFor: [MainnetIBCNetworks.INJECTIVE],
    },
    {
      case: "cre1qqzky5czd8jtxp7k96w0d9th2vjxcxaey7f0s8",
      validFor: [MainnetIBCNetworks.CRESCENT],
    },
    {
      case: "somm1qqzky5czd8jtxp7k96w0d9th2vjxcxaev24x5q",
      validFor: [MainnetIBCNetworks.SOMMELIER],
    },
    {
      case: "akash1qqzky5czd8jtxp7k96w0d9th2vjxcxaeddhdus",
      validFor: [MainnetIBCNetworks.AKASH],
    },
    {
      case: "kava1rjhae3scpgckk2scffe8v7c93rugenjy8atg34",
      validFor: [MainnetIBCNetworks.KAVA],
    },
    {
      case: "",
      validFor: [],
    },
    {
      case: "0xkdlsfjalsdajkglkasdfjs",
      validFor: [],
    },
    {
      case: "0xaE9b2c8d2112C7B9907f68aEc6bFc0eB5d95818e",
      validFor: [],
    },
    {
      case: "gravity",
      validFor: [],
    },
    {
      case: undefined,
      validFor: [],
    },
  ];
  for (const testCase of testCases) {
    expect(
      MAINNET_IBC_NETWORKS[MainnetIBCNetworks.COSMOS_HUB].checkAddress(
        testCase.case
      )
    ).toBe(testCase.validFor.includes(MainnetIBCNetworks.COSMOS_HUB));
    expect(
      MAINNET_IBC_NETWORKS[MainnetIBCNetworks.GRAVITY_BRIDGE].checkAddress(
        testCase.case
      )
    ).toBe(testCase.validFor.includes(MainnetIBCNetworks.GRAVITY_BRIDGE));
    expect(
      MAINNET_IBC_NETWORKS[MainnetIBCNetworks.OSMOSIS].checkAddress(
        testCase.case
      )
    ).toBe(testCase.validFor.includes(MainnetIBCNetworks.OSMOSIS));
    expect(
      MAINNET_IBC_NETWORKS[MainnetIBCNetworks.COMDEX].checkAddress(
        testCase.case
      )
    ).toBe(testCase.validFor.includes(MainnetIBCNetworks.COMDEX));
    expect(
      MAINNET_IBC_NETWORKS[MainnetIBCNetworks.INJECTIVE].checkAddress(
        testCase.case
      )
    ).toBe(testCase.validFor.includes(MainnetIBCNetworks.INJECTIVE));
    expect(
      MAINNET_IBC_NETWORKS[MainnetIBCNetworks.CRESCENT].checkAddress(
        testCase.case
      )
    ).toBe(testCase.validFor.includes(MainnetIBCNetworks.CRESCENT));
    expect(
      MAINNET_IBC_NETWORKS[MainnetIBCNetworks.SOMMELIER].checkAddress(
        testCase.case
      )
    ).toBe(testCase.validFor.includes(MainnetIBCNetworks.SOMMELIER));
    expect(
      MAINNET_IBC_NETWORKS[MainnetIBCNetworks.AKASH].checkAddress(testCase.case)
    ).toBe(testCase.validFor.includes(MainnetIBCNetworks.AKASH));
    expect(
      MAINNET_IBC_NETWORKS[MainnetIBCNetworks.KAVA].checkAddress(testCase.case)
    ).toBe(testCase.validFor.includes(MainnetIBCNetworks.KAVA));
  }
});

test("converting string to big number for token decimals", () => {
  const testCases = [
    {
      case: "1",
      valid: true,
    },
    {
      case: "3.3123123124324",
      valid: true,
    },
    {
      case: "9.88888884",
      valid: true,
    },
    {
      case: "7.123456789123456789123456789123456789123456789123456789",
      valid: true,
    },
    {
      case: "0",
      valid: true,
    },
    {
      case: "0.123456789123456789123456789",
      valid: true,
    },
    {
      case: "0.0000001",
      valid: true,
    },
    {
      case: "-111",
      valid: false,
    },
    {
      case: "-11.31",
      valid: false,
    },
    {
      case: "abcdef",
      valid: false,
    },
    {
      case: "1.1.1",
      valid: false,
    },
    {
      case: "1e18",
      valid: false,
    },
  ];
  for (const testCase of testCases) {
    for (const token of ALTHEA_MAIN_CONVERT_COIN_TOKENS) {
      const expectedResult = !testCase.valid
        ? BigNumber.from(0)
        : parseUnits(
            truncateNumber(testCase.case, token.decimals),
            token.decimals
          );
      expect(
        convertStringToBigNumber(testCase.case, token.decimals).eq(
          expectedResult
        )
      );
    }
  }
});

test("step 1 buttonText", () => {
  const bridgeText = (bIn: boolean) => `bridge ${bIn ? "in" : "out"}`;
  const testCases = [
    {
      amount: parseUnits("10", 18),
      max: parseUnits("10", 18),
      currentAllowance: parseUnits("10", 18),
      bridgeIn: true,
      expectedResult: {
        disabled: false,
        text: bridgeText(true),
      },
    },
    {
      amount: parseUnits("10", 18),
      max: parseUnits("9", 18),
      currentAllowance: parseUnits("1", 18),
      bridgeIn: true,
      expectedResult: {
        disabled: true,
        text: bridgeText(true),
      },
    },
    {
      amount: BigNumber.from("-1"),
      max: parseUnits("10", 18),
      currentAllowance: BigNumber.from("-1"),
      bridgeIn: true,
      expectedResult: {
        disabled: false,
        text: bridgeText(true),
      },
    },
    {
      amount: parseUnits("10", 18),
      max: parseUnits("5", 18),
      currentAllowance: parseUnits("10", 18),
      bridgeIn: false,
      expectedResult: {
        disabled: true,
        text: bridgeText(false),
      },
    },
    {
      amount: parseUnits("10", 18),
      max: parseUnits("10", 18),
      currentAllowance: parseUnits("10", 18),
      bridgeIn: false,
      expectedResult: {
        disabled: false,
        text: bridgeText(false),
      },
    },
  ];
  for (const testCase of testCases) {
    const [testText, testDisabled] = getStep1ButtonText(
      testCase.amount,
      testCase.max,
      testCase.bridgeIn
    );
    expect(testText).toBe(testCase.expectedResult.text);
    expect(testDisabled).toBe(testCase.expectedResult.disabled);
  }
});
