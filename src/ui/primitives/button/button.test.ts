/**
 * Button renders a button. Its variants are default, outline, and ghost;
 * its sizes are default, xs, sm, and icon-sm.
 */
import { mount, unmount } from "svelte";
import { afterEach, describe, expect, it } from "vitest";
import { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from "$lib/ui/primitives/button";

type Equal<Left, Right> =
  (<T>() => T extends Left ? 1 : 2) extends <T>() => T extends Right ? 1 : 2 ? true : false;

const variantSurface: Equal<NonNullable<ButtonVariant>, "default" | "outline" | "ghost"> = true;
const sizeSurface: Equal<NonNullable<ButtonSize>, "default" | "xs" | "sm" | "icon-sm"> = true;
const hrefIsAbsent: Equal<"href" extends keyof ButtonProps ? true : false, false> = true;

const cleanups: Array<() => void> = [];

function mounted(props: ButtonProps = {}): HTMLButtonElement {
  const target = document.createElement("div");
  document.body.append(target);
  const component = mount(Button, { target, props });
  cleanups.push(() => {
    unmount(component);
    target.remove();
  });
  const button = target.querySelector("button");
  if (!button) {
    throw new Error("Button did not render a button");
  }
  return button;
}

afterEach(() => {
  for (const cleanup of cleanups) {
    cleanup();
  }
  cleanups.length = 0;
});

describe("Button", () => {
  it("renders a button", () => {
    const button = mounted();

    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("type")).toBe("button");
    expect(button.getAttribute("data-slot")).toBe("button");
    expect(button.className).toContain("bg-primary");
    expect(button.className).toContain("h-8");
    expect(button.className).not.toContain("[a]:");
    expect(document.body.querySelector("a")).toBeNull();
  });

  it("paints outline and sm", () => {
    const button = mounted({ variant: "outline", size: "sm" });

    expect(button.className).toContain("border-border");
    expect(button.className).toContain("h-7");
    expect(button.className).not.toContain("bg-primary");
  });

  it("paints outline and xs", () => {
    const button = mounted({ variant: "outline", size: "xs" });

    expect(button.className).toContain("border-border");
    expect(button.className).toContain("h-6");
    expect(button.className).toContain("text-xs");
  });

  it("paints ghost and icon-sm", () => {
    const button = mounted({ variant: "ghost", size: "icon-sm" });

    expect(button.className).toContain("size-7");
    expect(button.className).not.toContain("bg-primary");
  });

  it("forwards type and disabled", () => {
    const button = mounted({ type: "submit", disabled: true });

    expect(button.getAttribute("type")).toBe("submit");
    expect(button.disabled).toBe(true);
  });

  it("publishes the variants and sizes call sites use", () => {
    expect(variantSurface).toBe(true);
    expect(sizeSurface).toBe(true);
    expect(hrefIsAbsent).toBe(true);
  });
});
