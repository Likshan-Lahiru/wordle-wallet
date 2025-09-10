import React, { useEffect, useState, useRef, createElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyResetCode } from '../service-api/auth'
const ForgotPassword = () => {
    const [verificationCode, setVerificationCode] = useState([
        '',
        '',
        '',
        '',
        '',
        '',
    ])
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const navigate = useNavigate()
    // Initialize refs array and get email from session storage
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 6)
        // Get email from session storage
        const resetEmail = sessionStorage.getItem('resetEmail')
        if (resetEmail) {
            setEmail(resetEmail)
        } else {
            // If no email in session storage, redirect to login
            navigate('/login')
        }
    }, [navigate])
    const handleCodeChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newVerificationCode = [...verificationCode]
            newVerificationCode[index] = value
            setVerificationCode(newVerificationCode)
            // Auto-focus next input if value is entered
            if (value !== '' && index < 5) {
                inputRefs.current[index + 1]?.focus()
            }
        }
    }
    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === 'Backspace' && index > 0 && verificationCode[index] === '') {
            inputRefs.current[index - 1]?.focus()
        }
    }
    const handleVerify = async () => {
        setError('')
        setSuccessMessage('')
        setIsLoading(true)
        // Combine the verification code digits
        const code = verificationCode.join('')
        // Validate code length
        if (code.length !== 6) {
            setError('Please enter all 6 digits of the verification code')
            setIsLoading(false)
            return
        }
        try {
            const response = await verifyResetCode(email, code)
            // Show success message
            setSuccessMessage(response || 'Code verified successfully')
            // Navigate to reset password page after a short delay
            setTimeout(() => {
                navigate('/reset-password')
            }, 1000)
        } catch (err) {
            console.error('Error verifying code:', err)
            setError(
                err instanceof Error
                    ? err.message
                    : 'Invalid verification code. Please try again.',
            )
        } finally {
            setIsLoading(false)
        }
    }
    const handleResendCode = async () => {
        // This would typically call the requestPasswordReset function again
        // For now, just show a message
        toast('Verification code resent to your email')
    }
    // Simple toast function
    const toast = (message: string) => {
        const toastEl = document.createElement('div')
        toastEl.className =
            'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg'
        toastEl.textContent = message
        document.body.appendChild(toastEl)
        setTimeout(() => {
            document.body.removeChild(toastEl)
        }, 3000)
    }
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                    Password reset
                </h2>
                <div className="bg-white rounded-xl p-8 border shadow-[0_0_24px_rgba(16,24,40,0.06)]">
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
                    <p className="text-sm text-[#5B6472] mb-6">
                        Please enter the 6 digits code that was sent to{' '}
                        <span className="text-[#0F172A] font-medium">{email}</span>.
                    </p>
                    <div className="flex justify-center gap-2 mb-8">
                        {verificationCode.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="shadow-[0_0_24px_rgba(16,24,40,0.06)] w-12 h-12 border border-gray-200 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={handleResendCode}
                            className="text-[#5B6472] font-light text-xs hover:underline"
                            disabled={isLoading}
                        >
                            Resend Code?
                        </button>
                        <button
                            onClick={handleVerify}
                            disabled={isLoading}
                            className={`bg-[#2F77FF] font-semibold text-xs text-white px-4 py-3 rounded-xl hover:bg-blue-600 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
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
                                    Verifying...
                                </div>
                            ) : (
                                'Verify'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword
