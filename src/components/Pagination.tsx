import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="my-8 flex items-center justify-center">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="rounded-l bg-gray-200 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300 focus:outline-none"
      >
        Prev
      </button>

      <button
        onClick={() => onPageChange(currentPage)}
        className="bg-blue-500 px-4 py-2
              text-white "
      >
        {currentPage}
      </button>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="rounded-r bg-gray-200 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300 focus:outline-none"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
