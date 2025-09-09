import React, { useState } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  return (
      <header className="bg-white py-4 px-4 sm:px-6 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/">
                <h1 className="text-lg xs:text-xl sm:text-2xl font-bold">
                  <span className="text-[#0F172A]">Beecele</span>
                  <span className="text-[#11C5B8]">.com</span>
                </h1>
              </Link>
            </div>
            {/* Desktop navigation */}
            <div className="hidden sm:flex items-center space-x-4">
              <Link
                  to="/login"
                  className="text-sm lg:text-base text-[#0F172A] hover:text-gray-900 py-3 px-4 rounded-xl font-bold border border-[#E6EAF0]"
              >
                Log in
              </Link>
              <Link
                  to="/signup"
                  className="text-sm lg:text-base bg-[#2F77FF] hover:bg-blue-600 text-white py-3 px-4 rounded-xl shadow-[0_0_10px_rgba(47,119,255,0.25)]"
              >
                Sign up
              </Link>
            </div>
            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {mobileMenuOpen ? (
                    <XIcon className="h-6 w-6" />
                ) : (
                    <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          {/* Mobile menu */}
          {mobileMenuOpen && (
              <div className="sm:hidden mt-4 py-3 border-t border-gray-200">
                <div className="flex flex-col space-y-3">
                  <Link
                      to="/login"
                      className="text-gray-600 hover:text-gray-900 py-2 border border-[#E6EAF0] rounded-md"
                  >
                    Log in
                  </Link>
                  <Link
                      to="/signup"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
          )}
        </div>
      </header>
  )
}
export default Header
