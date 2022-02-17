import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import story1 from "../../images/icons/story1.jpg";
import story2 from "../../images/icons/story2.png";
import story3 from "../../images/icons/story3.png";
import story4 from "../../images/icons/story4.png";

export default function HomefoodyStories() {

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="story">
            <div className="container mt-5">
                <h3 className="text-danger mb-5">Why Stories by Homefoodyy</h3>
                <Slider {...settings}>
                    <div className="item">
                        <img src={story1} width="270" height="250px"/>
                        <h5 className="mt-2">Support Local Chefs</h5>
                    </div>
                    <div className="item">
                        <img src={story2} width="270px" height="250px"/>
                        <h5 className="mt-2">Empower Homemakers</h5>
                    </div>
                    <div className="item">
                        <img src={story3} width="270px" height="250px"/>
                        <h5 className="mt-2">Eat Sustainable Homemade Food</h5>
                    </div>
                    <div className="item">
                        <img src={story4} width="270px" height="250px"/>
                        <h5 className="mt-2">Avoid Junk Food</h5>
                    </div>
                </Slider>
            </div>
        </div>
    )
}