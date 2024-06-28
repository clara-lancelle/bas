import BackofficeCompanyOffers from '../Components/Backoffice/CompanyOffers';
import BackofficeUserAccount from '../Components/Backoffice/UserAccount';
import BackofficeUserAccountTest from '../Components/Backoffice/UserAccounttest';

export const restrictedRoutes = [
    {
        path: '/backoffice/entreprise/offres',
        element: <BackofficeCompanyOffers />,
        restricted: true,
    },
    {
        path: '/mon-compte',
        element: <BackofficeUserAccount />,
        restricted: true,
        props: { userInfo: {}, notify: () => {} },
    },

    {
        path: '/mon-compte-test',
        element: <BackofficeUserAccountTest />,
        restricted: true,
        props: { userInfo: {}, notify: () => {} },
    },
];