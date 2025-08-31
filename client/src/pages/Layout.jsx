import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { Menu, X } from 'lucide-react'
import { dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'

const Layout = () => {

    const user = dummyUserData
    const [sidebarOpen, setSidebarOpen] = useState(false)
  
  return user ? (
    <div className='w-fill flex h-screen'>
        
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/> {/* Props */}

        <div className='flex-1 bg-slate-50'>
            <Outlet />
        </div>
        {
            sidebarOpen ? 
            <X className='absolute top-3 left-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' 
                onClick={() => setSidebarOpen(false)} 
            /> :
                  <Menu className='absolute top-3 left-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden'
                onClick={() => setSidebarOpen(true)} />
        }
    </div>
  ) : (
    <h1> <Loading/> </h1>
  )
}

export default Layout