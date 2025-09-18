import React, { useEffect, useState, useRef, createElement } from 'react'
import { XIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
    verifyEmail,
    resendVerificationCode,
    signIn,
} from '../../service-api/auth'
interface VerifyEmailModalProps {
    isOpen: boolean
    onClose: () => void
    email: string
    userId: string
    password?: string
}
const VerifyEmailModal = ({
                              isOpen,
                              onClose,
                              email,
                              userId,
                              password,
                          }: VerifyEmailModalProps) => {
    const [verificationCode, setVerificationCode] = useState([
        '',
        '',
        '',
        '',
        '',
        '',
    ])
    const [isLoading, setIsLoading] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 6)
        // Focus first input when modal opens
        if (isOpen && inputRefs.current[0]) {
            setTimeout(() => {
                inputRefs.current[0]?.focus()
            }, 100)
        }
    }, [isOpen])
    if (!isOpen) return null
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
    const performSignIn = async () => {
        try {
            // Only attempt sign-in if we have both email and password
            if (email && password) {
                const signInData = await signIn({
                    email,
                    password,
                })
                // Store authentication data
                sessionStorage.setItem('token', signInData.token)
                sessionStorage.setItem('userId', signInData.userId)
                sessionStorage.setItem('role', signInData.role)
                sessionStorage.setItem(
                    'userAlreadyHaveAccount',
                    String(signInData.userAlreadyHaveAccount),
                )
                // Navigate to home page
                onClose()
                navigate('/')
            } else {
                // If missing email or password, redirect to login page
                onClose()
                navigate('/login')
            }
        } catch (err) {
            console.error('Auto sign-in failed:', err)
            // If auto sign-in fails, redirect to login page
            onClose()
            navigate('/login')
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
            const response = await verifyEmail(userId, code)
            // Show success message
            setSuccessMessage(response.message || 'Email verified successfully')
            // After successful verification, perform auto sign-in
            if (response.verified) {
                // Wait a moment to show the success message before signing in
                setTimeout(() => {
                    performSignIn()
                }, 1500)
            } else {
                // If verification wasn't successful, redirect to login
                setTimeout(() => {
                    onClose()
                    navigate('/login')
                }, 2000)
            }
        } catch (err) {
            console.error('Error verifying email:', err)
            setError(
                err instanceof Error
                    ? err.message
                    : 'Invalid verification code. Please try again.',
            )
            setIsLoading(false)
        }
    }
    const handleResendCode = async () => {
        if (isResending) return
        setError('')
        setSuccessMessage('')
        setIsResending(true)
        try {
            const message = await resendVerificationCode(email)
            toast(message)
        } catch (err) {
            console.error('Error resending verification code:', err)
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to resend verification code. Please try again.',
            )
        } finally {
            setIsResending(false)
        }
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-[#F7F9FC]">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#0F172A]">Verify Email</h2>
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
                        disabled={isResending || isLoading}
                    >
                        {isResending ? 'Sending...' : 'Resend Code?'}
                    </button>
                    <button
                        onClick={handleVerify}
                        disabled={isLoading}
                        className={`bg-[#2F77FF] font-semibold text-xs text-white px-4 py-3 rounded-xl hover:bg-blue-600 shadow-[0_0_10px_rgba(47,119,255,0.25)] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
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
    )
}
export default VerifyEmailModal
