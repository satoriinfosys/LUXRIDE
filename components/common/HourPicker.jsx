"use client";
import { useRecoilState } from "recoil";
import { bookingDetails } from "@/app/_state/states";

export default function HourPicker() {
    const [bookingData, setBookingDetails] = useRecoilState(bookingDetails); // Recoil state for 'from' and 'to' locations

    const handleHourChange = (e) => {
        setBookingDetails((prev) => ({ ...prev, durationInHours: parseInt(e?.target?.value || 0) || 0 })); // Store the time as an ISO string
    };

    return (
        <div className="form-group">
            <input
               className="search-input dropdown-location"
                id="totalHours"
                type="number"
                name="totalHours"
                value={bookingData.durationInHours}
                onChange={handleHourChange}
                placeholder="Pick Hours.."
                min={3}
            />
        </div>
    );
}
