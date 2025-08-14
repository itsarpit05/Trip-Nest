import { useState } from 'react';
import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';

const Search = ({ onSearch }) => {
    const [location, setLocation] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);
    const [guests, setGuests] = useState('');

    const handleSearch = () => {
        // this is the child function which parent i.e. Home calls
        onSearch({
            location,
            checkin: date[0].startDate,
            checkout: date[0].endDate,
            guests,
        });
    };

    return (
        <div className="flex items-center justify-center my-8">
            <div className="flex items-center border rounded-full shadow-md p-2 bg-white relative">
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Search destination"
                    className="px-4 py-2 w-48 focus:outline-none"
                />
                <span className="border-l mx-2 h-8"></span>

                <button
                    onClick={(e) => setShowCalendar(!showCalendar)}
                    className="px-4 py-2 w-48 text-left text-gray-500 focus:outline-none"
                >
                    {date[0].startDate &&
                    date[0].endDate &&
                    date[0].startDate.getTime() !== date[0].endDate.getTime()
                        ? `${date[0].startDate.toLocaleDateString()}-${date[0].endDate.toDateString()}`
                        : 'Add dates'}
                </button>
                <span className="border-l mx-2 h-8"></span>

                <div className="flex items-center">
                    <input
                        type="Number"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        placeholder="Add guests"
                        min={1}
                        max={10}
                        className="px-4 py-2 w-48 focus:outline-none"
                    />
                </div>

                <button
                    onClick={handleSearch}
                    className="p-3 text-white bg-pink-500 rounded-full hover:bg-pink-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
                {showCalendar && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-20">
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item) => {
                                setDate([item.selection]);
                            }}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            minDate={new Date()}
                        />
                        <button
                            onClick={() => setShowCalendar(false)}
                            className="w-full bg-gray-200 py-2 font-semibold hover:bg-gray-300"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Search;
