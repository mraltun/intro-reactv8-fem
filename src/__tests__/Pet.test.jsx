// Try to test functionality, not implementation. Make your tests interact with components as a user would, not as a developer would. This means you're trying to do more think of things like "what would a user see" or "if a user clicks a button a modal comes up" rather than "make sure this state is correct" or "ensure this library is called". This isn't a rule; sometimes you need to test those things too for assurance the app is working correctly. Use your best judgment.
// UI changes a lot. Try to not unnecessarily spin your wheels on things that aren't important and are likely to change.
// Ask yourself what's important about your app and spend your time testing that. Ask yourself "if a user couldn't do X then the app is worthless" sort of questions and test those more thoroughly. If a user can't change themes then it's probably not the end of the world (a11y is important) so you can spend less time testing that but if a user can't log in then the app is worthless. Test that.
// Delete tests on a regular basis. Tests have a shelf life.
// Fix or delete flaky tests. Bad tests are worse than no tests
// Okay, create a new file called Pet.test.jsx. This naming convention is just habit. Pet.spec.jsx is common too. But as long as it's in the __tests__ directory it doesn't much matter what you call it.

import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import Pet from "../Pet";

test("displays a default thumbnail", async () => {
  const pet = render(
    // React-router-dom gets upset if you try to render its components without a Router above it. We could either go mock the APIs it's expecting (gross) or we could just give it a router.
    <StaticRouter>
      <Pet />
    </StaticRouter>
  );

  const petThumbnail = await pet.findByTestId("thumbnail");
  expect(petThumbnail.src).toContain("none.jpg");
  // We do have to call unmount. Due to how Vitest runs test, it can cause flaky tests if we don't clean up each test after it's down. If you don't unmount you may get a TestingLibraryElementError: Found multiple elements by: [data-testid="thumbnail"] error.
  pet.unmount();
});

test("displays a non-default thumbnail", async () => {
  const pet = render(
    <StaticRouter>
      <Pet images={["1.jpg", "2.jpg", "3.jpg"]} />
    </StaticRouter>
  );

  const petThumbnail = await pet.findByTestId("thumbnail");
  expect(petThumbnail.src).toContain("1.jpg");
  pet.unmount();
});
