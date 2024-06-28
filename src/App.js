import React, { useState, useEffect } from 'react';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import Home from './Components/Home/Home';
import CompanyList from './Components/Company/CompanyList';
import CompanyDetail from './Components/Company/Detail';
import OfferDetail from './Components/Offer/Detail';
import OfferApply from './Components/Offer/Apply';
import './index.css';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import OfferList from './Components/Offer/OfferList';
import SignInCompletion from './Components/Authentication/SignInCompletion';
import useToken from "./Components/useToken";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import SignUp from './Components/Form/SignUpChoice';
import SignIn from './Components/Form/SignIn';
import PrivateRoute from './Components/Authentication/PrivateRoute';
import { restrictedRoutes } from './Routes/Restricted';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [userInfo, setUserInfo] = useState({
    gender: '',
    firstname: '',
    name: '',
    birthdate: '',
    cellphone: '',
    email: '',
    emailConfirm: '',
    address: '',
    additionalAddress: '',
    zipCode: '',
    city: '',
  });
  const { token, setToken } = useToken()
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: '50%',
      bottom: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '500px',
      width: '100%',
      height: 'fit-content',
      padding: '80px 0',
    },
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      setUserInfo({
        firstName: sessionStorage.getItem('userFirstName'),
        lastName: sessionStorage.getItem('userLastName'),
        userType: sessionStorage.getItem('userType'),
        userImage: sessionStorage.getItem('userImage') ? sessionStorage.getItem('userImage') : null
      });
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
    setUserInfo({
      gender: '',
      firstname: '',
      name: '',
      birthdate: '',
      cellphone: '',
      email: '',
      emailConfirm: '',
      address: '',
      additionalAddress: '',
      zipCode: '',
      city: ''
    });
    notify('Vous êtes déconnecté !', 'success');

    const restrictedPaths = restrictedRoutes.filter(route => route.restricted).map(route => route.path);
    if (restrictedPaths.includes(location.pathname)) {
      navigate('/');
    }
  };

  const openSignUpModal = () => {
    setModalContent('signUp');
    openModal();
  };

  const openSignInModal = () => {
    setModalContent('signIn');
    openModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = ({ message, type }) => {
    setModalIsOpen(false);
    if (message && type) {
      notify(message, type);
    }
  };

  const createElementWithProps = (element, props) => {
    return React.cloneElement(element, props);
  };

  Modal.setAppElement('#root');

  return (
    <>
      <Header
        openModal={openModal}
        closeModal={closeModal}
        openSignUpModal={openSignUpModal}
        openSignInModal={openSignInModal}
        modalIsOpen={modalIsOpen}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        handleLogout={handleLogout}
        notify={notify} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home openSignUpModal={openSignUpModal} />} />
        <Route path="/offre/:id" element={<OfferDetail />} />
        <Route path="/offre/:id/postuler" element={<OfferApply
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
          setUserInfo={setUserInfo} />} />
        <Route path="/offres/stage" element={<OfferList type={"Stage"} />} />
        <Route path="/offres/alternance" element={<OfferList type={"Alternance"} />} />
        <Route path="/entreprises" element={<CompanyList />} />
        <Route path="/entreprise/:id" element={<CompanyDetail />} />
        <Route path="/finaliser-inscription" element={<SignInCompletion />} />
        {restrictedRoutes.map((route, index) => {
          if (route.restricted) {
            return (
              <Route key={index} element={<PrivateRoute notify={notify} openSignInModal={() => openModal('signIn')} />}>
                <Route
                  path={route.path}
                  element={createElementWithProps(route.element, { ...route.props, userInfo, notify })}
                />
              </Route>
            );
          }
          return <Route key={index} path={route.path} element={route.element} />;
        })}
      </Routes>
      {modalContent === 'signUp' && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Sign Up Modal"
        >
          <div className="flex justify-end">
            <button onClick={closeModal}>Fermer</button>
          </div>
          <SignUp closeModal={closeModal}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            notify={notify} />
        </Modal>
      )}
      {modalContent === 'signIn' && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Sign In Modal"
          style={customStyles}
        >
          <SignIn closeModal={closeModal}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            notify={notify} />
        </Modal>
      )}
      <Footer />
    </>
  );
}

export default App;
