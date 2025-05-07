import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebard"
import Navbar from "./Navbar"

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  )
}