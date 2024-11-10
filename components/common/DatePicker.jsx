"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import { useRecoilState } from "recoil";
import { bookingDetails } from "@/app/_state/states";

export default function DatePickerComponent() {
  const [bookingData, setBookingDetails] = useRecoilState(bookingDetails); 
  const [value, setValue] = useState(new Date());  // Initializing with today's date.

  useEffect(() => {
    if (bookingData.date) {
      setValue(new Date(bookingData.date));  // Convert the saved date string back to a Date object
    }
  }, [bookingData.date]);

  const handleDateChange = (newDate) => {
    const formattedDate = newDate.format("YYYY-MM-DD");  // Format the date as a string
    setValue(newDate); 
    setBookingDetails((prev) => ({ ...prev, date: formattedDate }));  // Save the formatted date string
  };

  return (
    <DatePicker
      format="MMMM DD YYYY"
      value={value}
      onChange={handleDateChange}
    />
  );
}
