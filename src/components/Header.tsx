import React, { useEffect, useState } from 'react'
import { MenuIcon, XIcon, LogOutIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    // Check if user is logged in by looking for token in sessionStorage
    const token = sessionStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('role')
    // Update login state
    setIsLoggedIn(false)
    // Redirect to login page
    navigate('/login')
  }
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
              {isLoggedIn ? (
                  <button
                      onClick={handleLogout}
                      className="text-sm lg:text-base flex items-center text-[#0F172A] hover:text-gray-900 py-3 px-4 rounded-xl font-bold border border-[#E6EAF0]"
                  >
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    Log out
                  </button>
              ) : (
                  <>
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
                  </>
              )}
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
                  {isLoggedIn ? (
                      <button
                          onClick={handleLogout}
                          className="flex items-center text-gray-600 hover:text-gray-900 py-2 border border-[#E6EAF0] rounded-md px-4"
                      >
                        <LogOutIcon className="h-4 w-4 mr-2" />
                        Log out
                      </button>
                  ) : (
                      <>
                        <Link
                            to="/login"
                            className="text-gray-600 hover:text-gray-900 py-2 border border-[#E6EAF0] rounded-md px-4"
                        >
                          Log in
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                        >
                          Sign up
                        </Link>
                      </>
                  )}
                </div>
              </div>
          )}
        </div>
      </header>
  )
}
export default Header
