import React, {useState} from "react";
import {KeyboardDatePicker,} from '@material-ui/pickers';
import {Dialog, Slide, Button, Grid} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import Header from "../components/header";
import Footer from "../components/footer";
import './Card.css';

export default function () {
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
    const [cardData, setCardata] = useState()
    const [open, setOpen] = useState(false);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const VishalData = [{name: 'Mutton Saag'},
        {name: ' Paneer Tikka'},
        {name: 'Saag Paneer'},
        {name: 'Saag Paneer'},
        {name: 'Hakka Noodles'},
        {name: 'Kala Chana'},
        {name: 'Gobi Manchurian'},
        {name: 'Chicken  Noodles'},
        {name: 'Tandoori Seekh Kabab'},

    ]
    return (
        <>
            <Header/>
            <div className="mt-5 container-fluid">
                <div className={'row'}>
                    <div className={'col-lg-9 col-12 pl-0 pr-0 brightChef'}>
                        <div className={'col-12 bnrImg'}/>
                        <div className={'col-12'}>
                            <div className={'row'}>
                                <div className={'col-lg-3 col-xl-2 col-md-4 col-12 py-4 text-center'}>
                                    <img className={'ChefDishProfile'} style={{position:'relative'}}
                                         src={'https://cdn.t.shef.com/unsafe/200x0/center/middle/https://shef-general.s3.amazonaws.com/uploads/8051ef38-99c9-4823-a8ca-71363cc01ee3_Wayne_ProfilePhoto.jpg'}/>
                                </div>
                                <div className={'col-lg-9  col-md-8 col-12 py-4 center-content flex-column'}>
                                    <h2 className={'headingBlack'}>Shef Wayne's Menu</h2>
                                    <h6>South Indian</h6>
                                    <p>4.8 <span className="star">★★★★★</span> (1764)</p>
                                    <p className={'mt-n2'}>I've always been passionate about Indian cooking, with its
                                        wide array of flavors and different regional styles.
                                        I wanted to be a chef, and my professional journey took me to some of the finer
                                        places, like Taj and Oberoi Hotels
                                        (Mumbai)... <span className={'font-weight-bold'}>Learn more</span>
                                    </p>
                                </div>
                                {/*    Monday's Main Items*/}
                                <div className={'col-lg-12  col-12 py-4 center-content flex-column'}
                                     style={{background: '#eee'}}>
                                    <div className={'row'}>
                                        <div className={'col-lg-6 col-12 mb-2'}>
                                            <h4 className={'title'}>MONDAY'S MAIN ITEMS</h4>
                                            <div className={'titleLine ml-1'}/>
                                        </div>
                                        <div className={'col-lg-6 col-12 my-2 mt-lg-0  d-flex justify-content-end'}>
                                            <p className={'mx-2'}>Delivery Day:</p>
                                            <div className={'mt-n4 mx-2'}>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    id="date-picker-inline"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {/*Cards*/}
                                        {VishalData.map((value) => (
                                            <div className={'col-12 col-md-6 col-lg-4 my-4'}>
                                                <div className={'CardBoxChef chefcardHover'} onClick={() => {
                                                    setOpen(true);
                                                    setCardata(value)
                                                }}>
                                                    <div className={'card-img-chef'}>

                                                        <img className='img-fluid cardImgChef'
                                                             src={'https://cdn.t.shef.com/unsafe/0x250/center/middle/https://shef-general.s3.amazonaws.com/uploads/70afc1c0-6ca2-4645-ada0-826983d66f38_Vegetable-Hakka-Noodles.jpeg'}/>
                                                    </div>
                                                    <div className={'card-content-chef card-content px-2 py-2'}>
                                                        <div className={'d-flex justify-content-between pt-3 px-1'}>
                                                            <h5 className={'title FoodTitle'}>{value.name}</h5>
                                                            <h5 className={'title'}>$ 10.99</h5>
                                                        </div>
                                                        <p className={'title pt-1'}>Boneless mutton stew with fresh baby
                                                            spinach,
                                                            tomato, onion sauce, and a blend of aromatic spices.</p>
                                                    </div>
                                                    <div className={'d-flex justify-content-between chef-btn'}>
                                                        <div
                                                            className={'chef-btn-borderLeft px-3 justify-content-between d-flex align-items-center widthJustChef'}>
                                                            <div style={{background: '#ccc'}}
                                                                 className={'iconBodyChef'}><RemoveIcon
                                                                className={'iconChef'}/></div>
                                                            <h5 className={'pt-1 '}>1</h5>
                                                            <div style={{background: '#1a8fff'}}
                                                                 className={'iconBodyChef'}><AddIcon
                                                                className={'iconChef'}/></div>
                                                        </div>
                                                        <div
                                                            className={'widthJustChef justify-content-center d-flex align-items-center'}>
                                                            <h5>Learn more</h5></div>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                </div>
                                {/*    Monday's End*/}
                            </div>

                        </div>
                    </div>
                    <div className={'col-lg-3 d-lg-block d-none col-12  topChef'}>
                        <div className={'text-center '}>
                        <img className={'mt-5'} src={'https://cdn.shef.com/static/media/empty-cart.5b38999e.svg'}/>
                        <h5 className='my-3'>Your cart is empty<br/>
                            Add items to get started</h5>
                        </div>
                    </div>

                </div>
            </div>
            <Footer/>
            {/*Moddal*/}

            <Dialog
                open={open}
                maxWidth={'sm'}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => {
                    setOpen(false)
                }}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div className={'cardModal'}>
                    <div className={'CardBoxChef'}>
                        <div className={'card-img-chef'}>

                            <img className='img-fluid cardImgChef'
                                 src={'https://cdn.t.shef.com/unsafe/0x250/center/middle/https://shef-general.s3.amazonaws.com/uploads/70afc1c0-6ca2-4645-ada0-826983d66f38_Vegetable-Hakka-Noodles.jpeg'}/>
                        </div>
                        <div className={'card-content-chef card-content px-2 py-2'}>
                            <div className={'d-flex justify-content-between pt-3 px-1'}>
                                <h5 className={'title FoodTitle'}>{cardData?.name}</h5>
                                <h5 className={'title'}>$ 10.99</h5>
                            </div>
                            <p className={'title pt-1'}>Boneless mutton stew with fresh baby spinach,
                                tomato, onion sauce, and a blend of aromatic spices.</p>
                        </div>

                        <div  className={'container'}>
                            <div className='row py-2'>
                                <div className={'col-lg-5 col-12 d-flex justify-content-center'}>
                                    <div className={'justify-content-between  d-flex align-items-center widthJustChef'}>
                                        <div style={{background: '#ccc'}} className={'iconBodyChef'}>
                                            <RemoveIcon className={'iconChef'}/></div>
                                        <h5 className={'pt-1 px-4'}>1</h5>
                                        <div style={{background: '#1a8fff'}} className={'iconBodyChef'}>
                                            <AddIcon className={'iconChef'}/></div>
                                    </div>

                                </div>
                                <div className={'col-lg-7 col-12 d-flex justify-content-center my-2 my-lg-0'}><Button className={'rounded-0'} color='secondary' variant='contained'>Add To Cart - $ 10.99</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CloseIcon onClick={()=>{setOpen(false)}} className={'modalClose'}/>
            </Dialog>
        </>
    )
}
//Sliding
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});