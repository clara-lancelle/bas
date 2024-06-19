import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Ariane from '../Partials/Ariane';
import Paginate from "../Paginate/Paginate";
import Sidebar from "./Sidebar/Sidebar";

export default function CompanyList() {
    return (
        <div className="h-full">
            <Sidebar />
        </div>
    )
}