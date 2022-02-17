import * as React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./Admin/pages/LoginPage";
import AdminDashboard from "./Admin/pages/Dashboard";
import ChefDashboard from "./chef/pages/Dashboard";
import Users from "./Admin/pages/Users";
import AdminFeedback from "./Admin/pages/Feedback.jsx";
import ChefFeedback from "./chef/pages/Feedback.jsx";
import AdminKitchens from "./Admin/pages/Kitchen.jsx";
import ChefKitchens from "./chef/pages/Kitchen.jsx";
import UsersRequest from "./Admin/pages/UserRequests";
import AdminCategory from "./Admin/pages/Category";
import ChefCategory from "./chef/pages/Category";
import ChefDish from "./chef/pages/Dish";
import AdminDish from "./Admin/pages/Dish";
import AdminOrder from "./Admin/pages/Orders.jsx";
import ChefOrder from "./chef/pages/Orders.jsx";
import PrivateRoute from "./PrivateRouter";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {retrieve} from "./Slices/UserSlice";
import homepage from "./web/pages/homepage";
import AboutUs from "./web/pages/aboutUs";
import Feedback from "./web/pages/feedback";
import ChefRegister from "./web/pages/registerChefDelivery";
import Menu from "./web/pages/Menu";
import ChefDishes from "./web/pages/ChefDishes";
import LoginPage from "./Login/LoginPage";
import Register from "./Login/Register";

const Routes = () => {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(retrieve({}));
    // }, []);
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={homepage}/>
                <Route path="/login" exact component={LoginPage}/>
                <Route path="/register" exact component={Register} />
                <Route path="/about-us" exact component={AboutUs}/>
                <Route path="/feedback/customer" exact component={Feedback}/>
                <Route path="/feedback/delivery" exact component={Feedback}/>
                <Route path="/feedback/chef" exact component={Feedback}/>
                <Route path="/become-a-chef" exact component={ChefRegister}/>
                <Route path="/join-as-a-delivery-partner" exact component={ChefRegister}/>
                <Route path="/menu" exact component={Menu}/>
                <Route path="/chef" exact component={ChefDishes} />

                <PrivateRoute path="/admin/dashboard" exact component={AdminDashboard} permission={true}/>
                <PrivateRoute path="/admin/users" exact component={Users} permission={true}/>
                <PrivateRoute path="/admin/feedback" exact component={AdminFeedback} permission={true}/>
                <PrivateRoute path="/admin/kitchens" exact component={AdminKitchens} permission={true}/>
                <PrivateRoute path="/admin/users-request" exact component={UsersRequest} permission={true}/>
                <PrivateRoute path="/admin/category" exact component={AdminCategory} permission={true}/>
                <PrivateRoute path="/admin/dishes" exact component={AdminDish} permission={true}/>
                <PrivateRoute path="/admin/orders" exact component={AdminOrder} permission={true}/>

                <PrivateRoute path="/chef/dashboard" exact component={ChefDashboard} permission={true}/>
                <PrivateRoute path="/chef/kitchens" exact component={ChefKitchens} permission={true}/>
                <PrivateRoute path="/chef/dishes" exact component={ChefDish} permission={true}/>
                <PrivateRoute path="/chef/category" exact component={ChefCategory} permission={true}/>
                <PrivateRoute path="/chef/orders" exact component={ChefOrder} permission={true}/>
                <PrivateRoute path="/chef/feedback" exact component={ChefFeedback} permission={true}/>
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;
