import * as React from "react";

interface Props {
  clickHandle?: () => void;
  children: any;
}

export const Button = (props: Props) => {
  const { clickHandle } = props;

  return <button onClick={clickHandle}>{props.children}</button>;
};
