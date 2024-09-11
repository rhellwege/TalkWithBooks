import { createSignal, Component } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import { Tabs, Tab } from "./components/Tabs";
import { Dropdown } from "./components/Dropdown";
import { createAutoAnimate } from "@formkit/auto-animate/solid";
import { Navbar } from "./components/Navbar";

export const App: Component = () => {
  const [count, setCount] = createSignal(0);
  const [parent, setEnabled] = createAutoAnimate();

  return (
    <>
      <Navbar />
      <div ref={parent} class="bg-zinc-50 block">
        <p class="text-xl">{count()}</p>
        <button
          class="bg-purple-200 text-rose-50 hover:text-rose-500 transition ease-in-out duration-500"
          onClick={() => setCount(count() + 1)}
        >
          Increase
        </button>
        <Dropdown description={"TABS"}>
          <Tabs>
            <Tab title="apple">CONETNT A</Tab>
            <Tab title="b"> CONTENT B</Tab>
            <Tab title="c"> CONTENT C</Tab>
          </Tabs>
        </Dropdown>
      </div>
    </>
  );
};

export default App;
