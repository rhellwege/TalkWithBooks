import { For, Component, onMount, Accessor, Setter } from "solid-js";

interface PaginationProps {
  currentPage: Accessor<number>;
  setPage: Setter<number>;
  maxPages: Accessor<number>;
}
export const Pagination: Component<PaginationProps> = (props) => {
  return (
    <div class="join">
      <button class="join-item btn">«</button>
      <button class="join-item btn">Page 22</button>
      <button class="join-item btn">»</button>
    </div>
  );
};
