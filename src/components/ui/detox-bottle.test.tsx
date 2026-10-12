import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DetoxBottle } from "./detox-bottle";

describe("DetoxBottle Component", () => {
  it("renders with default props and proper accessibility attributes", () => {
    const html = renderToStaticMarkup(<DetoxBottle />);

    expect(html).toContain('role="img"');
    expect(html).toContain('aria-label="Chai nước ép tươi"');
    expect(html).toContain("bg-primary");
    expect(html).toContain("bg-accent-subtle");
    expect(html).toContain("height:60%");
  });

  it("supports different sizes (sm, md, lg)", () => {
    const smHtml = renderToStaticMarkup(<DetoxBottle size="sm" />);
    const lgHtml = renderToStaticMarkup(<DetoxBottle size="lg" />);

    expect(smHtml).toContain("w-16 h-22");
    expect(lgHtml).toContain("w-36 sm:w-40");
  });

  it("supports color variants (green, warm, soft)", () => {
    const warmHtml = renderToStaticMarkup(<DetoxBottle color="warm" />);
    const softHtml = renderToStaticMarkup(<DetoxBottle color="soft" />);

    expect(warmHtml).toContain("bg-accent-subtle");
    expect(softHtml).toContain("bg-accent-soft");
  });

  it("clamps fill percentage between 0 and 100", () => {
    const overfillHtml = renderToStaticMarkup(<DetoxBottle level={150} />);
    const underfillHtml = renderToStaticMarkup(<DetoxBottle level={-20} />);

    expect(overfillHtml).toContain("height:100%");
    expect(underfillHtml).toContain("height:0%");
  });

  it("allows custom accessibility label and hiding bubbles", () => {
    const html = renderToStaticMarkup(
      <DetoxBottle label="Chai cần tây táo" bubbles={false} />
    );

    expect(html).toContain('aria-label="Chai cần tây táo"');
  });
});
