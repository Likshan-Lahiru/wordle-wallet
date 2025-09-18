import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { signUp } from '../service-api/auth'
import VerifyEmailModal from '../components/modals/VerifyEmailModal'
const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [country, setCountry] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [agreeToTerms, setAgreeToTerms] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [showVerifyEmailModal, setShowVerifyEmailModal] = useState(false)
    const [userId, setUserId] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        // Validate terms agreement
        if (!agreeToTerms) {
            setError('You must agree to the Terms and Privacy')
            return
        }
        setIsLoading(true)
        try {
            const data = await signUp({
                email,
                password,
                country,
            })
            // Store userId for verification
            setUserId(data.userId)
            // Show verification modal
            setShowVerifyEmailModal(true)
        } catch (err) {
            console.error('Registration error:', err)
            setError(
                err instanceof Error
                    ? err.message
                    : 'Registration failed. Please try again.',
            )
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                    Create your account
                </h2>
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
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
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
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-semibold text-[#0F172A] mb-1"
                                >
                                    Confirm
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOffIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="country"
                                className="block text-sm font-semibold text-[#0F172A] mb-1"
                            >
                                Country
                            </label>
                            <input
                                id="country"
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600">
                  I agree to the Terms and Privacy.
                </span>
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full text-sm font-semibold bg-[#2F77FF] text-white py-3 px-4 rounded-lg hover:bg-blue-600 shadow-[0_0_10px_rgba(47,119,255,0.25)] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
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
                                        Signing up...
                                    </div>
                                ) : (
                                    'Sign up'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#4285F4] hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
            {/* Verify Email Modal */}
            <VerifyEmailModal
                isOpen={showVerifyEmailModal}
                onClose={() => setShowVerifyEmailModal(false)}
                email={email}
                userId={userId}
                password={password}
            />
        </div>
    )
}
export default SignUp
