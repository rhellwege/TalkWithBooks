import { For, Component } from "solid-js";
import { A } from "@solidjs/router";

export const Navbar: Component = () => {
  return (
    <nav class="navbar">
      <ul>
        <For each={["Home", "Chat", "Library"]}>
          {(route) => (
            <li class="btn">
              <A href={"/" + route.toLowerCase()}>{route}</A>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
};
