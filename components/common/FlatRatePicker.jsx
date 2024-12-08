"use client";
import apiService from "@/app/_api/apiService";
import Image from "next/image";
import debounce from "lodash.debounce";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { bookingDetails } from "@/app/_state/states";


export default function FlatRatePicker() {
    const [isActive, setIsActive] = useState(false);
    const [selectedFlatRate, setSelectedFlatRate] = useState(""); // Stores selected location name
    const [locations, setLocations] = useState([]); // For locations fetched from API
    const [searchTerm, setSearchTerm] = useState(""); // For search input field
    const [isLoading, setIsLoading] = useState(false);
    const [bookingData, setBookingDetails] = useRecoilState(bookingDetails); // Recoil state for 'from' and 'to' locations
    const inputRef = useRef();

    const fetchFlatRate = async (query) => {
        setIsLoading(true);
        try {
            const response = await apiService.post("/flatrate/get-all", {
                "status": true,
                "sort": "DESC",
                "limit": 10,
                "page": 1,
                "searchTerm": query,
                "isActive": true
            })


            const data = await response.data;

            if (data) {
                setIsActive(true);
                setLocations(data); // Use the locations array
            } else {
                setIsActive(false);
                setLocations([]); // Handle no results
            }
        } catch (error) {
            console.error("Error fetching locations:", error);
            setLocations([]); // Handle API errors
        } finally {
            setIsLoading(false);
        }
    };


    // Debounced search function to limit API calls
    const debouncedFetch = debounce((query) => {
        if (query && !selectedFlatRate) {
            fetchFlatRate(query); // Fetch locations only when no location is selected
        }
    }, 300);

    // Trigger search when the user types in the search input
    useEffect(() => {
        debouncedFetch(searchTerm); // Fetch locations based on search term
    }, [searchTerm]);

    // Close dropdown when clicking outside
    const addInactive = (event) => {
        if (!inputRef.current?.contains(event.target)) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", (e) => addInactive(e));
        return () => {
            document.removeEventListener("click", addInactive);
        };
    }, []);

    // Set default selected location from Recoil state on component mount
    useEffect(() => {
        if (bookingData.flatRate) {
            setSelectedFlatRate(bookingData.flatRate.name);
        }
    }, [bookingData]);


    return (
        <>
            <input
                ref={inputRef}
                className="search-input dropdown-location"
                type="text"
                placeholder={`Search Flat Rate...`} // Dynamically show 'from' or 'to'
                value={selectedFlatRate || searchTerm} // Show selected location or searchTerm
                onChange={(e) => {
                    const value = e.target.value;
                    // Clear selected location when the user starts typing
                    if (value && selectedFlatRate) {
                        setSelectedFlatRate(""); // Clear selected location when typing starts
                        setBookingDetails((prev) => ({ ...prev, flatRate: null }));
                    }
                    setSearchTerm(value); // Update searchTerm when typing
                }}
            />

            <div
                className="box-dropdown-location"
                style={isActive ? { display: "block" } : { display: "none" }}
            >
                <div className="list-locations">
                    {locations.map((elm, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                setSelectedFlatRate(elm); // Set selected location name
                                setSearchTerm(""); // Clear search term after selecting a location
                                setIsActive(false); // Close the dropdown
                                // Update Recoil state with the selected location's id and name
                                const flatRateInfo = { name: elm.from + '-' + elm.to, id: elm.id, description: elm.description };
                                setBookingDetails((prev) => ({ ...prev, flatRate: flatRateInfo }));
                            }}
                            className="item-location"
                        >
                            <div className="location-icon">
                                <Image
                                    width={16}
                                    height={16}
                                    src={"/assets/imgs/page/homepage1/plane.png"}
                                    alt="luxride"
                                />
                            </div>
                            <div className="location-info">
                                <h6 className="text-16-medium color-text title-location">
                                    {elm.from}-{elm.to}
                                </h6>
                                <p className="text-14 color-grey searchLocations">
                                    {elm.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
