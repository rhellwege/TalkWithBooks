import { createSignal, Component } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import { Tabs, Tab } from "./Tabs";

export const App: Component = () => {
  const [count, setCount] = createSignal(0);

  return (
    <div class="bg-zinc-50 block">
      <p class="text-xl">{count()}</p>
      <button class="bg-purple-200" onClick={() => setCount(count() + 1)}>
        Increase
      </button>
      <Tabs>
        <Tab title="a">CONETNT A</Tab>
        <Tab title="b"> CONTENT B</Tab>
      </Tabs>
    </div>
  );
};

export default App;
