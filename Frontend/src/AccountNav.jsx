import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const AccountNav = () => {
    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];
    if (subpage === undefined) {
      subpage = 'profile';
    }
    function linkClasses(type = null) {
        let classes = 'py-2 px-6 inline-flex gap-1 rounded-full';
        if (type === subpage) {
            classes += ' bg-blue-500 text-white';
        } else {
            classes += ' bg-gray-200 ';
        }
        return classes;
    }
    return (
        <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
            <Link className={linkClasses('profile')} to="/account">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                My Profile</Link>
        </nav>
    )
}

export default AccountNav
