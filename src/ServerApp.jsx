// This is code that will run in Node.js once we've told Vite to transpile it. This will create a server-readable stream of React markup that we can send to the user.
import { renderToPipeableStream } from "react-dom/server";
// This is basically React router that can run on the Nodejs
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export default function render(url, opts) {
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    opts
  );
  return stream;
}
