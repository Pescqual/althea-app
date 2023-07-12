import styled from "@emotion/styled";
import { Text } from "global/packages/src";
import {
  findNativeToken,
  getNetworkFromCantoChannel,
} from "./utils/findTokens";
import RecoveryTransactionBox from "./components/recoveryTransaction";
import { BigNumber } from "ethers";
import unknwonToken from "assets/icons/info.svg";
import { TransactionStore } from "global/stores/transactionStore";
import { IBCTokenTrace, EMPTY_NATIVE_TOKEN } from "./config/bridgingInterfaces";

interface RecoveryModalProps {
  tokens: IBCTokenTrace[];
  cantoAddress: string;
  txStore: TransactionStore;
}
const RecoveryPage = ({
  tokens,
  cantoAddress,
  txStore,
}: RecoveryModalProps) => {
  return (
    <Styled>
      <Text type="title" size="title2">
        IBC Transfers - Recovery
      </Text>

      <div className="instruct">
        <Text align="left" type="title">
          Instructions:
        </Text>
        <ol>
          <li>
            Each token below represents all unidentified ibc tokens on the canto
            network.
          </li>
          <li>
            For each token, select the network you would like to ibc transfer
            the tokens back to (the network where this token came from is
            selected for you).
          </li>
          <li>
            Click recover on the token once you have selected the network you
            wish.
          </li>
          <li>
            Confirmation will pop up where you specify the address to send the
            tokens to.
          </li>
        </ol>
      </div>
      <div className="list-view">
        {tokens.map((token) => {
          //can get token information here from denomTrace
          const tokenInfo = findNativeToken(
            token.ibcInfo.denom_trace.base_denom
          );
          const transferFrom = getNetworkFromCantoChannel(
            token.ibcInfo.denom_trace.path.split("/")?.[1] ?? ""
          );

          return (
            token.denom !== "acanto" && (
              <RecoveryTransactionBox
                key={token.denom}
                txStore={txStore}
                cantoAddress={cantoAddress}
                transaction={{
                  origin: transferFrom?.name ?? "unkown",
                  amount: BigNumber.from(token.amount),
                  defaultNetwork: transferFrom,
                  channelPath: token.ibcInfo.denom_trace.path
                    .replaceAll("transfer/channel-", "")
                    .split("/")
                    .reverse(),
                  symbol: token.ibcInfo.denom_trace.base_denom,
                  token: {
                    ...EMPTY_NATIVE_TOKEN,
                    decimals: 0,
                    name: tokenInfo?.name ?? "unkown",
                    symbol: token.ibcInfo.denom_trace.base_denom,
                    icon: tokenInfo?.icon ?? unknwonToken,
                  },
                }}
              />
            )
          );
        })}
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem;
  align-items: center;

  .list-view {
    width: 70%;
  }
  .qa {
    width: 70%;
    .header {
      font-size: 18px !important;
    }
    .content {
      font-size: 16px !important;
      line-height: 160%;
    }
  }

  .instruct {
    background: #111111;
    border: 1px solid #2c2c2c;
    border-radius: 4px;
    padding: 22px 18px;
    width: 70%;

    ol {
      list-style-position: inside;
      li {
        margin-top: 3px;
        font-size: 14px;
        color: #d3d3d3;
      }
    }
  }
`;
export default RecoveryPage;
