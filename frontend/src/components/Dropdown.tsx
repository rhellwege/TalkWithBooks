import { Show, createSignal, JSXElement, Component } from "solid-js";

interface DropdownProps {
  description: string;
  children: JSXElement;
}

export const Dropdown: Component<DropdownProps> = (props) => {
  const [revealed, setRevealed] = createSignal(false);

  return (
    <div class="container">
      <button onClick={() => setRevealed(!revealed())}>
        <h3>{props.description}</h3>
      </button>
      <Show when={revealed()}>{props.children}</Show>
    </div>
  );
};
