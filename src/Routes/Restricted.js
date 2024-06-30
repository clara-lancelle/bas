import BackofficeCompanyOffers from '../Components/Backoffice/Company/Offers/CompanyOffers';
import BackofficeCompanyOffersCreate from '../Components/Backoffice/Company/Offers/Create/CompanyOffersCreate';
import BackofficeUserAccount from '../Components/Backoffice/UserAccount';
import BackofficeCompanyUserAccount from '../Components/Backoffice/Company/CompanyUserAccount';
import BackofficeCompanyAccount from '../Components/Backoffice/Company/CompanyAccount';

export const restrictedRoutes = [
    {
        path: '/backoffice/entreprise/offres',
        element: <BackofficeCompanyOffers />,
        restricted: true,
    },
    {
        path: '/backoffice/entreprise/offre/creation',
        element: <BackofficeCompanyOffersCreate />,
        restricted: true,
    },
    {
        path: '/backoffice/mon-compte',
        element: <BackofficeUserAccount />,
        restricted: true,
        props: { userInfo: {}, notify: () => {} },
    },
    {
        path: '/backoffice/mon-compte',
        element: <BackofficeUserAccount />,
        restricted: true,
        props: { userInfo: {}, notify: () => {} },
    },
    {
        path: '/backoffice/mon-organisation',
        element: <BackofficeCompanyAccount />,
        restricted: true,
        props: { userInfo: {}, notify: () => {} },
    },
];