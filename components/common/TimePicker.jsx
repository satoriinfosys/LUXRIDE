"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useRecoilState } from "recoil";
import { bookingDetails } from "@/app/_state/states";

export default function TimePickerComponent() {
  const [bookingData, setBookingDetails] = useRecoilState(bookingDetails);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    if (bookingData.time) {
      setValue(new Date(bookingData.time));
    }
  }, [bookingData.time]);

  const handleTimeChange = (newTime) => {
    setValue(newTime);
    setBookingDetails((prev) => ({ ...prev, time: newTime }));
  };

  return (
    <DatePicker
      disableDayPicker
      value={value}
      format="hh:mm:ss A"
      plugins={[<TimePicker />]}
      onChange={handleTimeChange}
    />
  );
}
