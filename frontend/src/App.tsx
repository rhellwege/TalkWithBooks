import { createSignal, Component, JSXElement } from "solid-js";
import { Navbar } from "./components/Navbar";

interface AppProps {
  children: JSXElement;
}

export const App: Component<AppProps> = (props) => {
  return (
    <>
      <Navbar />
      <div>{props.children}</div>
    </>
  );
};

export default App;
