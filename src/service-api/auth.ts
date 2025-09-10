import { API_CONFIG } from './api.ts'
interface SignInRequest {
    email: string
    password: string
}
interface SignInResponse {
    token: string
    message: string
    role: string
    userId: string
    userAlreadyHaveAccount: boolean
}
export const signIn = async (
    credentials: SignInRequest,
): Promise<SignInResponse> => {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}/auth/signIn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Authentication failed')
        }
        return data
    } catch (error) {
        console.error('Error during sign in:', error)
        throw error
    }
}
// Request password reset (send verification code)
export const requestPasswordReset = async (email: string): Promise<string> => {
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/auth/reset/forgot-password`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            },
        )
        // Handle plain text response
        const text = await response.text()
        if (!response.ok) {
            throw new Error(text || 'Failed to request password reset')
        }
        return text
    } catch (error) {
        console.error('Error requesting password reset:', error)
        throw error
    }
}
// Verify the reset code
export const verifyResetCode = async (
    email: string,
    code: string,
): Promise<string> => {
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/auth/reset/verify-code`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code }),
            },
        )
        // Handle plain text response
        const text = await response.text()
        if (!response.ok) {
            throw new Error(text || 'Invalid verification code')
        }
        return text
    } catch (error) {
        console.error('Error verifying reset code:', error)
        throw error
    }
}
// Reset password with new password
export const resetPassword = async (
    email: string,
    newPassword: string,
): Promise<string> => {
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/auth/reset/reset-password`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword }),
            },
        )
        // Handle plain text response
        const text = await response.json()
        if (!response.ok) {
            throw new Error(text || 'Failed to reset password')
        }
        return text.message
    } catch (error) {
        console.error('Error resetting password:', error)
        throw error
    }
}
