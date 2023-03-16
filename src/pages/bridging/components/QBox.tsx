import styled from "@emotion/styled";
import { useState, useRef, useEffect, useLayoutEffect } from "react";

interface Props {
  question: string;
  answer: string;
}
const QBox = ({ question, answer }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    //@ts-ignore
    setHeight(ref.current.clientHeight);
  });

  const ref = useRef(null);
  return (
    <Styled
      height={height}
      expanded={expanded}
      onClick={() => {
        setExpanded(!expanded);
      }}
    >
      <div className="header noselect" ref={ref}>
        {question}
      </div>
      {<div className="content noselect">{answer}</div>}
    </Styled>
  );
};

const Styled = styled.div<{ height: number; expanded: boolean }>`
  width: 17rem;
  background: #090909;
  border: 1px solid #505050;
  border-radius: 4px;
  padding: 1rem;

  transition: max-height 0.5s;
  max-height: ${({ height, expanded }) =>
    expanded ? "14rem" : height + 31 + "px"};
  overflow-y: hidden;
  padding: ${({ expanded }) => (expanded ? "1rem" : "16px")};
  &:hover {
    background-color: #222;
    cursor: pointer;
  }
  .header {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #cccccc;
  }

  .content {
    transition: margin 0.2s;
    margin-top: ${({ expanded }) => (expanded ? "8px" : "16px")};

    font-size: 13px;
    line-height: 19px;
    letter-spacing: -0.03em;
    color: #878787;
  }
`;

export default QBox;
