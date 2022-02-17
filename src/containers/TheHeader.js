import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {CHeader, CHeaderNav, CToggler} from '@coreui/react'
import TheHeaderDropdown from './TheHeaderDropdown';
import {selectSidebar, showSidebar} from "../Slices/SidebarSlice";
import {makeLogout} from "../Slices/UserSlice";

const TheHeader = () => {
    const dispatch = useDispatch()
    const sidebarShow = useSelector(selectSidebar);

    const toggleSidebar = async () => {
        const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
        dispatch(showSidebar(val));
    }

    const toggleSidebarMobile = async () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
        dispatch(showSidebar(val));
    }
    return (
        <CHeader withSubheader>
            <CToggler
                inHeader
                className="ml-md-3 d-lg-none"
                onClick={toggleSidebarMobile}
            />
            <CToggler
                inHeader
                className="ml-3 d-md-down-none"
                onClick={toggleSidebar}
            />
            <div className="profile-iconss ml-auto" style={{display: "none"}}>
                <div className="header_right d-flex justify-content-between align-items-center">
                    <div className="header_notification_warp d-flex align-items-center">
                        <li>
                            <a className="CHATBOX_open nav-link-notify" href="/"> <img src="/img/msg.svg"
                                                                                       class="gray-icon"/> </a>
                        </li>
                        <li>
                            <a className="bell_notification_clicker nav-link-notify" href="/"><img src="/img/bell.svg"
                                                                                                   class="gray-icon"/>
                            </a>
                        </li>
                    </div>
                    <div className="profile_info d-flex align-items-center">
                        <div className="profile_thumb mr_20">
                            <div className="author_name">
                                <h4 className="f_s_15 f_w_500 mb-0">Jiue Anderson</h4>
                                <button className="Login-btn"
                                        onClick={() => dispatch(makeLogout({}))}>Logout
                                </button>
                                <p className="f_s_12 f_w_400">Manager</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CHeaderNav className="px-3 ml-auto">
                <TheHeaderDropdown/>
            </CHeaderNav>
        </CHeader>
    )
}

export default TheHeader;
