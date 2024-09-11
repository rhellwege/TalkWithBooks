import { Component } from "solid-js";
import { Navbar } from "../components/Navbar";

export const Home: Component = (props) => {
  return (
    <>
      <Navbar />
      <h1>Talk With Books</h1>
      <p>Build your knowledge and use AI to search through it and cite it.</p>
    </>
  );
};

export default Home;
