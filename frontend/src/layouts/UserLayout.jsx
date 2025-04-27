import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function UserLayout() {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/'); // Redirect to the login page
    };

    
    return (
        <div className='min-h-screen  flex flex-col'>
            <header>
                <div className="navbar bg-blue-900 text-white">
                    <div className="flex-1" onClick={() => navigate("/")}>
                        <a className="btn btn-ghost text-xl">Movie Ticket Booking app</a>
                    </div>
                   
                    {token && (
                    <ul className="flex justify-between space-x-4">
                       <li onClick={() => navigate("/userhome")}><a>Home</a></li>
                       <li onClick={handleLogout}><a>Logout</a></li>
                    </ul>
                    )}
                        </div>
                
            
            </header>
            <div className='flex-1'>
                <Outlet />
            </div>

            <footer className="footer footer-center bg-blue-900 text-black p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by BMC Ltd</p>
                </aside>
            </footer>
        </div>
    )
}

export default UserLayout