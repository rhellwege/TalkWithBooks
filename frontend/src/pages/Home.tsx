import { Component } from "solid-js";

const Home: Component = () => {
  //const [count, setCount] = createSignal(0);
  return (
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Talk With Books</h1>
          <p class="py-6">
            Build a library of your notes, textbooks, presentations or any other
            text based content to easily search through it and ask questions.
            Get started by logging in and start uploading files!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
