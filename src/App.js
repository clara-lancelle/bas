import React from 'react';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import Home from './Components/Home/Home';
import InternshipOffers from './Components/Internship/InternshipOffers';
import ApprenticeOffers from './Components/Apprentice/Offers';
import CompanyList from './Components/Company/List';
import './index.css';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stage/offres" element={<InternshipOffers />} />
        <Route path="/alternance/offres" element={<ApprenticeOffers />} />
        <Route path="/entreprises" element={<CompanyList />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
