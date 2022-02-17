import React, {useState} from "react";
import food from "../../images/feedback/food.jpg";
import "../style.css";
import Header from "../components/header";
import Footer from "../components/footer";
import {$crud} from "../../factories/CrudFactory";

export default function Feedback() {
    const [param, setParam] = useState([]);
    let type = (window.location.pathname).split("/")[2];

    const submit = async () => {
        if (type === "delivery")
            type = "delivery-user";
        Object.assign(param, {type});
        await $crud.post("create/feedback", param);
        setParam([]);
    }

    const valueChange = (e) => {
        const {name, value} = e.target;
        setParam(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <>
            <Header/>
            <div className="feedback mt-5 mb-5">
                <div className="img">
                    {/*<img src={food} width="100%" height="500px"/>*/}
                </div>
                <div className="container form">
                    <div>
                        <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Feedback Form</h3>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6 mt-3">
                            <p>Your Name</p>
                            <input className="form-control" placeholder="ex. john wick" value={param?.name || ""}
                                   name="name"
                                   onChange={valueChange}/>
                        </div>
                        <div className="col-md-6 mt-3">
                            <p>Your Email</p>
                            <input className="form-control" placeholder="ex. yourname@email.com"
                                   value={param?.email || ""}
                                   name="email" onChange={valueChange}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mt-3">
                            <p>Subject/Topic</p>
                            <input className="form-control"
                                   placeholder="ex. homefoodyy, about chef food, delivery etc."
                                   value={param?.subject || ""}
                                   name="subject" onChange={valueChange}/>
                        </div>
                        <div className="col-md-6 mt-3">
                            <p>Phone number</p>
                            <input className="form-control" placeholder="ex. 99******99" value={param?.mobile || ""}
                                   name="mobile" onChange={valueChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mt-3">
                            <p>Feedback</p>
                            <textarea rows={4} className="form-control" placeholder="Describe your feedback here..."
                                      value={param?.description || ""}
                                      name="description" onChange={valueChange}/>
                        </div>
                        <div className="col-md-6 mt-3">
                            <div>
                                <p>Address</p>
                                <input className="form-control" placeholder="ex. 310, malhat road, New Delhi, 385655"
                                       value={param?.address || ""}
                                       name="address" onChange={valueChange}/>
                            </div>
                            <div className="mt-4">
                                <button className="btn btn-danger w-100" onClick={submit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}