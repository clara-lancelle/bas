import React from "react";
import StudentAccount from "./Student/StudentAccount";
import CompanyUserAccount from "./Company/CompanyUserAccount"

export default function UserAccount({ userInfo, notify }) {
    if(userInfo && userInfo.userType == "Student"){
        return(<StudentAccount userInfo={userInfo} notify={notify}/>)
    }else{
        return(<CompanyUserAccount userInfo={userInfo} notify={notify}/>)
    }
}