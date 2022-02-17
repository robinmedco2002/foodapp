import React, {useEffect, useState} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import MainCategorySlider from "../components/MainCategorySlider";
import {Checkbox, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {$crud} from "../../factories/CrudFactory";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {APP_URL} from "../../constants";
import './Card.css';
import moment from "moment";

export default function Menu() {
    const [dates, setDates] = useState([]);
    const [chefs, setChefs] = useState([]);


    useEffect(() => {
        retrieveChefs();
    }, []);

    const retrieveChefs = async () => {
        const {data: {chefs}} = await $crud.get("retrieve/chefs");
        setChefs(chefs.filter(c => c.kitchen));
    }

    return (
        <>
            <Header/>
            <div className="mt-5 mb-5">
                <MainCategorySlider/>
                <div className="container mt-5">
                    <div>
                        <FormControl
                            variant={"outlined"}
                            size={"small"}
                            style={{width: "300px"}}
                        >
                            <InputLabel>Delivery Day</InputLabel>
                            <Select
                                multiple
                                labelWidth={100}
                                value={dates}
                                // onChange={e => setUserApps(user._id, e.target.value)}
                                // onClose={() => updateUserApps(user)}
                                // renderValue={(value) => value.map(name => get(getAppByName(name), "title")).join(", ")}
                            >
                                <MenuItem
                                    key={1} value={1}
                                >
                                    <Checkbox
                                        checked={dates.includes(1)}
                                        classes={{root: "p-0"}}
                                    />
                                    test
                                </MenuItem>;
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="container mt-5">
                    <div className='row'>
                        <div className='col-12'>
                            <h3 className="text-danger">Local Favorites</h3>
                        </div>

                        {chefs?.map((value) => (
                            <div className='col-lg-4 col-md-6 col-12 mt-2'>
                                <div className='CardBox rounded my-2'>
                                    <div className='card-img'>
                                        <img className='img-fluid cardImg' src={APP_URL + value.image}/>
                                    </div>
                                    <div className='card-content'>
                                        <h5 className='pt-2 title'>Chef's {value.name}</h5>
                                        <div className='flex-row d-flex justify-content-between'>
                                            <p className='descriptionContent north'>{value.kitchen.main_category.name} | {value.kitchen.sub_category.name}</p>
                                            <p className='descriptionContent ml-n1'><ThumbUpIcon
                                                className='icon-card mx-2'/> 23</p>
                                            <p className='descriptionContent ml-n5'><CommentIcon
                                                className={'icon-card mx-2'}/> 23</p>
                                        </div>
                                        <div className='flex-row d-flex justify-content-between mt-n1'>
                                            <p className='descriptionContent'><StorefrontIcon
                                                className='icon-card'/> {value.kitchen.status}</p>
                                            <p className='descriptionContent'>{value.kitchen.delivery_option === "both" ? "Takeaway | Delivery" : value.kitchen.delivery_option}</p>
                                            <p className='descriptionContent'>2.3Km <LocationOnIcon
                                                className='icon-card'/></p>
                                        </div>
                                        <p className='mt-n3 descriptionContent pt-1'>{moment(value.kitchen.open_time).format('hh:mm A')} - {moment(value.kitchen.close_time).format('hh:mm A')}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}