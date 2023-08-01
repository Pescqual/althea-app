import styled from "@emotion/styled";
import { OutlinedButton, Text } from "global/packages/src";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import LoadingComponent from "../loadingComponent";
import {
  AltheaTransactionType,
  TransactionState,
} from "global/config/interfaces/transactionTypes";
import { ReactNode, useEffect, useState } from "react";
import close from "assets/icons/close.svg";
import { Mixpanel } from "mixpanel";
import { createTransactionDetails } from "global/stores/transactionUtils";

interface GlobalLoadingProps {
  transactionType: AltheaTransactionType;
  status: TransactionState;
  tokenName?: string;
  customMessage?: string | ReactNode;
  additionalMessage?: string | ReactNode;
  txHash?: string;
  onClose: () => void;
  mixPanelEventInfo?: object;
}

const GlobalLoadingModal = (props: GlobalLoadingProps) => {
  const [txLogged, setTxLogged] = useState(false);
  const [txConfirmed, setTxConfirmed] = useState(false);

  const txDetails = createTransactionDetails(
    Math.ceil(Math.random() * Math.ceil(Math.random() * Date.now())).toString(),
    props.transactionType,
    {
      symbol: props.tokenName,
    }
  );
  const currentStatus = () => {
    switch (props.status) {
      case "PendingSignature":
        return txDetails.messages.long;
      case "Mining":
        return txDetails.messages.pending;
      case "Success":
        return txDetails.messages.success;
      case "Fail":
      case "Exception":
        return txDetails.messages.error;
      default:
        return "Transaction failed";
    }
  };

  useEffect(() => {
    if (props.status == "PendingSignature" && !txLogged) {
      setTxLogged(true);
      Mixpanel.events.transactions.transactionStarted(
        props.transactionType,
        props.mixPanelEventInfo
      );
    }
    if (props.status == "Success" && !txConfirmed) {
      setTxConfirmed(true);
      Mixpanel.events.transactions.transactionSuccess(
        props.transactionType,
        props.txHash,
        props.mixPanelEventInfo
      );
    }
    if (
      (props.status == "Fail" || props.status == "Exception") &&
      !txConfirmed
    ) {
      setTxConfirmed(true);
      Mixpanel.events.transactions.transactionFailed(
        props.transactionType,
        props.txHash,
        currentStatus(),
        props.mixPanelEventInfo
      );
    }
  }, [props.status]);

  return (
    <LoadingModal>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          props.onClose();
        }}
      >
        <img
          src={close}
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            width: "40px",
            cursor: "pointer",
          }}
        />
      </div>
      <div className="tx-icon">
  {props.status == "None" ? (
    <Text size="text1" type="title">
    </Text>
  ) : props.status == "Success" ? (
    <FaCheck color="var(--primary-color)" size={"30px"} />
  ) : props.status == "Fail" || props.status == "Exception" ? (
    <FaExclamationTriangle color="var(--primary-color)" size={"30px"} />
  ) : (
    <LoadingComponent size="sm"/>
  )}
</div>
      <Text size="title2" type="text" style={{ marginBottom: "2rem" }}>
        {props.tokenName}
      </Text>
      <Text size="text1" type="text">
        {props.customMessage ?? currentStatus()}
      </Text>
      <br />
      <Text size="text1" type="text">
        {props.additionalMessage}
      </Text>
      {props.txHash ? (
        <OutlinedButton
          className="btn"
          onClick={() => {
            Mixpanel.events.loadingModal.blockExplorerOpened(props.txHash);
            window.open("https://tuber.build/tx/" + props.txHash, "_blank");
          }}
        >
          open in block explorer
        </OutlinedButton>
      ) : null}
    </LoadingModal>
  );
};

const LoadingModal = styled.div`
  display: flex;
  background-color: black;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  .btn {
    margin-top: 2rem;
  }
`;
export default GlobalLoadingModal;
