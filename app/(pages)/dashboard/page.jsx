"use client";
import DashboardLayout from "@/components/client-dashboard/DashboardLayout";
import ProfileSection from "@/components/client-dashboard/ProfileSection";
import BookingHistorySection from "@/components/client-dashboard/BookingHistorySection";
import PaymentSection from "@/components/client-dashboard/PaymentSection";
import { useEffect, useState } from "react";
import OverviewSection from "@/components/client-dashboard/OverviewSection";
import apiService from "@/app/_api/apiService";
import Cookies from "js-cookie";

export default function DashboardPage() {
    const [activeSection, setActiveSection] = useState("profileoverview");

    const [userDetails, setAuthUserDetails] = useState(null);

    useEffect(() => {
        // Retrieve user details from localStorage
        const savedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (savedUserDetails) {
            getUser(savedUserDetails.userId)
        }
    }, []);

    const getUser = async (userId) => {
        const token = Cookies.get("token");
        const response = await apiService.get(`/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setAuthUserDetails(response);
    }

    // Section components mapping
    const sections = {
        overview: <OverviewSection />,
        profile: <ProfileSection profile={userDetails}/>,
        history: <BookingHistorySection />,
        payment: <PaymentSection profile={userDetails}/>,
    };

    return (
        <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection} userDetails={userDetails}> 
            {/* Call the function to render the correct section */}
            {sections[activeSection] || <OverviewSection />}
        </DashboardLayout>
    );
}