import { API_CONFIG } from './config.ts'
interface CreateAccountRequest {
    userId: string
}
interface CreateAccountResponse {
    accountId: string
}
interface AccountLinkResponse {
    url: string
}
interface PayoutRequest {
    userId: string
    giftCardCode: string
}
interface PayoutResponse {
    transferId: string
    amount: number
    currency: string
    destination: string
}
export const createAccount = async (
    request: CreateAccountRequest,
    token: string,
): Promise<CreateAccountResponse> => {
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/withdrawal/create-account`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(request),
            },
        )
        if (!response.ok) {
            throw new Error('Failed to create account')
        }
        return await response.json()
    } catch (error) {
        console.error('Error creating account:', error)
        throw error
    }
}
export const getAccountLink = async (
    accountId: string,
    token: string,
): Promise<AccountLinkResponse> => {
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/withdrawal/account-link/${accountId}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        if (!response.ok) {
            throw new Error('Failed to get account link')
        }
        return await response.json()
    } catch (error) {
        console.error('Error getting account link:', error)
        throw error
    }
}
export const processPayout = async (
    request: PayoutRequest,
    token: string,
): Promise<PayoutResponse> => {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}/withdrawal/payout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(request),
        })
        if (!response.ok) {
            throw new Error('Failed to process payout')
        }
        return await response.json()
    } catch (error) {
        console.error('Error processing payout:', error)
        throw error
    }
}
