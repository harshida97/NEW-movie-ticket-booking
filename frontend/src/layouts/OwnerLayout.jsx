import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function OwnerLayout() {


    const navigate = useNavigate()
    const token = localStorage.getItem('owner-token');

    const handleLogout = () => {
        localStorage.removeItem('owner-token'); // Clear the token
        navigate('/'); // Redirect to the login page
    };
    return (
        <div className='min-h-screen  flex flex-col'>
            <header>
                <div className="navbar bg-blue-900 text-white">
                    <div className="flex-1" onClick={() => navigate("/")}>
                        <a className="btn btn-ghost text-xl">Movie Ticket Booking app</a>
                    </div>
                   
                   {/* Only show links if user is authenticated */}
                   {token && (
                    <ul className="flex justify-between space-x-4">
                       <li onClick={() => navigate("/owner/ownerhome")}><a>Home</a></li>
                       <li onClick={() => navigate("/owner/theaters")}><a>Theaters</a></li>
                       <li onClick={() => navigate("/owner/addtheater")}><a>Add New Theater</a></li>

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

export default OwnerLayout