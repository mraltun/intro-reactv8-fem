// Snapshot tests are low confidence, low cost ways of writing tests. With more-or-less a single line of code you can assert: this code doesn't break, and it isn't changing over time.
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Results from "../Results";

test("renders correctly with no pets", () => {
  const { asFragment } = render(<Results pets={[]} />);
  expect(asFragment()).toMatchSnapshot();
});
