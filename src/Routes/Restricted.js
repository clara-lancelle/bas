import BackofficeCompanyOffers from '../Components/Backoffice/CompanyOffers';
import BackofficeUserAccount from '../Components/Backoffice/UserAccount';
import BackofficeCompanyUserAccount from '../Components/Backoffice/Company/CompanyUserAccount';
import BackofficeCompanyAccount from '../Components/Backoffice/CompanyAccount';

export const restrictedRoutes = [
    {
        path: '/backoffice/entreprise/offres',
        element: <BackofficeCompanyOffers />,
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