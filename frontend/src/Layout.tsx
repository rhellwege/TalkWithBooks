import { Component } from "solid-js";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { RouteSectionProps } from "@solidjs/router";

export const Layout: Component<RouteSectionProps> = (props) => {
  return (
    <div class="flex flex-col h-screen">
      <Navbar />
      <main class="mb-auto bg-base-200">{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
