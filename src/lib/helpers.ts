export function getMaxZIndex(selector: string) {
  return Math.max(
    ...Array.from(document.querySelectorAll(selector), el =>
      parseFloat(window.getComputedStyle(el).zIndex),
    ).filter(zIndex => !Number.isNaN(zIndex)),
    0,
  );
}