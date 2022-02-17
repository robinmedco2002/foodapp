import React, {useState} from 'react';
import loginImg from "../images/login/login.webp";
import "./style.css";
import Footer from "../web/components/footer";
import Header from "./Header";
import {Link, useHistory} from "react-router-dom";
import {$crud} from "../factories/CrudFactory";

export default function register() {
    const [params, setParams] = useState({});
    const [saving, setSaving] = useState(false);
    const history = useHistory();
    const save = async () => {
        try {
            setSaving(true);
            Object.assign(params, {type: "customer"})
            await $crud.post('create/user', params);
            setParams({});
            history.push("/login");
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
    return (
        <>
            <Header/>
            <div className="login mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 right-side">
                            <img src={loginImg} width="100%" height="700px" style={{objectFit: "cover"}}/>
                        </div>
                        <div className="col-md-6 left-side">
                            <div className="left-side">
                                <div className="mt-3">
                                    <h2 className="text-danger">Sign up</h2>
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
                                    <p>or continue with email</p>
                                </div>
                                <div>
                                    <div>
                                        <input name="name" value={params?.name || ""} onChange={paramChange}
                                               className="form-control form-control-lg"
                                               placeholder="Name"/>
                                    </div>
                                    <div className="mt-2">
                                        <input name="email" value={params?.email || ""} onChange={paramChange}
                                               className="form-control form-control-lg" placeholder="Email"/>
                                    </div>
                                    <div className="mt-2">
                                        <input name="zip_code" value={params?.zip_code || ""} onChange={paramChange}
                                               className="form-control form-control-lg" placeholder="Zip Code"/>
                                    </div>
                                    <div className="mt-2">
                                        <input name="password" value={params?.password || ""} onChange={paramChange}
                                               className="form-control form-control-lg" placeholder="Password"/>
                                    </div>
                                    <div className="mt-2">
                                        <input name="confirm_password" value={params?.confirm_password || ""}
                                               onChange={paramChange} className="form-control form-control-lg"
                                               placeholder="Confirm Password"/>
                                    </div>
                                    <div className="mt-5">
                                        <button disabled={saving} onClick={save}
                                                className="btn btn-danger form-control-lg w-100">Sign up
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
                                            Have an account? <Link to="/login"><span
                                            style={{fontWeight: "bold"}}>Login</span></Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}