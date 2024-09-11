import { Show, createSignal, JSXElement, Component } from "solid-js";
import { clickOutside } from "../directives/click-outside";

interface DropdownProps {
  description: string;
  children: JSXElement;
}

export const Dropdown: Component<DropdownProps> = (props) => {
  const [revealed, setRevealed] = createSignal(false);

  return (
    <div class="container" use:clickOutside={() => setRevealed(false)}>
      <button onClick={() => setRevealed(!revealed())}>
        <h3>{props.description}</h3>
      </button>
      <Show when={revealed()}>{props.children}</Show>
    </div>
  );
};
