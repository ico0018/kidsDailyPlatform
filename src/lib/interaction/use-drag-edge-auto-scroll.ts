import { useEffect } from "react";
import type { MutableRefObject } from "react";

const EDGE_ZONE_PX = 84;
const MAX_SCROLL_STEP_PX = 18;

export function useDragEdgeAutoScroll({
  enabled,
  pointerClientYRef,
  onAutoScroll,
}: {
  enabled: boolean;
  pointerClientYRef: MutableRefObject<number | null>;
  onAutoScroll: MutableRefObject<() => void>;
}) {
  useEffect(() => {
    if (!enabled) return undefined;

    let frameId = 0;
    const tick = () => {
      const pointerClientY = pointerClientYRef.current;
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      if (pointerClientY !== null) {
        const upperDistance = pointerClientY;
        const lowerDistance = viewportHeight - pointerClientY;
        const edgeDistance = Math.min(upperDistance, lowerDistance);
        if (edgeDistance < EDGE_ZONE_PX) {
          const direction = upperDistance < lowerDistance ? -1 : 1;
          const intensity = 1 - Math.max(0, edgeDistance) / EDGE_ZONE_PX;
          const scrollBy = direction * Math.max(1, Math.round(MAX_SCROLL_STEP_PX * intensity));
          window.scrollBy({ top: scrollBy, behavior: "instant" });
          onAutoScroll.current();
        }
      }
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [enabled, onAutoScroll, pointerClientYRef]);
}
