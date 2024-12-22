const { SALES_TAX, MEET_AND_GREET, GRATUITY_AMOUNT, CHILD_SEAT_RATE } = require("./constants");

export const calculateCost = ({ selectedCar, rideExtra, bookingData }) => {
    const babySeatPrice = rideExtra?.babySeatingCapacity >= 2 ? rideExtra.babySeatingCapacity * CHILD_SEAT_RATE : 0;
    const gratuityPrice = rideExtra?.gratuityAmount ? parseFloat(rideExtra?.gratuityAmount) : 0;
    const meetAndGreetPrice = rideExtra.meetAndGreet ? MEET_AND_GREET  : 0;
    const salesTax = SALES_TAX;
    const totalExtra = babySeatPrice + gratuityPrice + meetAndGreetPrice + salesTax;

    let selectedCarPrice = 0;
    if (bookingData?.bookType === "distance") {
        const pricePerHourDistance = selectedCar.prizePerDistance;
        selectedCarPrice = pricePerHourDistance * bookingData.distanceInMiles; // calculated per miles
    }
    if (bookingData?.bookType === "hourly") {
        const pricePerHour = selectedCar.prizePerHour;
        selectedCarPrice = pricePerHour * (bookingData.durationInHours + bookingData.durationInMinutes);
    };
    if (bookingData?.bookType === "rate") {
        const flatRate = selectedCar.flatRate;
        selectedCarPrice = flatRate;
    }
    const totalPrice = selectedCarPrice + totalExtra;

    return { totalPrice, selectedCarPrice }
}