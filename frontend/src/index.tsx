/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import Library from "./pages/Library";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "./index.css";
import Layout from "./Layout";

render(
  () => (
    <Router root={Layout}>
      <Route path="/library" component={Library} />
      <Route path="/chat" component={Chat} />
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="*404" component={NotFound} />
    </Router>
  ),
  document.getElementById("root")!,
);
