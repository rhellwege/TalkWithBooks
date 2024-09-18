import { For, Component, onMount, Accessor, Setter } from "solid-js";

interface PaginationProps {
  currentPage: Accessor<number>;
  setPage: Setter<number>;
  maxPages: Accessor<number>;
}

export const Pagination: Component<PaginationProps> = (props) => {
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage < props.maxPages()) {
      props.setPage(newPage);
    }
  };
  return (
    <div class="join">
      <button
        class={
          "join-item btn " + (props.currentPage() <= 1 ? "btn-disabled" : "")
        }
        onClick={() => handlePageChange(props.currentPage() - 1)}
      >
        «
      </button>
      <input
        type="text"
        min="1"
        max={props.maxPages()}
        value={props.currentPage()}
        onInput={(ev) => handlePageChange(parseInt(ev.target.value, 10))}
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            handlePageChange(parseInt(ev.target.value, 10));
          }
        }}
        class="input input-bordered w-16 text-center"
        aria-label="Current Page"
      />
      <button
        class={
          "join-item btn " +
          (props.currentPage() >= props.maxPages() - 1 ? "btn-disabled" : "")
        }
        onClick={() => handlePageChange(props.currentPage() + 1)}
      >
        »
      </button>
    </div>
  );
};
