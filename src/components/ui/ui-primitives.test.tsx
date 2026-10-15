import React, { createRef } from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Button,
  LinkButton,
  Container,
  Section,
  Heading,
  Card,
  Chip,
  Notice,
  Skeleton,
  Kicker,
  Reveal,
} from "./index";

describe("UI Primitives", () => {
  describe("Button & LinkButton", () => {
    it("renders Button with primary variant by default", () => {
      const html = renderToStaticMarkup(<Button>Bấm vào đây</Button>);
      expect(html).toContain("bg-primary");
      expect(html).toContain("text-bg");
      expect(html).toContain("min-h-12");
      expect(html).toContain("Bấm vào đây");
    });

    it("renders secondary and ghost variants", () => {
      const secondaryHtml = renderToStaticMarkup(
        <Button variant="secondary">Secondary</Button>
      );
      expect(secondaryHtml).toContain("bg-surface");
      expect(secondaryHtml).toContain("border-border");

      const ghostHtml = renderToStaticMarkup(
        <Button variant="ghost">Ghost</Button>
      );
      expect(ghostHtml).toContain("bg-transparent");
    });

    it("handles disabled state correctly", () => {
      const html = renderToStaticMarkup(<Button disabled>Disabled</Button>);
      expect(html).toContain("disabled");
      expect(html).toContain("disabled:opacity-50");
    });

    it("accepts ref prop without throwing", () => {
      const ref = createRef<HTMLButtonElement>();
      const html = renderToStaticMarkup(<Button ref={ref}>Ref test</Button>);
      expect(html).toContain("Ref test");
    });

    it("renders LinkButton using next/link attributes", () => {
      const ref = createRef<HTMLAnchorElement>();
      const html = renderToStaticMarkup(
        <LinkButton href="/consultation" ref={ref}>
          Bắt đầu
        </LinkButton>
      );
      expect(html).toContain('href="/consultation"');
      expect(html).toContain("bg-primary");
      expect(html).toContain("Bắt đầu");
    });
  });

  describe("Container, Section, Heading", () => {
    it("renders Container with max-w and padding token", () => {
      const html = renderToStaticMarkup(
        <Container as="main">Nội dung</Container>
      );
      expect(html).toContain("<main");
      expect(html).toContain("max-w-6xl");
      expect(html).toContain("px-4");
      expect(html).toContain("Nội dung");
    });

    it("renders Section with spacing options", () => {
      const smHtml = renderToStaticMarkup(<Section spacing="sm">Sm</Section>);
      expect(smHtml).toContain("py-6");

      const mdHtml = renderToStaticMarkup(<Section spacing="md">Md</Section>);
      expect(mdHtml).toContain("py-8");

      const lgHtml = renderToStaticMarkup(<Section spacing="lg">Lg</Section>);
      expect(lgHtml).toContain("py-12");
    });

    it("renders Heading with semantic tag and typography scale", () => {
      const html = renderToStaticMarkup(
        <Heading level={1}>Tiêu đề chính</Heading>
      );
      expect(html).toContain("<h1");
      expect(html).toContain("text-3xl");
      expect(html).toContain("font-heading");
      expect(html).toContain("Tiêu đề chính");
    });

    it("allows overriding Heading size", () => {
      const html = renderToStaticMarkup(
        <Heading level={2} size="3xl">
          Tiêu đề lớn
        </Heading>
      );
      expect(html).toContain("<h2");
      expect(html).toContain("text-3xl");
    });
  });

  describe("Card", () => {
    it("renders Card with surface background, border, and data-card attribute", () => {
      const html = renderToStaticMarkup(<Card>Nội dung thẻ</Card>);
      expect(html).toContain("data-card");
      expect(html).toContain("bg-surface");
      expect(html).toContain("border-border");
      expect(html).toContain("rounded-xl");
      expect(html).toContain("Nội dung thẻ");
    });

    it("renders nested Card with data-card attribute on both parent and child for CSS rule matching", () => {
      const html = renderToStaticMarkup(
        <Card>
          Thẻ ngoài
          <Card>Thẻ trong</Card>
        </Card>
      );
      const matches = html.match(/data-card/g);
      expect(matches).toHaveLength(2);
      expect(html).toContain("Thẻ ngoài");
      expect(html).toContain("Thẻ trong");
    });
  });

  describe("Chip", () => {
    it("renders Chip with hidden input and peer label", () => {
      const html = renderToStaticMarkup(
        <Chip name="goals" value="detox" label="Thanh lọc" defaultChecked />
      );
      expect(html).toContain('type="checkbox"');
      expect(html).toContain('class="sr-only peer"');
      expect(html).toContain("checked");
      expect(html).toContain("Thanh lọc");
    });

    it("handles disabled state for Chip", () => {
      const html = renderToStaticMarkup(
        <Chip name="goals" label="Bị khóa" disabled />
      );
      expect(html).toContain("disabled");
      expect(html).toContain("opacity-50");
    });
  });

  describe("Notice", () => {
    it("renders info Notice with default label and region role", () => {
      const html = renderToStaticMarkup(
        <Notice variant="info">Thông báo bình thường</Notice>
      );
      expect(html).toContain('role="region"');
      expect(html).toContain("border-border");
      expect(html).toContain("Thông tin");
    });

    it("renders warning and error Notice with semantic border and text", () => {
      const warningHtml = renderToStaticMarkup(
        <Notice variant="warning" title="Lưu ý quan trọng">
          Nội dung lưu ý
        </Notice>
      );
      expect(warningHtml).toContain("Lưu ý");
      expect(warningHtml).toContain("Lưu ý quan trọng");

      const errorHtml = renderToStaticMarkup(
        <Notice variant="error">Lỗi nghiêm trọng</Notice>
      );
      expect(errorHtml).toContain('role="alert"');
      expect(errorHtml).toContain("text-error");
      expect(errorHtml).toContain("border-border");
      expect(errorHtml).toContain("Cảnh báo");
    });
  });

  describe("Skeleton", () => {
    it("renders static placeholder with token background and aria-hidden", () => {
      const html = renderToStaticMarkup(<Skeleton className="h-6 w-24" />);
      expect(html).toContain('aria-hidden="true"');
      expect(html).toContain("bg-accent-soft/60");
      expect(html).toContain("border-border");
    });
  });

  describe("Kicker", () => {
    it("renders Kicker with uppercase tracking and muted token", () => {
      const html = renderToStaticMarkup(<Kicker>01 · Thông tin cơ thể</Kicker>);
      expect(html).toContain("<p");
      expect(html).toContain("text-xs");
      expect(html).toContain("tracking-wider");
      expect(html).toContain("text-text-muted");
      expect(html).toContain("01 · Thông tin cơ thể");
    });

    it("supports rendering as different HTML elements", () => {
      const html = renderToStaticMarkup(
        <Kicker as="span">02 · Lựa chọn</Kicker>
      );
      expect(html).toContain("<span");
      expect(html).toContain("02 · Lựa chọn");
    });
  });

  describe("Reveal", () => {
    it("renders Reveal wrapper with opacity and transform transitions", () => {
      const html = renderToStaticMarkup(
        <Reveal>
          <div>Nội dung chuyển động</div>
        </Reveal>
      );
      expect(html).toContain("duration-300");
      expect(html).toContain("motion-reduce:opacity-100");
      expect(html).toContain("Nội dung chuyển động");
    });
  });
});
