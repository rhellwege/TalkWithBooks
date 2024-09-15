import { useGlobalContext } from "../GlobalContext/store";
import { Component, createSignal } from "solid-js";

export const ChatBox: Component = () => {
  return (
    <>
      <div class="join">
        <div class="tooltip join-item" data-tip="Reset chat">
          <button class="join-item btn btn-circle btn-warning"></button>
        </div>
        <input
          placeholder="Send Message"
          class="join-item input input-bordered max-w-xl"
        ></input>
        <div class="tooltip join-item" data-tip="Send">
          <button class="btn btn-info"></button>
        </div>
      </div>
    </>
  );
};
