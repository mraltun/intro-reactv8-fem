import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// We can't render jsx so we need js after build
import renderApp from "./dist/server/ServerApp.js";

// No dirname so we make our own
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;

// Get the html file and turn into string
const html = fs
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
  .toString();

// Split it here so that we can send above "not rendered" text like head section of the html
const parts = html.split("not rendered");

const app = express();

// Serve assets like images, css etc..
app.use(
  "/assets",
  express.static(path.resolve(__dirname, "./dist/client/assets"))
);

app.use((req, res) => {
  // Send the head first
  res.write(parts[0]);

  const stream = renderApp(req.url, {
    onShellReady() {
      stream.pipe(res);
    },

    onShellError() {
      // Do error handling
    },

    onAllReady() {
      // Last thing to write
      res.write(parts[1]);
      res.end();
    },

    onError(err) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
