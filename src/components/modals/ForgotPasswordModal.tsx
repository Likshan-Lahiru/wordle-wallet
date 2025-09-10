import React, { useState } from 'react'
import { XIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { requestPasswordReset } from '../../service-api/auth'
interface ForgotPasswordModalProps {
    isOpen: boolean
    onClose: () => void
}
const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()
    if (!isOpen) return null
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccessMessage('')
        setIsLoading(true)
        try {
            const response = await requestPasswordReset(email)
            // Show success message
            setSuccessMessage(response || 'Verification code sent to your email')
            // Store email in session storage for the next steps
            sessionStorage.setItem('resetEmail', email)
            // Close the modal and navigate to the code verification page after a short delay
            setTimeout(() => {
                onClose()
                navigate('/forgot-password')
            }, 1500)
        } catch (err) {
            console.error('Error requesting password reset:', err)
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to send verification code. Please try again.',
            )
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#0F172A]">Forgot Password</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <XIcon className="h-5 w-5" />
                    </button>
                </div>
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                {successMessage && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
                        {successMessage}
                    </div>
                )}
                <p className="text-sm text-[#5B6472] mb-4">
                    Please enter your email address to receive a verification code
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`bg-[#2F77FF] text-white px-4 py-2 rounded-lg text-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'}`}
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
                                    Sending...
                                </div>
                            ) : (
                                'Send Verification Code'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ForgotPasswordModal
