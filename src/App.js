import React, { useState, useEffect } from 'react';
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
import SignInCompletion from './Components/Authentication/SignInCompletion';
import BackofficeCompanyOffers from './Components/Backoffice/CompanyOffers';
import useToken from "./Components/useToken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    userType: ''
  });
  const { token, setToken } = useToken()

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const notify = (message, type) => {
    if (type === 'error') {
      toast.error(message, {
        position: "top-right"
      });
    }
    if (type === 'success') {
      toast.success(message, {
        position: "top-right"
      });
    }
  }

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    notify('Vous êtes déconnecté !', 'success')
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = ({ message, type }) => {
    setModalIsOpen(false);
    if (message && type) {
      notify(message, type);
    }
  };

  return (
    <>
      <Header
        openModal={openModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        handleLogout={handleLogout}
        notify={notify} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offre/:id" element={<OfferDetail />} />
        <Route path="/offre/:id/postuler" element={<OfferApply />} />
        <Route path="/offres/stage" element={<OfferList type={"Stage"} />} />
        <Route path="/offres/alternance" element={<OfferList type={"Alternance"} />} />
        <Route path="/entreprises" element={<CompanyList />} />
        <Route path="/entreprise/:id" element={<CompanyDetail />} />
        <Route path="/finaliser-inscription" element={<SignInCompletion />} />
        <Route path="/backoffice/entreprise/offres" element={<BackofficeCompanyOffers />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
