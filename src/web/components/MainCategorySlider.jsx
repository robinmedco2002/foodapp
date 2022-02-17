import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import all from "../../images/main-category/all.svg";
import more from "../../images/main-category/more_cuisine.svg";
import {$crud} from "../../factories/CrudFactory";
import {APP_URL} from "../../constants";

export default function MainCategorySlider() {
    const [mainCategories, setMainCategories] = useState([]);

    const retrieveMainCategories = async () => {
        const {data: {categories}} = await $crud.get("retrieve/categories", {type: "main-category"});
        setMainCategories(categories);
    }

    useEffect(() => {
        retrieveMainCategories();
    }, []);

    const settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 12,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 12,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                arrows: false,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="story main-category">
            <div className="container mt-5">
                <Slider {...settings}>
                    <div className="item text-center">
                        <img src={all} width="70" height="70px"/>
                        <h6 className="mt-2">All</h6>
                    </div>
                    {
                        mainCategories?.map(({image, name}) => (
                            <div className="item text-center">
                                <img src={APP_URL + image} width="70" height="70px"/>
                                <h6 className="mt-2">{name}</h6>
                            </div>
                        ))
                    }
                    <div className="item text-center">
                        <img src={more} width="70px" height="70px"/>
                        <h6 className="mt-2">More Cuisines</h6>
                    </div>
                </Slider>
            </div>
        </div>
    )
}