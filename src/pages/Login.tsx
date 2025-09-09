import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login logic here
        console.log('Login attempt with:', email)
    }
    return (
        <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center px-4">
            <div className="w-5/12 ">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Welcome back</h2>
                <div className="bg-white rounded-xl  p-8 border  shadow-[0_0_24px_rgba(16,24,40,0.06)]">
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
                                <Link
                                    to="/forgot-password"
                                    className="text-[#5B6472] text-xs hover:underline"
                                >
                                    Forgot password?
                                </Link>
                                <button
                                    type="submit"
                                    className="w-20 text-xs font-semibold bg-[#2F77FF] text-white py-3 rounded-lg hover:bg-blue-600"
                                >
                                    Log in
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mt-6">
                    <p className="text-sm text-gray-500">
                        No account?{' '}
                        <Link to="/signup" className="text-[#4285F4] hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Login
