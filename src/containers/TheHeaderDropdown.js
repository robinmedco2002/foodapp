import React from 'react';
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg} from '@coreui/react'
import {makeLogout, selectUser} from "../Slices/UserSlice";
import {useDispatch, useSelector} from "react-redux";


const TheHeaderDropdown = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    return (
        <CDropdown
            inNav
            className="c-header-nav-items mx-2"
            direction="down"
        >
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                {/*<div className="c-avatar">*/}
                {/*    <CImg*/}
                {/*        src={'avatars/6.jpg'}*/}
                {/*        className="c-avatar-img"*/}
                {/*        alt="admin@bootstrapmaster.com"*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="author_name">
                    <h4 className="f_s_15 f_w_500 mb-0">{user.name}</h4>
                    <p className="f_s_12 f_w_400">{user.role.name}</p>
                </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0 dropdown-profile" placement="bottom-end">
                <CDropdownItem
                    header
                    tag="div"
                    color="light"
                    className="text-center"
                >
                    <strong>Profile</strong>
                </CDropdownItem>
                <CDropdownItem
                    className="logout_button_text"
                >
                    <span onClick={() => dispatch(makeLogout({}))}> Logout</span>
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default TheHeaderDropdown;
