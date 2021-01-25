import * as React from "react";

interface Ownrops {
  clickHandle?: () => void;
  children: any;
}

type Props = Ownrops & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
  const { clickHandle, type } = props;

  return <button type={type || null} onClick={clickHandle}>{props.children}</button>;
};
