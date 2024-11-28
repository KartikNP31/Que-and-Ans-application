import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export const Dashboard = () => {
  return (
    <div className='flex h-[800px]'>
      <Sidebar/>
      <div className='m-2 p-4 border border-gray-300 rounded-lg w-full'>
        <Outlet />
      </div>
      <div className='m-2 p-4 border border-gray-300 rounded-lg w-[25rem]'>
        filters
      </div>
    </div>
  )
}
