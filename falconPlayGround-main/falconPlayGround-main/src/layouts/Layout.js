import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton, Fade } from '../components/common/Toast';
import AuthLogin from './AuthLogin';
import NavbarTop from '../components/navbar/NavbarTop';
import NavbarVertical from '../components/navbar/NavbarVertical';
import Footer from '../components/footer/Footer';
import loadable from '@loadable/component';
import AppContext from '../context/Context';
import ProductProvider from '../components/e-commerce/ProductProvider';
import { getPageName } from '../helpers/utils';
import HomePageLayout from '../layouts/HomePageLayout';
const AuthBasicLayout = loadable(() => import('./AuthBasicLayout'));
const Landing = loadable(() => import('../components/landing/Landing'));
const WizardLayout = loadable(() => import('../components/auth/wizard/WizardLayout'));
const AuthCardRoutes = loadable(() => import('../components/auth/card/AuthCardRoutes'));
const AuthSplitRoutes = loadable(() => import('../components/auth/split/AuthSplitRoutes'));

const Layout = () => {
  useEffect(() => {
    AuthBasicLayout.preload();
    Landing.preload();
    WizardLayout.preload();
    AuthCardRoutes.preload();
    AuthSplitRoutes.preload();
  }, []);


  return (<>  
    <Router fallback={<span />}>
      <Switch>
        <Route path="/dashboard" component={HomePageLayout} />
        <Route path="/landing" exact component={Landing} />
        <Route path="/authentication/basic" component={AuthBasicLayout} />
        <Route component={AuthLogin} />
      </Switch>
      <ToastContainer transition={Fade} closeButton={<CloseButton />} position={toast.POSITION.BOTTOM_LEFT} />
   </Router>
    </>
  );
};

export default Layout;
