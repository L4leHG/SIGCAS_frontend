import { FaBell, FaUserCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex items-center justify-end px-6 py-4 border-b bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <FaBell size={20} className="text-gray-600 mr-6" />
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="mr-6 text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          <FaUserCircle size={28} />
        </button>
        {showMenu && (
          <div className="absolute right-0 top-12 mt-2 w-40 bg-white shadow-lg rounded-md border z-50">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
