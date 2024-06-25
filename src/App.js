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
import BackofficeCompanyOffers from './Components/Backoffice/CompanyOffers';
import Connection from './Components/Connection';
import CompanyInscription from './Components/CompanyInscription';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Header />
      <ToastContainer />
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
        <Route path="/backoffice/entreprise/offres" element={<BackofficeCompanyOffers />} />
      </Routes>
      <Connection />
      <CompanyInscription />
      <Footer />
    </>
  );
}

export default App;
