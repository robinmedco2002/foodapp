import React, {Suspense} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {useSelector} from 'react-redux';
import {selectUser} from './Slices/UserSlice';
import _ from "lodash";
import TheSidebar from "./containers/TheSidebar";
import TheHeader from "./containers/TheHeader";
import TheFooter from "./containers/TheFooter";
import {CContainer} from "@coreui/react";

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = useSelector(selectUser);
    return (
        <Route
            {...rest}
            render={props =>
                (!(_.isEmpty(isAuthenticated))) ? (
                    <>
                        <div className="c-app c-default-layout">
                            <TheSidebar/>
                            <div className="c-wrapper">
                                <TheHeader/>
                                <div className="c-body">
                                    <main className="c-main">
                                        <CContainer fluid>
                                            <Suspense fallback={loading}>
                                                <Switch>
                                                    <Component {...props} />
                                                </Switch>
                                            </Suspense>
                                        </CContainer>
                                    </main>
                                </div>
                                <TheFooter/>
                            </div>
                        </div>
                    </>
                ) : (
                    <Redirect to="/login"/>
                )
            }
        />
    )
}
export default PrivateRoute;
