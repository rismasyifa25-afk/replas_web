import React from 'react'
import AdminNavbar from '@/components/layouts/AdminNavbar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div>
      <AdminNavbar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  )
}
