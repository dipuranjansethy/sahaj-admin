import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Cookies from 'js-cookie';
import SingleMerchant from 'views/ALL-MERCHANTS/SingleBusiness';

const usernameCookie = Cookies.get('username');
const passwordCookie = Cookies.get('password');
const isAuthenticated = usernameCookie && passwordCookie;

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const LOGINPAGE = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
import MerchantPage from 'views/ALL-MERCHANTS/index';
const ProductsListed =  Loadable(lazy(() => import('views/ALL-MERCHANTS/ProductsListed')));
import UserPage from '../views/AllUsers/index'
import SingleProduct from 'views/ALL-MERCHANTS/SingleProduct/SingleProduct';
import SingleService from 'views/ALL-MERCHANTS/SingleService/SingleService';
import ServiceListed from 'views/ALL-MERCHANTS/ServiceListed';
import CreateSubAdmin from 'views/Subadmin/CreateSubAdmin';
import ListSubadmins from 'views/Subadmin/ListSubadmins';
import AppBanner from 'views/App/AppBanner';
import CategoriesSelection from 'views/CategotyControl/CategoryControl';
import ShopCategoriesSelection from 'views/ShopCategotyControl/ShopCategoryControl';
import UserActivity from 'views/useractivity/UserActivity';
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: isAuthenticated ? <MainLayout /> : <LOGINPAGE />,
  children: [
    {
      path: '/',
      element: isAuthenticated ? <DashboardDefault /> : null
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'ALL-MERCHANTS',
      element: <MerchantPage />
    },
    {
      path: 'ALL-USERS',
      element: < UserPage/>
    },
    {
      path: 'product-list/:id',
      element: <ProductsListed/>
    },
    {
      path: 'service-list/:id',
      element: <ServiceListed/>
    },
    {
      path: '/merchant/:id',
      element: <SingleMerchant />
    },
    {
      path: '/product/:id',
      element: <SingleProduct />
    },
    {
      path: '/service/:id',
      element: <SingleService />
    },
    {
      path: '/subadmin',
      element: <CreateSubAdmin />
    },
    {
      path: '/subadmin-list',
      element: <ListSubadmins />
    },
    {
      path: '/app-banner',
      element: <AppBanner />
    },
    
    {
      path: '/categories-control',
      element: <CategoriesSelection />
    },
    {
      path: '/shop-categories-control',
      element: <ShopCategoriesSelection />
    },
    {
      path: '/user-activity',
      element: <UserActivity/>
    },
  ]
};

export default MainRoutes;
