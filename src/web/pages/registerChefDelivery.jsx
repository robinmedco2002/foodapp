import React, {useState} from "react";
import {$crud} from "../../factories/CrudFactory";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Register() {
    const [param, setParam] = useState({});
    const [img, setImg] = useState("");
    let type = (window.location.pathname).split("/")[1];
    const [saving, setSaving] = useState(false);

    const submit = async () => {
        if (type === "become-a-chef")
            type = "chef";
        else if (type === "join-as-a-delivery-partner")
            type = "delivery-user";

        let formData = new FormData();
        formData.append("image", param?.image || "");
        formData.append("name", param?.name || "");
        formData.append("mobile", param?.mobile || "");
        formData.append("state", param?.state || "");
        formData.append("city", param?.city || "");
        formData.append("password", param?.password || "");
        formData.append("confirm_password", param?.confirm_password || "");
        formData.append("address", param?.address || "");
        formData.append("type", type);

        try {
            setSaving(true);
            await $crud.post("create/user", formData);
            setParam({});
            setImg("");
        } finally {
            setSaving(false);
        }

    }

    const valueChange = (e) => {
        const {name, value} = e.target;
        setParam(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const fileChange = (e) => {
        setParam(prev => ({
            ...prev,
            "image": e.target.files[0]
        }));

        setImg(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <>
            <Header/>
            <div className="register-chef-delivery mt-5 mb-5">
                <div className="container px-5">
                    <div className="mt-2">
                        <div>
                            <h2> {type === "become-a-chef" ? "Earn money doing what you love" : "Be your own boss"}</h2>
                        </div>
                        <div className="mt-3">
                            <h3> {type === "become-a-chef" ? "Sign up to be your own boss and Be your own boss cook whenever you want." : "Earn money on your own terms."}</h3>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-4 mt-2">
                            <p>Image</p>
                            <input type="file" className="form-control"
                                   name="image"
                                   value=""
                                   onChange={fileChange}/>
                            <div>
                                {
                                    img &&
                                    <img src={img} width="200px" height="300px"/>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mt-2">
                            <p>Name</p>
                            <input className="form-control" value={param?.name || ""}
                                   name="name"
                                   onChange={valueChange}/>
                        </div>
                        <div className="col-md-6 mt-2">
                            <p>Phone</p>
                            <input className="form-control" value={param?.mobile || ""}
                                   name="mobile"
                                   onChange={valueChange}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mt-2">
                            <p>State</p>
                            <input className="form-control" value={param?.state || ""}
                                   name="state"
                                   onChange={valueChange}/>
                        </div>
                        <div className="col-md-6 mt-2">
                            <p>City</p>
                            <input className="form-control" value={param?.city || ""}
                                   name="city"
                                   onChange={valueChange}/>
                        </div>
                    </div>

                    {
                        type === "become-a-chef" &&

                        <div className="row">
                            <div className="col-md-6 mt-2">
                                <p>Password</p>
                                <input type="password" className="form-control" value={param?.password || ""}
                                       name="password"
                                       onChange={valueChange}/>
                            </div>
                            <div className="col-md-6 mt-2">
                                <p>Confirm Password</p>
                                <input type="password" className="form-control" value={param?.confirm_password || ""}
                                       name="confirm_password"
                                       onChange={valueChange}/>
                            </div>
                        </div>
                    }
                    <div className="row">
                        <div className="col-md-6 mt-2">
                            <p>Address</p>
                            <textarea rows={4} className="form-control"
                                      value={param?.address || ""}
                                      name="address" onChange={valueChange}/>
                        </div>
                        <div className="col-md-6 mt-2">
                            <button disabled={saving} onClick={submit} className="btn btn-danger w-100 mt-5">Get
                                Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}