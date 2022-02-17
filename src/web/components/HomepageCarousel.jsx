import img1 from "../../images/slider/slider1.jpg";
import img2 from "../../images/slider/slider2.jpg";
import img3 from "../../images/slider/slider3.jpg";
import img4 from "../../images/slider/slider4.jpg";
import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {$crud} from "../../factories/CrudFactory";

export default function homepageCarousel() {
    const history = useHistory();
    const [img, setImg] = useState(img1);
    const [pinCode, setPinCode] = useState("");

    useEffect(() => {
        const bgInterval = setInterval(() => {
            if (img === img1) return setImg(img2)
            if (img === img2) return setImg(img3)
            if (img === img3) return setImg(img4)
            if (img === img4) return setImg(img1)
        }, 3000);

        return () => clearInterval(bgInterval);

    }, [img]);

    const pincode = () => {
        const pattern = /(^\\d{6}$)/;
        if (!pinCode)
            $crud.notify({
                type: "error",
                message: "Please Enter the zip code"
            });
        else if (pattern.test(pinCode))
            $crud.notify({
                type: "error",
                message: "Please Enter valid zip code"
            });
        else
            history.push(`menu?zipcode=${pinCode}`);
    }

    return (
        <div>
            <div className="homepage-slider">
                <div className="img">
                    <img src={img} width="100%"/>
                </div>
                <div className="text">
                    <div>
                        <h4>
                            Authentic dishes.<br/>
                            Homemade.<br/>
                            Delivered.
                        </h4>
                        <h6 className="mt-2"> Explore who is cooking in your <br/> neighbourhood</h6>
                    </div>
                    <div className="d-flex mt-4">
                        <div className="mr-3">
                            <input placeholder="Enter your zip code" className="form-control border-danger shadow-none"
                                   value={pinCode} onChange={e => setPinCode(e.target.value)}/>
                        </div>
                        <div>
                            {/*<Link to={`menu?pincode=${pinCode}`}>*/}
                            <button onClick={pincode} className="btn btn-danger">Find Food</button>
                            {/*</Link>*/}
                        </div>
                    </div>
                    <div className="mt-1">
                        <p>Already have an account? Sign in</p>
                    </div>
                </div>
            </div>
        </div>
    )
}