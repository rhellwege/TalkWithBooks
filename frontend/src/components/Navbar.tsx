import { For, Component, onMount } from "solid-js";
import { A } from "@solidjs/router";
import * as jdenticon from "jdenticon";

interface NavbarProps {}
export const Navbar: Component = () => {
  onMount(() => {});
  return (
    <nav class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">TalkWithBooks</a>
      </div>
      <div class="flex-auto  justify-center gap-2">
        <ul>
          <For each={["Home", "Chat", "Library"]}>
            {(route) => (
              <li class="btn btn-link ">
                <A href={"/" + route.toLowerCase()}>{route}</A>
              </li>
            )}
          </For>
        </ul>
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            class="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar"
          >
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li class="text-warning">
              <a>Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    // <nav class="sticky navbar">
    //   <ul>
    //     <For each={["Home", "Chat", "Library"]}>
    //       {(route) => (
    //         <li class="btn">
    //           <A href={"/" + route.toLowerCase()}>{route}</A>
    //         </li>
    //       )}
    //     </For>
    //   </ul>
    // </nav>
  );
};
