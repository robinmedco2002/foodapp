import React from 'react';
import logo from "../../images/web-logo/white-footer-logo.png";
import card1 from "../../images/footer/american-express.png";
import card2 from "../../images/footer/discover.png";
import card3 from "../../images/footer/master-card.png";
import card4 from "../../images/footer/visa.png";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <div>
            <div className="footer mt-5 p-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 borderRight px-5 py-2">
                            <img src={logo} width="200px" height="130px"/>
                            <p>
                                Authentic dishes.<br/> Homemade. Delivered.
                            </p>
                        </div>
                        <div className="col-md-2 borderRight px-5 py-2">
                            <div>
                                <h2>Feedback</h2>
                            </div>
                            <div>
                                <li><Link to="/feedback/customer">Customers</Link></li>
                                <li><Link to="/feedback/chef">Home chefs</Link></li>
                                <li><Link to="/feedback/delivery">Delivery Partner</Link></li>
                            </div>
                        </div>
                        <div className="col-md-2 borderRight px-5 py-2">
                            <div>
                                <h2>Join us</h2>
                            </div>
                            <div>
                                <li><Link to="/become-a-chef">Join as a Home chef</Link></li>
                                <li>Learn More</li>
                            </div>
                        </div>
                        <div className="col-md-2 px-5 py-2">
                            <div>
                                <h2>Join us</h2>
                            </div>
                            <div>
                                <li><Link to="/join-as-a-delivery-partner">Join as a Delivery partner</Link></li>
                                <li>Learn More</li>
                            </div>
                        </div>
                        <div className="col-md-3 px-5 py-2">
                            <div className="d-flex justify-content-around">
                                <div>
                                    <img src={card1} width="80px" height="70px"/>
                                </div>
                                <div>
                                    <img src={card2} width="80px" height="70px"/>
                                </div>
                            </div>
                            <div className="d-flex justify-content-around">
                                <div>
                                    <img src={card3} width="80px" height="70px"/>
                                </div>
                                <div>
                                    <img src={card4} width="80px" height="70px"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor: "#000000", color: "#ffffff", height: "40px"}} className="py-2 px-5">
                <p>© Homefoodyy 2021. All Rights Reserved.</p>
            </div>
        </div>
    )
}