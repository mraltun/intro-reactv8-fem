// import { createRoot } from "react-dom/client";
import { useState, lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store";
import { Pet } from "./APIResponsesTypes";
import AdoptedPetContext from "./AdoptedPetContext";

// Dynamic imports. They will not load until their routes loaded
const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // The time in milliseconds after data is considered stale.
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null as Pet | null);

  return (
    <div
      className="p-0 m-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}
    >
      {/* <BrowserRouter> */}
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AdoptedPetContext.Provider value={adoptedPet}>
            <Suspense
              // Now Vite will handle the rest of the glueing together. Your initial bundle will load, then after that it will resolve that you want to load another piece, show the loading component (we show a dumb spinner but this could be fancy loading screen.) This Details page isn't too big but imagine if it had libraries like Moment or Lodash on it! It could be a big savings.
              fallback={
                <div className="loading-pane">
                  <h2 className="loader">🐶</h2>
                </div>
              }
            >
              <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500">
                <Link
                  className="text-6xl text-white hover:text-gray-200"
                  to="/"
                >
                  Adopt Me!
                </Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </Suspense>
          </AdoptedPetContext.Provider>
        </Provider>
      </QueryClientProvider>
      {/* </BrowserRouter> */}
    </div>
  );
};

// const container = document.getElementById("root");
// // ReactDOM.render(container, <App/>); React v17 legacy
// const root = createRoot(container);
// root.render(<App />);

export default App;
