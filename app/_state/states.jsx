"use client";

import { atom } from "recoil";

export const bookingDetails = atom({
    key: 'booking-details',
    default: {
        from: '',
        to: '',
        time: '',
        date: '',
        flatRate: '',
    },
});

export const reservationDetails = atom({
    key: 'reservation-details',
    default: null
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
        babySeatingCapacity: 0,
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

export const selectedCarAtom = atom({
    key: 'selectedCar',
    default: null
})
