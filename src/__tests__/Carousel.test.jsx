import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Carousel from "../Carousel";

// This is going to check first to see if you set the first image to correctly be the hero, and then check by clicking each of the thumbnails to make them the hero. The first one is intentionally "wasted" because we want to make sure that if a user clicks the active thumbnail that nothing changes. We also check to make sure that the thumbnail gets an active class so we can style it differently.
test("lets users click on thumbnails to make them the hero", async () => {
  const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Carousel images={images} />);

  const hero = await carousel.findByTestId("hero");
  expect(hero.src).toContain(images[0]);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    const thumb = await carousel.findByTestId(`thumbnail${i}`);
    await thumb.click();

    expect(hero.src).toContain(image);
    expect(Array.from(thumb.classList)).toContain("active");
  }
});
