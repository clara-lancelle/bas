import React from 'react';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import Home from './Components/Home/Home';
import StageOffers from './Components/Stage/Offers';
import ApprenticeOffers from './Components/Apprentice/Offers';
import './index.css';
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stage/offres" element={<StageOffers />} />
          <Route path="/alternance/offres" element={<ApprenticeOffers />} />
        </Routes>

      <Footer />
    </>
  );
}

export default App;
