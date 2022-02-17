import React from 'react';
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div className="login-header">
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-9">
                        <Link to="/">
                            <h3 className="text-danger">Homefoodyy</h3>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <div>
                            <Link to="/become-a-chef">
                                <button className="btn button">Become a shef</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn border ml-3 button">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}