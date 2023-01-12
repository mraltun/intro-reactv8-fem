import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <SearchParams />
    </div>
  );
};

const container = document.getElementById("root");
// ReactDOM.render(container, <App/>); React v17 legacy
const root = createRoot(container);
root.render(<App />);
