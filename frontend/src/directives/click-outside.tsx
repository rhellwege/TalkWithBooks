import { onCleanup } from "solid-js";

export function clickOutside(el: HTMLElement, accessor: () => any) {
  const onClick = (e: MouseEvent) =>
    !el.contains(e.target as HTMLElement) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}
