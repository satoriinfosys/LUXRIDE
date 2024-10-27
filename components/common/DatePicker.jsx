"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import { useRecoilState } from "recoil";
import { bookingDetails } from "@/app/_state/states";

export default function DatePickerComponent() {
  const [bookingData, setBookingDetails] = useRecoilState(bookingDetails); 
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    if (bookingData.date) {
      setValue(new Date(bookingData.date)); 
    }
  }, [bookingData.date]);

  const handleDateChange = (newDate) => {
    setValue(newDate); 
    setBookingDetails((prev) => ({ ...prev, date: newDate }));
  };

  return (
    <DatePicker
      format="MMMM DD YYYY"
      value={value}
      onChange={handleDateChange}
    />
  );
}
