"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useRecoilState } from "recoil";
import { serviceLocation } from "@/app/_state/states";

export default function TimePickerComponent() {
  const [locationData, setLocationData] = useRecoilState(serviceLocation);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    if (locationData.time) {
      setValue(new Date(locationData.time));
    }
  }, [locationData.time]);

  const handleTimeChange = (newTime) => {
    setValue(newTime);
    setLocationData((prev) => ({ ...prev, time: newTime }));
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
