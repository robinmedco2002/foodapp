import React from 'react'
import {
    Dashboard,
    People,
    AccessibilityNew,
    Contacts,
    Kitchen,
    Fastfood,
    ShoppingBasket,
    Feedback,
    Restaurant,
    Category
} from "@material-ui/icons";

export const admin_nav = [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/admin/dashboard',
        icon: <Dashboard color="secondary" className="mr-3"/>,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'All Users',
        to: '/admin/users',
        icon: <People color="secondary" className="mr-3"/>,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Users Requests',
        to: '/admin/users-request',
        icon: <People color="secondary" className="mr-3"/>,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Orders',
        to: '/admin/orders',
        icon: <ShoppingBasket color="secondary" className="mr-3"/>,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Kitchens',
        to: '/admin/kitchens',
        icon: <Fastfood color="secondary" className="mr-3"/>,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Dishes',
        to: '/admin/dishes',
        icon: <Restaurant color="secondary" className="mr-3"/>,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Category',
        to: '/admin/category',
        icon: <Category color="secondary" className="mr-3"/>,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Feedback',
        to: '/admin/feedback',
        icon: <Feedback color="secondary" className="mr-3"/>,
    },
];

export const chef_nav = [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/chef/dashboard',
        icon: <Dashboard color="secondary" className="mr-3"/>,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Orders',
        to: '/chef/orders',
        icon: <ShoppingBasket color="secondary" className="mr-3"/>,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Kitchens',
        to: '/chef/kitchens',
        icon: <Kitchen color="secondary" className="mr-3"/>,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Dishes',
        to: '/chef/dishes',
        icon: <Fastfood color="secondary" className="mr-3"/>,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Category',
        to: '/chef/category',
        icon: <Category color="secondary" className="mr-3"/>,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Feedabck',
        to: '/chef/feedback',
        icon: <Category color="secondary" className="mr-3"/>,
    }
];

