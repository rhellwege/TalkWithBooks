// generic utility to set slots with arbitrary names. Used with parent components that can display slots in different ways with defined slot names
// essentially a map from name to child that is declarable in jsx
import { children, Component, createComputed, JSXElement, on } from "solid-js";
import { createStore } from "solid-js/store";

export const getSlots = (_children: JSXElement) => {
  const parts = children(() => _children);
  const [slots, setSlots] = createStore<Record<string, JSXElement>>({});
  createComputed(
    on(parts, () => {
      for (const part of parts.toArray() as unknown as SlotProps[]) {
        if (!part.name) {
          setSlots("default", () => part);
          continue;
        }
        setSlots(part.name, () => part.children);
      }
    }),
  );
  return slots;
};

interface SlotProps {
  name: string;
  children: JSXElement;
}
export const Slot: Component<SlotProps> = (props) => {
  return props as unknown as JSXElement;
};
