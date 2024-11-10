"use client";

import { atom } from "recoil";

export const bookingDetails = atom({
    key: 'booking-details',
    default: {
        from: '',
        to: '',
        time: '',
        date: ''
    },
});

export const rideSummaryState = atom({
    key: "rideSummaryState",
    default: {
        returnDate: "",
        dropOffLocation: "",
        dropOffDate: "",
        dropOffTime: "",
        meetAndGreet: false,
        clientRequest: "",
        smoking: false,
        flightNumber: "",
        babySeatingCapacity: 1,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        totalLuggage: 0,
        totalSeating: 1
    },
});


export const paymentDetailsAtom = atom({
    key: 'paymentDetails',
    default: {
        cardType: '',
        cardNumber: '',
        cvv: '',
        cardExpiryMonth: '',
        cardExpiryYear: '',
        cardName: ''
    },
});
