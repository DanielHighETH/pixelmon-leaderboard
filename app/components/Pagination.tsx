import React, { useState } from 'react';

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const [inputPage, setInputPage] = useState(currentPage);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const goToPage = (pageNumber: number) => {
        const validPageNumber = Math.max(1, Math.min(pageNumber, totalPages));
        paginate(validPageNumber);
        setInputPage(validPageNumber);
    };

    return (
        <nav className="flex justify-center items-center space-x-2">
            <button onClick={() => goToPage(1)} disabled={currentPage === 1}>1</button>
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>

            <input 
                type="number" 
                value={inputPage} 
                onChange={(e) => setInputPage(parseInt(e.target.value, 10))}
                onKeyPress={(e) => e.key === 'Enter' && goToPage(inputPage)}
                className="w-12 text-center"
            />
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>{totalPages}</button>
            <button onClick={() => goToPage(inputPage)}>Go to page</button>

        </nav>
    );
};

export default Pagination;
