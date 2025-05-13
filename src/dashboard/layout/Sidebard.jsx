import { FaBars, FaHome, FaChartBar, FaClipboardList, FaPaperPlane } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"

export default function Sidebar({ isOpen, toggle }) {
  const location = useLocation()

  const navItems = [
    { to: "/dashboard", label: "Panel de Inicio", icon: <FaHome /> },
    { to: "/consulta", label: "Consulta", icon: <FaChartBar /> },
    { to: "/tramites", label: "Trámites", icon: <FaClipboardList /> },
    { to: "/radicar", label: "Radicar", icon: <FaPaperPlane /> },
  ]

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-gray-100 h-full p-4 transition-all duration-300 flex flex-col`}
    >
      <button onClick={toggle} className="mb-6">
        <FaBars size={24} />
      </button>

      <nav className="flex flex-col gap-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 p-2 rounded-md ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}