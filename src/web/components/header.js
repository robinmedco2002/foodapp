import React from 'react';
import logo from "../../images/web-logo/pink-icon.99bc159a.svg"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, makeLogout} from "../../Slices/UserSlice";
import _ from "lodash";

export default function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    return (
        <div className="container mt-2 mb-3">
            <div className="row">
                <div className="col-sm-12 col-md-3 mt-2">
                    <Link to="/">
                        <img src={logo} width="200px"/>
                    </Link>
                </div>
                <div className="col-sm-12 col-md-3 mt-2">
                    <input className="form-control border-danger shadow-none" placeholder="Kitchen, Dishes.."/>
                </div>
                <div className="col-sm-12 col-md-2 mt-2">
                    <Link to="/become-a-chef"><p className="header-link">Join as a home chef</p></Link>
                </div>
                <div className="col-sm-12 col-md-2 mt-2">
                    <Link to="/join-as-a-delivery-partner"><p className="header-link">Join as a delivery partner</p>
                    </Link>
                </div>
                <div className="col-sm-12 col-md-1 mt-2">
                    <p className="header-link">About Us</p>
                </div>
                <div className="col-sm-12 col-md-1 mt-2">
                    {
                        !(_.isEmpty(user)) ?
                            <button onClick={() => dispatch(makeLogout({}))} className="btn btn-danger">Logout</button>
                            :
                            <Link to="/login">
                                <button className="btn btn-danger">Login</button>
                            </Link>
                    }
                </div>
            </div>
        </div>
    );
}
