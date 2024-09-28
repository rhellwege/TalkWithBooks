import { Component } from "solid-js";
import { PdfViewer } from "../components/PdfViewer";
import { ChatBox } from "../components/Chatbox";

export const Chat: Component = () => {
  return (
    <>
      <h1>Talk With Books</h1>
      <p>Build your knowledge and use AI to search through it and cite it.</p>
      <PdfViewer src="../compressed.pdf" />
      <ChatBox />
    </>
  );
};

export default Chat;
