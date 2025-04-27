import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function UserLayout() {

    const navigate = useNavigate()

   

    
    return (
        <div className='min-h-screen  flex flex-col'>
            <header>
                <div className="navbar bg-blue-900 text-white">
                    <div className="flex-1" onClick={() => navigate("/")}>
                        <a className="btn btn-ghost text-xl">Movie Ticket Booking app</a>
                    </div>
                   
                    <ul className="flex justify-between space-x-4">
                       <li onClick={() => navigate("/about")}><a>About</a></li>
                       
                    </ul>
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