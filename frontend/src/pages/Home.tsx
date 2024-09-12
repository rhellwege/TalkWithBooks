import { Component, createSignal } from "solid-js";
import { Dropdown } from "../components/Dropdown";
import { Tabs, Tab } from "../components/Tabs";

const Home: Component = (props) => {
  const [count, setCount] = createSignal(0);
  return (
    <div>
      <p>test test test</p>
      <h1>Talk With Books</h1>
      <p>Build your knowledge and use AI to search through it and cite it.</p>
      <div class="bg-zinc-50 block">
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
    </div>
  );
};

export default Home;
