// https://raqueeb.com/blog/3-patterns-to-write-better-and-more-readable-solidjs-components/#async-blocks
import { children, Component, createSignal, For, JSXElement } from "solid-js";

interface TabsProps {
  children: JSXElement;
}

export const Tabs: Component<TabsProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal<number>(0);

  const tabs = children(() => props.children);
  const evaluatedTabs = () => tabs.toArray() as unknown as TabProps[]; // this is where the magic happens this is a derived signal

  return (
    <div>
      <ul class="p-4 lg">
        <For each={evaluatedTabs()}>
          {({ title }, index) => (
            <li>
              <button
                class={
                  index() === activeTab()
                    ? "bg-red-300 font-bold"
                    : "bg-blue-200"
                }
                onClick={() => setActiveTab(index())}
              >
                {title}
              </button>
            </li>
          )}
        </For>
      </ul>
      <div class="p-5 text-lg">{evaluatedTabs()[activeTab()].children}</div>
    </div>
  );
};

interface TabProps {
  title: string;
  children: JSXElement;
}

// tabs is just a wrapper around a JSXElement with an added title
export const Tab: Component<TabProps> = (props) => {
  return props as unknown as JSXElement;
};
