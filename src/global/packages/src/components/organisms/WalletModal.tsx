import styled from "@emotion/styled";
import { useEthers } from "@usedapp/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { OutlinedButton } from "../atoms/Button";
import CopyIcon from "assets/copy.svg";
import { Text } from "../atoms/Text";
import { Mixpanel } from "mixpanel";
import { toastHandler } from "global/utils/toastHandler";
import { truncateNumber } from "global/utils/formattingNumbers";
import { useContext } from "react";
import { ThemeContext } from "ThemeProvider";
import { FaCoins } from "react-icons/fa";

interface WalletModalProps {
  account: string;
  balance: string;
  currency: string;
  icon: JSX.Element;
}
const WalletModal = ({
  account,
  balance,
  currency,
  icon,
}: WalletModalProps) => {
  const { deactivate } = useEthers();
  const { theme } = useContext(ThemeContext);
  return (
    <Styled theme={theme} >
      <div className="address">
        <CopyToClipboard
          text={account}
          onCopy={() => toastHandler("COPIED ADDRESS", true, "0", 300)}
        >
          <Text
            type="text"
            color="primary"
            align="right"
            style={{ cursor: "pointer" }}
          >
            {account
              ? account.slice(0, 6) + "..." + account.slice(-4)
              : "retrieving wallet"}{" "}
            <img
              src={CopyIcon}
              style={{
                height: "22px",
                marginLeft: "-6px",
                position: "relative",
                top: "5px",
              }}
            />
          </Text>
        </CopyToClipboard>
      </div>
      <div
        style={{
          marginBottom: "12px",
          borderTop: "1px solid #d9d9d92b",
          width: "90%",
        }}
      ></div>
      <div className="row">
        <Text type="text">{currency} balance</Text>

        <div className="balance">
          <Text type="text">
            <span className="center">
              <FaCoins/>
              {truncateNumber(balance)}
            </span>
          </Text>
        </div>
      </div>

      <OutlinedButton
        style={{
          marginTop: "32px",
          fontFamily: "Macan",
        }}
        height="small"
        onClick={() => {
          Mixpanel.events.connections.walletConnect(false);
          deactivate();
          window.location.reload();
        }}
      >
        DISCONNECT
      </OutlinedButton>
    </Styled>
  );
};
interface StyledProps {
  theme: string;
}
const Styled = styled.div<StyledProps>`
  width: 250px;
  background-color: ${({ theme }) => theme === 'light' ? '#CCE4FF' : '#0D2642'};
  border-radius: 4px;
  backdrop-filter: blur(35px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fadein 0.2s;
  position: fixed;
  top: 4.75rem;
  right: 1rem;
  padding: 24px 16px;
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  a {
    text-decoration: underline;
    font-weight: 400;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
  }
  .address {
    margin-bottom: 24px;
  }
  .address p {
    font-family: "Macan";
  }

  .row {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  button {
    width: 100%;
  }
`;

export default WalletModal;
