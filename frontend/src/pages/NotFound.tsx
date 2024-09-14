import { Component } from "solid-js";

const NotFound: Component = (props) => {
  return (
    <div class="hero">
      <div class="hero-content">
        <h1 class="text-5xl">404 Page Not Found!</h1>
        <a class="btn btn-link" href="/home">
          Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
