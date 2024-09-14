import { createSignal, Component, JSXElement } from "solid-js";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

interface LayoutProps {
  children: JSXElement;
}

export const Layout: Component<LayoutProps> = (props) => {
  return (
    <div class="flex flex-col h-screen">
      <Navbar />
      <main class="mb-auto">{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
