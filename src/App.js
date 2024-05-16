import React from 'react';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import Home from './Components/Home/Home';
import './index.css';
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Header />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

      <Footer />
    </>
  );
}

export default App;
