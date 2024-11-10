"use client";
import apiService from "@/app/_api/apiService";
import Image from "next/image";
import debounce from "lodash.debounce";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { bookingDetails } from "@/app/_state/states";

const accessToken = process.env.MAP_ACCESS_TOKEN || "pk.eyJ1IjoiMTIzcm9zaGFuMTIzIiwiYSI6ImNsZ2QwcGp3ZzAwN3UzbHA3eGd3cGVveG0ifQ.OcKGB8CjV8B0ZmGptJCO6g";

export default function PlacePicker({ type }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(""); // Stores selected location name
  const [locations, setLocations] = useState([]); // For locations fetched from API
  const [searchTerm, setSearchTerm] = useState(""); // For search input field
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingDetails] = useRecoilState(bookingDetails); // Recoil state for 'from' and 'to' locations
  const inputRef = useRef();

  const fetchLocations = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?proximity=ip&access_token=${accessToken}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }
  
      const data = await response.json();

      if (data && data.features && Array.isArray(data.features)) {
        setIsActive(true);
        const locations = data.features.map((feature) => ({
          name: feature.place_name,
          coordinates: feature.geometry.coordinates,
        }));
        setLocations(locations); // Use the locations array
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
    if (query && !selectedLocation) {
      fetchLocations(query); // Fetch locations only when no location is selected
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
    if (type === "from" && bookingData.from.name) {
      setSelectedLocation(bookingData.from.name);
    } else if (type === "to" && bookingData.to.name) {
      setSelectedLocation(bookingData.to.name);
    }
  }, [type, bookingData]);


  return (
    <>
      <input
        ref={inputRef}
        className="search-input dropdown-location"
        type="text"
        placeholder={`Search location...`} // Dynamically show 'from' or 'to'
        value={selectedLocation || searchTerm} // Show selected location or searchTerm
        onChange={(e) => {
          const value = e.target.value;
          // Clear selected location when the user starts typing
          if (value && selectedLocation) {
            setSelectedLocation(""); // Clear selected location when typing starts
            if (type === "from") {
              setBookingDetails((prev) => ({ ...prev, from: {name: "", coordinates: null } })); // Clear Recoil 'from'
            } else if (type === "to") {
              setBookingDetails((prev) => ({ ...prev, to: {name: "", coordinates: null } })); // Clear Recoil 'to'
            }
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
                setSelectedLocation(elm.name); // Set selected location name
                setSearchTerm(""); // Clear search term after selecting a location
                setIsActive(false); // Close the dropdown
                // Update Recoil state with the selected location's id and name
                const locationInfo = { name: elm.name, coordinates: elm.coordinates };
                if (type === "from") {
                  setBookingDetails((prev) => ({ ...prev, from: locationInfo }));
                } else if (type === "to") {
                  setBookingDetails((prev) => ({ ...prev, to: locationInfo }));
                }
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
                  {elm.name}
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
