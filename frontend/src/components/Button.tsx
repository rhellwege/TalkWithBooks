import { Icon } from "lucide-solid";
import { splitProps, Component, JSXElement } from "solid-js";

export const Button: Component = (props) => {
  return (
    <button class={""} {...props}>
      {props.children}
    </button>
  );
};
