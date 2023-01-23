// This code will only get run in the browser, so any sort of browser related stuff can safely be done here (like analytics.) We're also using React.hydrate instead of React.render because this will hydrate existing markup with React magic ✨ rather than render it from scratch.
// Same as createRoot(), but is used to hydrate a container whose HTML contents were rendered by ReactDOMServer.
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
