import {
  Accessor,
  Setter,
  createContext,
  useContext,
  createSignal,
  Component,
  JSXElement,
} from "solid-js";

interface ContextProps {
  count: Accessor<number>;
  setCount: Setter<number>;
  pageName: Accessor<string>;
  setPageName: Setter<string>;
}

const GlobalContext = createContext<ContextProps>();

interface GlobalContextProviderProps {
  children: JSXElement;
}

export const GlobalContextProvider: Component<GlobalContextProviderProps> = (
  props,
) => {
  const [count, setCount] = createSignal<number>(0);
  const [pageName, setPageName] = createSignal<string>("");

  return (
    <GlobalContext.Provider value={{ count, setCount, pageName, setPageName }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext)!;
