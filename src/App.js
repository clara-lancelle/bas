import React from 'react';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import Home from './Components/Home/Home';
import CompanyList from './Components/Company/CompanyList';
import CompanyDetail from './Components/Company/Detail';
import OfferDetail from './Components/Offer/Detail';
import OfferApply from './Components/Offer/Apply';
import './index.css';
import { Routes, Route } from "react-router-dom";
import OfferList from './Components/Offer/OfferList';
import SignIn from './Components/Authentication/SignIn';
import SignInCompletion from './Components/Authentication/SignInCompletion';
import Connection from './Components/Connection';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offre/:id" element={<OfferDetail />} />
        <Route path="/offre/:id/postuler" element={<OfferApply />} />
        <Route path="/offres/stage" element={<OfferList type={"Stage"} />} />
        <Route path="/offres/alternance" element={<OfferList type={"Alternance"} />} />
        <Route path="/entreprises" element={<CompanyList />} />
        <Route path="/entreprise/:id" element={<CompanyDetail />} />
        <Route path="/inscription" element={<SignIn />} />
        <Route path="/finaliser-inscription" element={<SignInCompletion />} />
      </Routes>
      <Connection />
      <Footer />
    </>
  );
}

export default App;
