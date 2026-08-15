import { useEffect } from "react";

type StyleSnapshot = Record<string, string>;

function snapshotStyles(element: HTMLElement, properties: string[]): StyleSnapshot {
  return Object.fromEntries(properties.map((property) => [property, element.style.getPropertyValue(property)]));
}

function restoreStyles(element: HTMLElement, snapshot: StyleSnapshot) {
  Object.entries(snapshot).forEach(([property, value]) => {
    if (value) element.style.setProperty(property, value);
    else element.style.removeProperty(property);
  });
}

export function useDragScrollLock(isDragging: boolean) {
  useEffect(() => {
    if (!isDragging) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const htmlStyles = snapshotStyles(html, ["overflow", "overscroll-behavior", "touch-action"]);
    const bodyStyles = snapshotStyles(body, [
      "overflow",
      "overscroll-behavior",
      "touch-action",
    ]);

    html.style.setProperty("overflow", "hidden");
    html.style.setProperty("overscroll-behavior", "none");
    html.style.setProperty("touch-action", "none");
    body.style.setProperty("overflow", "hidden");
    body.style.setProperty("overscroll-behavior", "none");
    body.style.setProperty("touch-action", "none");
    const preventTouchScroll = (event: TouchEvent) => event.preventDefault();
    document.addEventListener("touchmove", preventTouchScroll, { passive: false });

    return () => {
      restoreStyles(html, htmlStyles);
      restoreStyles(body, bodyStyles);
      document.removeEventListener("touchmove", preventTouchScroll);
    };
  }, [isDragging]);
}
