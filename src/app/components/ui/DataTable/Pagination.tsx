import React from 'react';
import { Button } from 'react-bootstrap';
import "./Datatable.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';

type paginationProps = {
    itemsPerPage: number;
    setCurrentPage: any;
    currentPage: number;
    setItemsPerPage: any;
    totalPages: number
    totalRecord: number
}

const Pagination = ({ itemsPerPage, setCurrentPage, currentPage, setItemsPerPage, totalPages, totalRecord }: paginationProps) => {

    // Change items per page
    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(1); // Reset to the first page when changing items per page
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const generatePaginationButtons = () => {
        const visibleButtons = 5; // Number of visible buttons
        const totalButtons = Math.min(visibleButtons, totalPages);

        let startPage = Math.max(currentPage - Math.floor(totalButtons / 2), 1);
        const endPage = startPage + totalButtons - 1;

        if (endPage > totalPages) {
            startPage = Math.max(totalPages - totalButtons + 1, 1);
        }

        return Array.from(
            { length: totalButtons },
            (_, index) => startPage + index
        );
    };

    return (
        <div className="pagination">
            <div className="gap-2 per-pages-items">
                <label className="text-sm">Row Per Page</label>
                <select
                    className="form-select form-select-sm form-control"
                    value={itemsPerPage}
                    onChange={(e) =>
                        handleItemsPerPageChange(parseInt(e.target.value))
                    }
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                {/* <label className="text-sm">Entries</label> */}
                <label className="text-sm"> of {totalRecord} Entries</label>
            </div>

            <ul className="gap-2 mb-0 pages-count">
                <li className='list-style'>
                    <Button variant="trasprenet" className='text-xl text-slate-700 border-0 p-0' disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
                        <ChevronLeft />
                    </Button>
                </li>
                <li>
                    <Button variant="trasprenet" className='text-slate-700 border-0 p-0 text-sm' disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                        Prev
                    </Button>
                </li>
                {generatePaginationButtons().map((page, i) => (
                    <li key={i}>
                        <Button variant="trasprenet" onClick={() => handlePageChange(page)} className={`text-sm rounded d-flex justify-content-center align-items-center p-1 ${page === currentPage ? 'text-white bg-primary' : 'bg-slate-200 text-muted'}`} style={{ width: 30, height: 30 }}>
                            {page}
                        </Button>
                    </li>
                ))}
                <li>
                    <Button variant="trasprenet" className='text-slate-700 border-0 p-0 text-sm' disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                    </Button>
                </li>
                <li>
                    <Button variant="trasprenet" className='text-xl text-slate-700 border-0 p-0' disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>
                        <ChevronRight />
                    </Button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination
