import React, {useState} from 'react';
import loginImg from "../images/login/login.webp";
import "./style.css";
import Footer from "../web/components/footer";
import Header from "./Header";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {makeLogin, selectUser} from "../Slices/UserSlice";
import _ from "lodash";

export default function LoginPage() {
    const isAuthenticated = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const [params, setParams] = useState({});
    const [saving, setSaving] = useState(false);
    const login = async () => {
        try {
            setSaving(true);
            const user = await dispatch(makeLogin(params));
            setParams({});
            if (user?.role.slug === "super-admin")
                history.push("/admin/dashboard");
            else if (user?.role.slug === "chef")
                history.push("/chef/dashboard");
            else
                history.push(`/menu?zipcode=${user?.zip_code}`);

        } catch (e) {
            console.log(e);
        } finally {
            setSaving(false);
        }
    };
    const paramChange = (e) => {
        const {name, value} = e.target;
        setParams(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const loginToken = localStorage.getItem("login_token");
    if (!(_.isEmpty(isAuthenticated)) && loginToken) {
        return <Redirect to='/'/>;
    }
    return (
        <>
            <Header/>
            <div className="login mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 left-side">
                            <div className="left-side">
                                <div className="mt-3">
                                    <h2 className="text-danger">Welcome back</h2>
                                </div>
                                <div className="mt-5">
                                    <button className="btn btn-primary w-100 form-control-lg">Sign in with Facebook
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <button className="btn btn-danger w-100 form-control-lg">Sign in with Google
                                    </button>
                                </div>
                                <div className="text-center mt-2 mb-2">
                                    <p>or</p>
                                </div>
                                <div>
                                    <div>
                                        <input name="username" value={params?.username || ""} onChange={paramChange}
                                               className="form-control form-control-lg"
                                               placeholder="Enter Mobile or Email"/>
                                    </div>
                                    <div className="mt-2">
                                        <input type="password" name="password" value={params?.password || ""} onChange={paramChange}
                                               className="form-control form-control-lg" placeholder="Enter Password"/>
                                    </div>
                                    <div className="mt-2">
                                        <p>Forgot Password?</p>
                                    </div>
                                    <div className="mt-5">
                                        <button disabled={saving} onClick={login}
                                                className="btn btn-danger form-control-lg w-100">Login
                                        </button>
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-dark">
                                            By clicking Log in, Sign in with Facebook or Sign in with Google you agree
                                            to
                                            Shef's <span className="text-danger">Terms of Service</span> and <span
                                            className="text-danger">Privacy Policy</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            Not registered? <Link to="/register"><span
                                            style={{fontWeight: "bold"}}>Create an account</span></Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 right-side">
                            <img src={loginImg} width="100%" height="700px" style={{objectFit: "cover"}}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}