import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MyModal from '../components/myModal/MyModal';
import Billing from '../components/page/Billing';
import CustomerDetails from '../components/page/CustomerDetails';
import Edit from '../components/login/Edit';
import ErrorLayout from './ErrorLayout';
import CardEdit from '../components/login/CardEdit';
import Invoice from '../components/page/Invoice';

import NavbarTop from '../components/navbar/NavbarTop';
import NavbarVertical from '../components/navbar/NavbarVertical';
import AppContext from '../context/Context';
import ProductProvider from '../components/e-commerce/ProductProvider';
import { getPageName } from '../helpers/utils';

const HomePageLayout = () => {

    const { isFluid } = React.useContext(AppContext);
    const isKanban = getPageName('kanban');

    return (
        <div className={isFluid || isKanban ? 'container-fluid' : 'container'}>
      {/* {isVertical && <NavbarVertical isKanban={isKanban} navbarStyle={navbarStyle} />} */}
      <NavbarVertical />
      <ProductProvider>
        <div className="content">
          <NavbarTop />
        <Switch>
        <Route path="/dashboard/invoice" component={Invoice} exact/>
        <Route path="/dashboard/card-details" component={CustomerDetails} exact/>
        <Route path="/dashboard/errors" component={ErrorLayout} exact/>
        <Route path="/dashboard/subscribe" component={Billing} exact/>
        <Route path="/dashboard/card-details/update-user-details" component={Edit} exact/>
        <Route path="/dashboard/card-details/update-card-details" component={CardEdit} exact/>
        <Route path="/" exact/>
        <Billing />
        <Route/>   
        </Switch>  
        </div>
      </ProductProvider>
      </div>
    )
}
 export default HomePageLayout;