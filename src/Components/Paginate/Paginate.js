import React from "react";

export default function Paginate({currentPage}) {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    
    const renderPageNumbers = () => {        
        if (currentPage == 1) {
            pageNumbers.push(
                <li key={1}>
                    <button className="py-1 px-3 rounded-md bg-blue-dark text-white">{1}</button>
                </li>
            )
        }
        return pageNumbers;
    }

    return (
        <nav className="w-full">
            <ul className="pagination flex justify-center">
                {renderPageNumbers()}
            </ul>
        </nav>
    )
}