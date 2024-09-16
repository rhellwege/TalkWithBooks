import { Component } from "solid-js";
import { PdfViewer } from "../components/PdfViewer";
import { ChatBox } from "../components/Chatbox";

export const Home: Component = (props) => {
  return (
    <>
      <h1>Talk With Books</h1>
      <p>Build your knowledge and use AI to search through it and cite it.</p>
      <ul role="tablist" class="tabs tabs-lifted">
        <li role="tab" class="tab">
          Tab 1
        </li>
        <li role="tab" class="tab tab-active">
          Tab 2
        </li>
        <li role="tab" class="tab">
          Tab 3
        </li>
      </ul>
      <PdfViewer src="../compressed.pdf" />
      <ChatBox />
    </>
  );
};

export default Home;
