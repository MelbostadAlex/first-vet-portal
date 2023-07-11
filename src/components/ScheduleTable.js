import React, { useState, useEffect } from 'react'
import { usePagination } from "react-use-pagination";
import axios from 'axios';

const ScheduleTable = () => {
    const [ schedules, setSchedules] = useState([]);

    const dataOptions = [
        {
            name: 'John Doe',
            key: 'John Doe',
        },

        {
            name: 'Jane Doe',
            key: 'Jane Doe',
        }
    ]

    const {
        currentPage,
        totalPages,
        setNextPage,
        setPreviousPage,
        nextEnabled,
        previousEnabled,
        startIndex,
        endIndex,
    } = usePagination({ totalItems: schedules.length, initialPage: 0, initialPageSize: 6});

    const getSchedules = () => {
        axios.get( "http://127.0.0.1:8000/api/schedule").then(res => {
            let data = res.data;
            setSchedules(data)
        })
    };

    const filterOnEmployee = (value) => {
        if(!value || value === "All") {
            getSchedules();
        }

        let filteredSchedules = schedules.filter(item => item.employeeName === value);
        console.log(filteredSchedules);

        setSchedules(filteredSchedules)
    }

    useEffect(() => {
        getSchedules();
    }, []);

    return (
        <div className='h-[1000px] max-w-[1200px] mx-auto px-8 flex flex-col justify-center'>
            <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div>
                    <h2 className="text-2xl font-semibold leading-tight">Lediga tider</h2>
                </div>
                <div className="my-2 flex sm:flex-row flex-col">
                    <div className="flex flex-row mb-1 sm:mb-0">
                        <div className="relative">
                            <select onChange={({ target: { value } }) => filterOnEmployee(value)} className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option key="all"> All </option>
                                {dataOptions.map((employee, index) =>
                                    <option key={employee.key}> { employee.name }</option>
                                )}
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="relative">
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                            <tr>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Veterinär
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Pris (SEK)
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Datum
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Boka
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {schedules.slice(startIndex, endIndex).map((schedule, index) =>
                                <tr key={index}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 w-10 h-10">
                                                { schedule.employeeName === "Jane Doe"
                                                    ? <img className="w-full h-full rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80" alt=""/>
                                                    : <img className="w-full h-full rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80" alt=""/>
                                                }
                                            </div>

                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    { schedule.employeeName }
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{ schedule.price }</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            { schedule.time }
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span
                                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'> Boka </button>
                                            </span>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <div
                            className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                            <span className="text-xs xs:text-sm text-gray-900">
                                Showing {currentPage + 1 } of {totalPages} of {schedules.length} Entries
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                { previousEnabled
                                    ? <button onClick={setPreviousPage} className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"> Prev </button>
                                    : <button onClick={setPreviousPage} disabled className="text-sm bg-white-300 text-gray-800 font-semibold py-2 px-4 rounded-l"> Prev </button>
                                }
                                { nextEnabled
                                    ? <button onClick={setNextPage} className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"> Next </button>
                                    : <button disabled className="text-sm bg-white-300 text-gray-800 font-semibold py-2 px-4 rounded-r"> Next </button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ScheduleTable