import Dayjs from "dayjs";
import React, { useEffect, useState } from 'react'

function TableData({ row, checkData, handleCheckboxChange, handleRadioChange, checkedItems, selectAllTab }) {
    const [status, setStatus] = useState(row.status);

    const handleChange = (value) => {
        setStatus(value)
    }

    useEffect(() => {
        handleRadioChange(row.id, status)
    }, [status])

    return (
        <tr
            key={row.id}
            className="border-b border-gray-200 hover:bg-slate-100 text-sm font-medium text-gray-600 rounded-md"
        >
            <td className="px-4 py-2 border-slate-300">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        className="w-6 h-6 bg-white rounded shadow-inner text-white border accent-[#3fd6ab] border-slate-400"
                        checked={!!checkedItems[row.id]}
                        onChange={() =>
                            handleCheckboxChange(row.id)
                        }
                    />
                    <span className="ml-2 text-gray-600">
                        {row.id}
                    </span>
                </div>
            </td>

            <td className="px-4 py-2 border-slate-300 font-['Outfit']">
                {`${row.student_first_name} ${row.student_last_name}`}
            </td>
            <td className="px-4 py-2 border-slate-300 font-['Outfit']">
                {row.project}
            </td>
            <td className="px-4 py-2 border-slate-300 font-['Outfit']">
                {row.topic}
            </td>
            <td className="px-4 py-2 border-slate-300 font-['Outfit']">
                {row.created_at
                    ? `${Dayjs(row.created_at).format(
                        "D MMM YYYY"
                    )}, ${Dayjs(row.created_at).format(
                        "h:mm A"
                    )}`
                    : "Date not available"}
            </td>
            <td className="px-4 py-2 border-slate-300">
                <div className="w-[30px] h-[30px] p-[7px] bg-emerald-400 rounded-lg justify-center items-center gap-2.5 inline-flex">
                    <a
                        href={row.file}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="bx bx-download text-white px-2 py-1"></i>
                    </a>
                </div>
            </td>

            <td className="px-4 py-2">
                <div className="flex items-center">
                    <input
                        type="radio"
                        id={`Passed-${row.id}`}
                        name={`radio-${row.id}`}
                        className="w-6 h-6 bg-white rounded shadow-inner border accent-[#3fd6ab] border-slate-400"
                        checked={
                            status === 'Passed'
                        }
                        value="Passed"
                        onChange={(e) => handleChange(e.target.value)}
                        key={`Passed-${row.id}`}
                        disabled={selectAllTab === 'all'}
                    />
                </div>
            </td>
            <td className="px-4 py-2">
                <div className="flex items-center">
                    <input
                        type="radio"
                        id={`Failed-${row.id}`}
                        name={`radio-${row.id}`}
                        value="Failed"
                        className="w-6 h-6 bg-white rounded shadow-inner border accent-[#dd3c1f] border-slate-400"
                        checked={
                           status === 'Failed'
                        }
                        onChange={(e) => handleChange(e.target.value)}
                        key={`Failed-${row.id}`}
                        disabled={selectAllTab === 'all'}
                    />
                </div>
            </td>
        </tr>
    )
}

export default TableData