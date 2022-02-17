import React from "react";
import {Link} from "react-router-dom";
import Header from "../components/header";
import "../style.css";
import HomepageCarousel from "../components/HomepageCarousel";
import card1 from "../../images/cardIcon/1.png";
import card2 from "../../images/cardIcon/2.jpg";
import card3 from "../../images/cardIcon/3.jpg";
import fd1 from "../../images/fd1.webp";
import fd2 from "../../images/fd2.webp";
import fd3 from "../../images/fd3.webp";
import verifyFood from "../../images/variety-food.jpg";
import Footer from "../components/footer";
import food from "../../images/footer/Food-culture-of-India.jpg"
import landing2 from "../../images/phone-landing2.jpeg";
import icon1 from "../../images/icons/icon1.png";
import icon2 from "../../images/icons/icon2.png";
import icon3 from "../../images/icons/icon3.png";
import icon4 from "../../images/icons/icon4.png";
import icon5 from "../../images/icons/icon5.png";
import HomefoodyStories from "../components/HomfoodyStories";

export default function Homepage() {

    return (
        <div className="homepage">
            <Header/>
            <HomepageCarousel/>
            <HomefoodyStories />

            <div className="mt-5">
                <div className="text-center">
                    <h3>How HomeFoodyy Works</h3>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4 text-center mt-5">
                            <div>
                                <img src={card1} width="100px"/>
                            </div>
                            <div>
                                <h4>Choose KITCHEN</h4>
                                <p>All Home shefs are 100% Food <br/> saftty Certified</p>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 text-center mt-5">
                            <div>
                                <img src={card2} width="100px"/>
                            </div>
                            <div>
                                <h4>Pick Your Dishes</h4>
                                <p>Pick your delivery Date/Time slot <br/> and order now your favourite Dishes</p>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 text-center mt-5">
                            <div>
                                <img src={card3} width="100px"/>
                            </div>
                            <div>
                                <h4>Get your delivery</h4>
                                <p>Dishes arrive fresh ingredient's meals,<br/> just eat and repeat!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5 text-danger">
                <div className="mb-5">
                    <h2>Featured dishes</h2>
                </div>
                <div className="row">
                    <div className="col-md-5 mt-3">
                        <div>
                            <img className="fdImg" src={fd1} width="100%" height="600px"/>
                        </div>
                    </div>
                    <div className="col-md-7 mt-3">
                        <div>
                            <img className="fdImg" src={fd2} width="100%" height="300px"/>
                        </div>
                        <div className="mt-3">
                            <img className="fdImg" src={fd3} width="100%" height="280px"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5 text-danger">
                <div className="mb-5">
                    <h2>Meet the homefoodyy shefs</h2>
                </div>
            </div>

            <div className="container mt-5">
                <div className="text-center">
                    <h2 className="text-danger">Explore Home Food</h2>
                </div>
                <div className="row explore">
                    <div className="col-md-6 left">
                        <div className="mt-5 d-flex">
                            <div className="mr-3">
                                <img src={icon1} width="50px" height="50px"/>
                            </div>
                            <div>
                                <h5>Made by Home Chef</h5>
                            </div>
                        </div>
                        <div className="mt-5 d-flex">
                            <div className="mr-3">
                                <img src={icon2} width="50px" height="50px"/>
                            </div>
                            <div>
                                <h5>Taste Authentic Flavours of India</h5>
                            </div>
                        </div>
                        <div className="mt-5 d-flex">
                            <div className="mr-3">
                                <img src={icon3} width="50px" height="50px"/>
                            </div>
                            <div>
                                <h5>Freshly Prepared Always</h5>
                            </div>
                        </div>
                        <div className="mt-5 d-flex">
                            <div className="mr-3">
                                <img src={icon4} width="50px" height="50px"/>
                            </div>
                            <div>
                                <h5>Cleanliness & Hygiene Guaranteed</h5>
                            </div>
                        </div>
                        <div className="mt-5 d-flex">
                            <div className="mr-3">
                                <img src={icon5} width="50px" height="50px"/>
                            </div>
                            <div>
                                <h5>Highest rating by consumers</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-5 text-center">
                        <img src={landing2} width="300px" height="500px"/>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 mt-5">
                        <div>
                            <h3 className="text-danger">Riders delivery guidelines
                            </h3>
                        </div>
                        <div className="mt-5">
                            <h4>
                                <li>SANITIZATION STANDARDS</li>
                            </h4>
                            <p>
                                All Delivery Riders have been trained to maintained high cleanliness standards and they
                                carry o Kit of Mask Hand Sanitizer, Cloves and Thermometer
                            </p>
                        </div>

                        <div className="mt-5">
                            <h4>
                                <li>CONTACTLESS DELIVERY</li>
                            </h4>
                            <p>
                                Every Food Package is picked up and delivered without any contact with the lime Cher and
                                Customer. We follow a Contacdless delivery Policy.
                            </p>
                        </div>

                        <div className="mt-5">
                            <h4>
                                <li>RIDER SUPERVISION</li>
                            </h4>
                            <p>
                                All the Delivery orders are supervised daily for their temperature readings and
                                conformity
                                to Wearing a Musk, Hygiene and social distancing norms.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-6 mt-5">
                        <div>
                            <h3 className="text-danger">Home chefs cooking guidelines
                            </h3>
                        </div>

                        <div className="mt-5">
                            <h4>
                                <li>CLEANING & SANITIZATION
                                </li>
                            </h4>
                            <p>
                                Every Home chef ensures that hands are washed regularly every 15 minutes and their Home
                                Kitchen is cleaned and sanitized 2 times daily.
                            </p>
                        </div>

                        <div className="mt-5">
                            <h4>
                                <li>MASK & SOCIAL DISTANCING
                                </li>
                            </h4>
                            <p>
                                All the Home Chers usually don’t move of their homes. They wear a mask and maintain
                                social
                                distancing of 8 Feet. if they meet anyone.
                            </p>
                        </div>

                        <div className="mt-5">
                            <h4>
                                <li>HEATHY & FRESHLY PREPARED
                                </li>
                            </h4>
                            <p>
                                Food is freshly prepared by some chefs when they get an order. All the ingredients used
                                are
                                Fresh and Top quality to ensure the food served is Healthy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 mt-5">
                        <div>
                            <h3 className="text-danger">
                                Food culture of India
                            </h3>
                        </div>
                        <div className="mt-5">
                            <img src={food} width="100%" height="330px"/>
                        </div>
                    </div>
                    <div className="col-md-6 mt-5">
                        <div>
                            <h3 className="text-danger">MOST TRUSTED FOOD: HOME FOOD</h3>
                        </div>
                        <div className="mt-5">
                            <h4>
                                <li>VARIETY & TASTE</li>
                            </h4>
                            <p>Every chef represents mastery over cuisines from their own culture. Explore the authentic
                                taste of various food cultures from across the Country
                            </p>
                        </div>
                        <div className="mt-5">
                            <h4>
                                <li>FRESH & HEALTHY
                                </li>
                            </h4>
                            <p>Home food is made with pure ingredients without the use of preservatives or roused as
                                Homa chefs cook and serve what they make for their family and loved ones.
                            </p>
                        </div>
                        <div className="mt-5">
                            <h4>
                                <li>CLEAN & HYGIENIC</li>
                            </h4>
                            <p>Kitchens are the cleanness and most timely part of any home every home chef follows the
                                highest standards of hygiene and cleanliness like clean utensils, Cleon wipes, clean
                                cutlery, washed vegetable exhaust and pest control
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <p style={{fontSize: "18px"}}>Explore & experience authentic and traditional food coming from
                            different cultures of India and the globe. Made by the finest home chefs in their home
                            kitchens, every dish reises the bar of taste, health, hygiene, and cleanliness. Made with
                            pure teapot and fresh ingredients. every man will make a story to relish and remember!!! We
                            offer a variety of cuisines from across the food culture of India on your mobile phone.
                            downloaded our food delivery app to relish traditional cuisines prepared with love by home
                            Chefs who have a passion to cook Celebrate the food festival of India every day. Eat:
                            healthy. Live healthily.</p>
                    </div>
                    <div className="col-md-6">
                        <img src={verifyFood} width="100%" height="280px"/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}