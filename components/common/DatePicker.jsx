"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import { useRecoilState } from "recoil";
import { serviceLocation } from "@/app/_state/states";

export default function DatePickerComponent() {
  const [locationData, setLocationData] = useRecoilState(serviceLocation); 
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    if (locationData.date) {
      setValue(new Date(locationData.date)); 
    }
  }, [locationData.date]);

  const handleDateChange = (newDate) => {
    setValue(newDate); 
    setLocationData((prev) => ({ ...prev, date: newDate }));
  };

  return (
    <DatePicker
      format="MMMM DD YYYY"
      value={value}
      onChange={handleDateChange}
    />
  );
}
