/* eslint-disable */
import React, { useState } from "react"
import AdminSidebar from "../components/AdminSidebar"
import Dashboard from "../components/Dashboard"
import AddProduct from "../components/AddProduct"
import Category from "../components/Category"
import ShowProduct from "../components/ShowProduct"
import OrderPlace from "../components/OrderPlace"

const AdminPanel = () => {
    const [selectedOption, setSelectedOption] = useState("Dashboard")

    const renderContent = () => {
        switch (selectedOption) {
            case "Dashboard":
                return <Dashboard />
            case "Add-Products":
                return <AddProduct />
            case "Show-Products":
                return <ShowProduct />
            case "Category":
                return <Category />
            case "Orders":
                return <OrderPlace />
            default:
                return <Dashboard />
        }
    }

    return (
        <>
            <div className="w-full h-screen overflow-hidden bg-slate-100 flex gap-10 overflow-y-auto">
                <AdminSidebar onOptionClick={(option) => setSelectedOption(option)} />
                <div className="flex flex-col items-center justify-center gap-y-9">
                   {renderContent()}
                </div>
            </div>
        </>
    )
}

export default AdminPanel