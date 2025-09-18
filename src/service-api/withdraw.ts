

interface GiftCardValidationResponse {
    transactionId: string
    faceValue: number
}
export const validateGiftCard = async (
    giftCardCode: string,
): Promise<GiftCardValidationResponse> => {
    try {
        const basedUrl = "https://service-wordle.beecele.com.au/wordoll/api"
        //const basedUrl = "http://localhost:8080/wordoll/api"
        const response = await fetch(
            `${basedUrl}/giftcard/validate/code?giftCardCode=${encodeURIComponent(giftCardCode)}`,
        )
        if (!response.ok) {
            throw new Error('Failed to validate gift card')
        }
        return await response.json()
    } catch (error) {
        console.error('Error validating gift card:', error)
        throw error
    }
}
