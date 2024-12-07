import React, { useState, useMemo } from 'react';
import { FaSearch, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { LuChevronFirst, LuChevronLeft, LuChevronRight, LuChevronLast } from 'react-icons/lu';

function Table({ columns, data }) {
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const sortedData = useMemo(() => {
        let sortableData = [...data];
        if (sortConfig.key) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [data, sortConfig]);

    const filteredData = sortedData.filter(item =>
        columns.some(column => {
            const value = typeof column.accessor === 'function' ? column.accessor(item) : item[column.accessor];
            return value && value.toString().toLowerCase().includes(search.toLowerCase());
        })
    );

    const paginatedData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="flex flex-col gap-4 overflow-x-scroll md:overflow-auto w-full p-1">
            <div className="flex flew-row gap-4 border bg-white dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:outline-blue-700 items-center px-5 py-2 rounded-xl hover:outline outline-2 outline-blue-500 w-1/2">
                <label htmlFor="search">
                    <FaSearch className="text-slate-400 dark:text-blue-400" />
                </label>
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Rechercher une attaque..."
                    className="w-full outline-none dark:bg-slate-900 dark:text-white"
                />
            </div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        {columns.map(column => (
                            <th
                                key={column.accessor}
                                onClick={() => requestSort(column.accessor)}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 cursor-pointer"
                            >
                                <span className="flex gap-2 flex-row items-center">
                                    {column.Header}
                                    {sortConfig.key === column.accessor ? (
                                        sortConfig.direction === 'ascending' ? <FaChevronUp /> : <FaChevronDown />
                                    ) : null}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedData.map((row, i) => (
                        <tr key={i}>
                            {columns.map(column => (
                                <td
                                    key={column.Header}
                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200"
                                >
                                    {typeof column.accessor === 'function' ? (column.accessor(row) || '-') : (row[column.accessor] || '-')}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between">
                <div>
                    <button onClick={() => setCurrentPage(0)} disabled={currentPage === 0} className="p-2 border rounded mr-2">
                        {<LuChevronFirst />}
                    </button>
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} disabled={currentPage === 0} className="p-2 border rounded mr-2">
                        {<LuChevronLeft />}
                    </button>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage) - 1))} disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage) - 1} className="p-2 border rounded mr-2">
                        {<LuChevronRight />}
                    </button>
                    <button onClick={() => setCurrentPage(Math.ceil(filteredData.length / itemsPerPage) - 1)} disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage) - 1} className="p-2 border rounded mr-2">
                        {<LuChevronLast />}
                    </button>
                </div>
                <span className="ml-4">
                    Page{' '}
                    <strong>
                        {currentPage + 1} sur {Math.ceil(filteredData.length / itemsPerPage)}
                    </strong>{' '}
                </span>
            </div>
        </div>
    );
}

export default Table;