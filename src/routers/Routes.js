import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import LandingScreen from "../pages/LandingScreen";
import LoginScreen from "../pages/LoginScreen";
import BlogScreen from "../pages/BlogScreen";
import BlogDetailsScreens from "../pages/BlogDetailsScreens";
import SignupScreen from "../pages/SignupScreen";
import ForgotScreen from "../pages/ForgotScreen";
import StoreOnlineScreen from '../pages/StoreOnlineScreen'
import SelectedItemScreen from '../pages/SelectedItemScreen'
import EmptyCartScreen from '../pages/EmptyCartScreen'
import CartScreen from '../pages/CartScreen'
import CheckoutScreen from '../pages/CheckoutScreen'
import WebViewCheckoutScreen from '../pages/WebViewCheckoutScreen'
import OrderStatusScreen from '../pages/OrderStatusScreen';
import WebViewOrderStatusScreen from '../pages/WebViewOrderStatusScreen';
import OrderExperience from '../pages/OrderExperience';
import ProfileScreen from '../pages/ProfileScreen'
import ProfileInformationScreen from '../pages/ProfileInformationScreen'
import ChangePasswordScreen from '../pages/ChangePasswordScreen'
import ChangeEmailScreen from '../pages/ChangeEmailScreen'
import OrderHistoryScreen from '../pages/OrderHistoryScreen';
import ContactusScreen from '../pages/ContactusScreen';
import AboutusScreen from '../pages/AboutusScreen';
import TermsConditionScreen from '../pages/TermsConditionScreen';
import PrivacyCookiesScreen from '../pages/PrivacyCookiesScreen';
import RefundShippingScreen from '../pages/RefundShippingScreen';
import FedScreen from '../pages/FedScreen';

import DispensaryLandingScreen from '../pages/DispensaryLandingScreen';
import ShopDispensaryScreen from '../pages/ShopDispensaryScreen';
import DispensaryInfoScreen from '../pages/DispensaryInfoScreen';
import StoreAddScreen from '../pages/StoreAddScreen';
import StoreUpdateScreen from '../pages/StoreUpdateScreen';
import OrderConfirmScreen from '../pages/OrderConfirmScreen';
import WebViewOrderConfirmScreen from '../pages/WebViewOrderConfirmScreen';
import HourSetScreen from '../pages/HourSetScreen';
import HourUpdateScreen from '../pages/HourUpdateScreen';

import DriverProfileInfoScreen from '../pages/DriverProfileInfoScreen';
import DriverOrderStatusScreen from '../pages/DriverOrderStatusScreen';
import SearchResultScreen from "../pages/SearchResultScreen";

export default function MyRouts() {
    return (
        <Router >
            <Switch>
                <Route exact path="/" component={LandingScreen}/>
                <Route path="/login" component={LoginScreen}/>
                <Route path="/blog" component={BlogScreen}/>
                <Route path="/blogdetail/:id" component={BlogDetailsScreens}/>
                <Route path="/signup" component={SignupScreen}/>
                <Route path="/forgot" component={ForgotScreen}/>
                <Route path="/storeonline/:id" component={StoreOnlineScreen}/>
                <Route path="/selecteditem/:id" component={SelectedItemScreen}/>
                <Route path="/emptycart" component={EmptyCartScreen}/>
                <Route path="/cart" component={CartScreen}/>
                <Route path="/checkout" component={CheckoutScreen}/>
                <Route path="/webviewcheckout/:id" component={WebViewCheckoutScreen}/>
                <Route path="/orderstatus/:id" component={OrderStatusScreen}/>
                <Route path="/webvieworderstatus/:id" component={WebViewOrderStatusScreen}/>
                <Route path="/orderexperience" component={OrderExperience}/>
                <Route path="/profile" component={ProfileScreen}/>
                <Route path="/profileinfo" component={ProfileInformationScreen}/>
                <Route path="/changepassword/:id" component={ChangePasswordScreen}/>
                <Route path="/changeemail" component={ChangeEmailScreen}/>
                <Route path="/aboutus" component={AboutusScreen}/>
                <Route path="/privacycookies" component={PrivacyCookiesScreen}/>
                <Route path="/refundshipping" component={RefundShippingScreen}/>
                <Route path="/fed" component={FedScreen}/>
                <Route path="/termsconditions" component={TermsConditionScreen}/>
                <Route path="/orderhistory" component={OrderHistoryScreen}/>
                <Route path="/contactus" component={ContactusScreen}/>
                <Route path="/searchresult/:id" component={SearchResultScreen}/>

                <Route path="/dispensarylanding" component={DispensaryLandingScreen}/>
                <Route path="/shopdispensary" component={ShopDispensaryScreen}/>
                <Route path="/dispensaryinfo" component={DispensaryInfoScreen}/>
                <Route path="/storeadd" component={StoreAddScreen}/>
                <Route path="/updatestore/:id" component={StoreUpdateScreen}/>
                <Route path="/orderconfirm" component={OrderConfirmScreen}/>
                <Route path="/webvieworderconfirm/:id" component={WebViewOrderConfirmScreen}/>
                <Route path="/hourset" component={HourSetScreen}/>
                <Route path="/hourupdate" component={HourUpdateScreen}/>

                <Route path="/driverprofileinfo" component={DriverProfileInfoScreen}/>
                <Route path="/driverorderstatus" component={DriverOrderStatusScreen}/>
            </Switch>
        </Router>
    );
}
