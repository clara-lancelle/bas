import React from 'react';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import Home from './Components/Home/Home';
import StageOffers from './Components/Stage/Offers';
import ApprenticeOffers from './Components/Apprentice/Offers';
import CompanyList from './Components/Company/List';
import CompanyDetail from './Components/Company/Detail';
import OfferDetail from './Components/Details/Offer';
import './index.css';
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stage/offres" element={<StageOffers />} />
          <Route path="/stage/offre/:id" element={<OfferDetail />} />
          <Route path="/alternance/offres" element={<ApprenticeOffers />} />
          <Route path="/alternance/offre/:id" element={<OfferDetail />} />
          <Route path="/entreprises" element={<CompanyList />} />
          <Route path="/entreprise/:id" element={<CompanyDetail />} />
        </Routes>

      <Footer />
    </>
  );
}

export default App;
