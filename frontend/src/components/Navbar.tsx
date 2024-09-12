import { For, Component } from "solid-js";

interface NavbarProps {
  activeRoute: string;
}

export const Navbar: Component = ({}) => {
  return (
    <nav class="sticky flex flex-row justify-center gap-4">
      <ul>
        <For each={["Home", "Chat", "Library"]}>
          {(route) => (
            <li class="bg-zinc-200 hover:opacity-50">
              <a href={"/" + route.toLowerCase()}>{route}</a>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
};
