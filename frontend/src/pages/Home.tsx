import { Component, createSignal } from "solid-js";
import { Dropdown } from "../components/Dropdown";
import { Tabs, Tab } from "../components/Tabs";

const Home: Component = (props) => {
  const [count, setCount] = createSignal(0);
  return (
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-md bg-base-100">
          <h1 class="text-5xl font-bold">Talk With Books</h1>
          <p class="py-6">
            Build a library of your notes, textbooks, presentations or any other
            text based content to easily search through it and ask questions.
            Get started by logging in and start uploading files!
          </p>
          <button class="btn btn-primary">Get Started</button>
          <div class="skeleton"></div>
        </div>
      </div>
    </div>
    // <div class="hero">
    //   <h1 class="font-bold text-accent">Talk With Books</h1>
    //   <p>test test test</p>
    //   <h1>Talk With Books</h1>
    //   <p>Build your knowledge and use AI to search through it and cite it.</p>
    //   <div class="">
    //     <p class="text-xl">{count()}</p>
    //     <button
    //       class="bg-purple-200 text-rose-50 hover:text-rose-500 transition ease-in-out duration-500"
    //       onClick={() => setCount(count() + 1)}
    //     >
    //       Increase
    //     </button>
    //     <Dropdown description={"TABS"}>
    //       <Tabs>
    //         <Tab title="apple">CONETNT A</Tab>
    //         <Tab title="b"> CONTENT B</Tab>
    //         <Tab title="c"> CONTENT C</Tab>
    //         <Tab title="c"> CONTENT C</Tab>
    //       </Tabs>
    //     </Dropdown>
    //   </div>
    // </div>
  );
};

export default Home;
