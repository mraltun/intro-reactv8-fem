import { expect, test } from "vitest";
import { render, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../useBreedList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      // Fail the test instead retrying
      retry: false,
    },
  },
});

test("gives an empty list with no animal", async () => {
  // We don't have to create component with this hook
  const { result } = renderHook(() => useBreedList(""), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  const [breedList, status] = result.current;

  expect(breedList).toHaveLength(0);
  expect(status).toBe("loading");
});

// function getBreedList(animal) {
//   let list;

//   // We need a React component to test this hook
//   function TestComponent() {
//     list = useBreedList(animal);
//     return null;
//   }

//   render(
//     <QueryClientProvider client={queryClient}>
//       <TestComponent />
//     </QueryClientProvider>
//   );

//   return list;
// }

// test("gives an empty list with no animal", async () => {
//   const [breedList, status] = getBreedList();
//   expect(breedList).toHaveLength(0);
//   expect(status).toBe("loading");
// });
