import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { signIn } from '../service-api/auth'
import ForgotPasswordModal from '../components/modals/ForgotPasswordModal'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)
        try {
            const data = await signIn({
                email,
                password,
            })
            // Save token and userId to sessionStorage
            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('userId', data.userId)
            sessionStorage.setItem('role', data.role)
            sessionStorage.setItem(
                'userAlreadyHaveAccount',
                String(data.userAlreadyHaveAccount),
            )
            // Redirect to home page after successful login
            navigate('/')
        } catch (err) {
            console.error('Login error:', err)
            setError(
                err instanceof Error ? err.message : 'Login failed. Please try again.',
            )
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Welcome back</h2>
                <div className="bg-white rounded-xl p-8 border shadow-[0_0_24px_rgba(16,24,40,0.06)]">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-[#0F172A] mb-1"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-[#0F172A] mb-1"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPasswordModal(true)}
                                    className="text-[#5B6472] text-xs hover:underline"
                                >
                                    Forgot password?
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`min-w-[90px] text-xs font-semibold bg-[#2F77FF] text-white py-3 px-4 rounded-lg hover:bg-blue-600 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Signing in...
                                        </div>
                                    ) : (
                                        'Log in'
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        No account?{' '}
                        <Link to="/signup" className="text-[#4285F4] hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
            {/* Forgot Password Modal */}
            <ForgotPasswordModal
                isOpen={showForgotPasswordModal}
                onClose={() => setShowForgotPasswordModal(false)}
            />
        </div>
    )
}
export default Login
