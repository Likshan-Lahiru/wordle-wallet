import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
const ForgotPassword = () => {
    const [verificationCode, setVerificationCode] = useState([
        '',
        '',
        '',
        '',
        '',
        '',
    ])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const navigate = useNavigate()
    const [email] = useState('acd@gmail.com')
    // Initialize refs array
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 6)
    }, [])
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
    const handleVerify = () => {
        // Navigate to reset password page
        navigate('/reset-password')
    }
    const handleResendCode = () => {
        // Logic to resend verification code
        console.log('Resending verification code')
    }
    return (
        <div className="min-h-screen  bg-[#F7F9FC] flex flex-col items-center justify-center px-4">
            <div className="w-5/10">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                    Password reset
                </h2>
                <div className="bg-white rounded-xl p-8 border shadow-[0_0_24px_rgba(16,24,40,0.06)]">
                    <p className="text-sm text-[#5B6472] mb-6">
                        Please enter the 6 digits code that was sent to{' '}
                        <span className="text-[#0F172A] font-medium">{email}</span>.
                    </p>
                    <div className="flex ml-8 gap-2 mb-8">
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

                    <div className="flex justify-between items-center mt-16">
                        <button
                            onClick={handleResendCode}
                            className="text-[#5B6472] font-light text-xs hover:underline"
                        >
                            Resend Code?
                        </button>
                        <button
                            onClick={handleVerify}
                            className="bg-[#2F77FF] font-semibold text-xs text-white px-4 py-3 rounded-xl hover:bg-blue-600"
                        >
                            Verify
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword
