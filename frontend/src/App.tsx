import { createSignal, Component, JSXElement } from "solid-js";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

interface AppProps {
  children: JSXElement;
}

export const App: Component<AppProps> = (props) => {
  return (
    <>
      <Navbar />
      <div>{props.children}</div>
      <Footer />
    </>
  );
};

export default App;
