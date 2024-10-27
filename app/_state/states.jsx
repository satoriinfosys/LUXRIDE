"use client";

import { atom } from "recoil";

export const serviceLocation = atom({
    key: 'service-location',
    default: {
        from: '',
        to: '',
        time: '',
        date: ''
    },
});
