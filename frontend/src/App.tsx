import { createSignal, Component, JSXElement } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import { Tabs, Tab } from "./components/Tabs";
import { Dropdown } from "./components/Dropdown";
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
