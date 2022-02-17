import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {CCreateElement, CSidebar, CSidebarBrand, CSidebarNav, CSidebarNavItem,} from '@coreui/react'
import {admin_nav, chef_nav} from './_nav'
import {selectSidebar, showSidebar} from "../Slices/SidebarSlice";
import {selectUser} from "../Slices/UserSlice";
import logo from "../images/logo.png";

const TheSidebar = () => {
    const dispatch = useDispatch()
    const show = useSelector(selectSidebar);
    const user = useSelector(selectUser);
    const {role} = user;
    return (
        <CSidebar
            show={show}
            onShowChange={(val) => dispatch(showSidebar(val))}
        >
            <CSidebarBrand className="d-md-down-none" to="/admin/dashboard">
                <div>
                    <div>
                        <img className="m-4" src={logo} width="80px" height="70px"/>
                    </div>
                    <div>
                        <h4>HomeFoodyy</h4>
                    </div>
                </div>
            </CSidebarBrand>
            <CSidebarNav>
                <CCreateElement
                    items={role.slug !== "chef" ? admin_nav : chef_nav}
                    components={{
                        CSidebarNavItem,
                    }}
                />
            </CSidebarNav>
        </CSidebar>
    )
}

export default React.memo(TheSidebar)
