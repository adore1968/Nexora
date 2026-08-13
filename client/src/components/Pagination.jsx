function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {/* Previous */}
      <button
        onClick={() => setCurrentPage((page) => page - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {/* Pages */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
            currentPage === index + 1
              ? "bg-indigo-500 text-white"
              : "cursor-pointer border border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => setCurrentPage((page) => page + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
