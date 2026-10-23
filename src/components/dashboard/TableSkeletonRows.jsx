import React from 'react';

const widths = ['w-6', 'w-28', 'w-24', 'w-24', 'w-12', 'w-16', 'w-28', 'w-14', 'w-20'];

const TableSkeletonRows = ({ columns = 9, rows = 8 }) => (
    Array.from({ length: rows }).map((_, r) => (
        <tr key={r} aria-hidden="true">
            {Array.from({ length: columns }).map((_, c) => (
                <td key={c}>
                    <div className={`skeleton h-4 ${widths[c % widths.length]}`}></div>
                    {(c === 2 || c === 3) && <div className="skeleton h-3 w-16 mt-2"></div>}
                </td>
            ))}
        </tr>
    ))
);

export default TableSkeletonRows;