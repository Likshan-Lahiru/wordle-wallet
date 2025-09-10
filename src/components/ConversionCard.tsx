import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConvertModal from './modals/ConvertModal'
import CompletionModal from './modals/CompletionModal'
import { validateGiftCard } from '../service-api/withdraw'
import {
  createAccount,
  getAccountLink,
  processPayout,
} from '../service-api/withdrawal'
import { useGlobalContext } from '../context/GlobalContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const ConversionCard = () => {
  const [giftCardCode, setGiftCardCode] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [faceValue, setFaceValue] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [showConvertModal, setShowConvertModal] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasBankAccount, setHasBankAccount] = useState(false)
  const [isLoadingBankDetails, setIsLoadingBankDetails] = useState(false)
  const [isProcessingPayout, setIsProcessingPayout] = useState(false)
  const [localTransactionId, setLocalTransactionId] = useState<string | null>(
      null,
  )
  const { transactionId, setTransactionId } = useGlobalContext()
  const navigate = useNavigate()
  useEffect(() => {
    // Check if user is logged in
    const token = sessionStorage.getItem('token')
    setIsLoggedIn(!!token)
    // Check if user already has a bank account
    if (token) {
      const userHasAccount = sessionStorage.getItem('userAlreadyHaveAccount')
      setHasBankAccount(userHasAccount === 'true')
    }
    // Retrieve stored transactionId from sessionStorage if available
    const storedTransactionId = sessionStorage.getItem('transactionId')
    if (storedTransactionId) {
      setTransactionId(storedTransactionId)
      setLocalTransactionId(storedTransactionId)
    }
  }, [setTransactionId])
  const handleCheck = async () => {
    if (giftCardCode.trim() === '') return
    setIsChecking(true)
    setFaceValue('')
    setError('')
    setIsVerified(false)
    try {
      const response = await validateGiftCard(giftCardCode)
      // Save transaction ID to both global context and local state
      setTransactionId(response.transactionId)
      setLocalTransactionId(response.transactionId)
      // Also store in sessionStorage to persist across page refreshes
      sessionStorage.setItem('transactionId', response.transactionId)
      console.log(response.transactionId, 'response.transactionId')
      // Update UI with face value
      setFaceValue(`$${response.faceValue}`)
      setIsVerified(true)
    } catch (err) {
      console.error('Error validating gift card:', err)
      setError('Failed to validate gift card. Please try again.')
    } finally {
      setIsChecking(false)
    }
  }
  const handleAddBankDetails = async () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      navigate('/login')
      return
    }
    setIsLoadingBankDetails(true)
    try {
      const token = sessionStorage.getItem('token')
      const userId = sessionStorage.getItem('userId')
      if (!token || !userId) {
        toast.error('Authentication required. Please log in again.')
        navigate('/login')
        return
      }
      // Step 1: Create account
      const createAccountResponse = await createAccount(
          {
            userId,
          },
          token,
      )
      // Step 2: Get account link
      const accountLinkResponse = await getAccountLink(
          createAccountResponse.accountId,
          token,
      )
      // Step 3: Navigate to the Stripe setup URL
      window.location.href = accountLinkResponse.url
    } catch (error) {
      console.error('Error setting up bank details:', error)
      toast.error('Failed to set up bank details. Please try again.')
    } finally {
      setIsLoadingBankDetails(false)
    }
  }
  const handleConvert = () => {
    if (!isVerified) return
    // Check if user is logged in
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      navigate('/login')
      return
    }
    // Check if user has a bank account
    if (!hasBankAccount) {
      toast.error('First add the bank details..')
      return
    }
    setShowConvertModal(true)
  }
  const handleConfirm = async () => {
    setShowConvertModal(false)
    setIsProcessingPayout(true)
    try {
      const token = sessionStorage.getItem('token')
      const userId = sessionStorage.getItem('userId')
      // Use localTransactionId as a fallback if global state transactionId is null
      const currentTransactionId =
          transactionId ||
          localTransactionId ||
          sessionStorage.getItem('transactionId')
      console.log(currentTransactionId, 'currentTransactionId')
      console.log(token, 'token')
      console.log(userId, 'userId')
      if (!token || !userId || !currentTransactionId) {
        toast.error('Missing required information. Please try again.')
        return
      }
      // Extract the numeric value from the faceValue string (remove the $ sign)
      const amount = parseFloat(faceValue.replace('$', ''))
      // Process the payout
      await processPayout(
          {
            transactionId: currentTransactionId,
            userId,
            amount,
          },
          token,
      )
      // Show completion modal on success
      setShowCompletionModal(true)
    } catch (error) {
      console.error('Error processing payout:', error)
      toast.error('Failed to process payout. Please try again.')
    } finally {
      setIsProcessingPayout(false)
    }
  }
  const handleCloseConvertModal = () => {
    setShowConvertModal(false)
  }
  const handleCloseCompletionModal = () => {
    setShowCompletionModal(false)
    // Reset the form after successful conversion
    setGiftCardCode('')
    setFaceValue('')
    setIsVerified(false)
    setTransactionId(null)
    setLocalTransactionId(null)
    sessionStorage.removeItem('transactionId')
  }
  return (
      <div className="max-w-md xs:max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto bg-white rounded-2xl shadow-[0_0_24px_rgba(16,24,40,0.06)] p-4 sm:p-6 md:p-8 mb-10 border border-[#E6EAF0]">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="text-center mb-4 sm:mb-6">
          <p className=" text-[#5B6472] font-semibold mb-2 sm:mb-8">
            FAST • SAFE • TRANSPARENT
          </p>
          <h3 className="text-xl xs:text-3xl lg:text-4xl font-bold text-[#0F172AE5]/90 mb-1 sm:mb-8">
            Convert gift cards - instantly and compliantly.
          </h3>
          <p className="text-lg font-light  text-[#5B6472]">
            Enter a gift-card code to start.
          </p>
        </div>
        <div className="mb-3 sm:mb-10 flex flex-col xs:flex-row items-center gap-2 w-4/6 mx-auto">
          <input
              type="text"
              placeholder="Enter eGift code"
              value={giftCardCode}
              onChange={(e) => setGiftCardCode(e.target.value)}
              className="w-full xs:flex-1 border text-[#757575] border-[#E6EAF0] rounded-xl px-3 py-3 mb-2 xs:mb-0 focus:outline-none focus:ring-2 "
          />
          <button
              onClick={handleCheck}
              disabled={isChecking}
              className="w-full xs:w-auto bg-[#2F77FF] text-white px-4 py-3 rounded-xl hover:[#2F77FF] flex items-center justify-center min-w-[100px] shadow-[0_0_10px_rgba(47,119,255,0.25)]"
          >
            {isChecking ? (
                <>
                  <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                  Checking
                </>
            ) : (
                'Check'
            )}
          </button>
        </div>
        {error && <div className="mb-4 text-center text-red-500">{error}</div>}
        <div className="mb-4 flex justify-center">
          <div className="w-2/5 border-2 border-[#2F77FFF0] rounded-xl px-4 py-3 bg-white">
            {isVerified ? (
                <div className="flex items-center">
              <span className="text-[#67768F] font-extralight ">
                Face Value :{' '}
              </span>
                  <span className="ml-1 text-[#67768F] text-xl font-medium">
                {faceValue}
              </span>
                </div>
            ) : (
                <span className="text-[#67768F]">Face Value:</span>
            )}
          </div>
        </div>
        <div className="flex justify-center mb-4 sm:mb-16">
          <button
              onClick={handleConvert}
              disabled={!isVerified || isProcessingPayout}
              className={`w-2/5 ${isVerified && !isProcessingPayout ? 'bg-[#2F77FF] hover:bg-blue-600' : 'bg-blue-300'} text-white py-3 sm:py-3 rounded-xl shadow-[0_0_10px_rgba(47,119,255,0.25)] flex items-center justify-center`}
          >
            {isProcessingPayout ? (
                <>
                  <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                  Processing...
                </>
            ) : (
                'Convert'
            )}
          </button>
        </div>
        <div className="mb-4 sm:mb-6">
          <h4 className="text-base sm:text-2xl font-bold text-[#0F172AE5] mb-3 sm:mb-4 text-center">
            Payout method
          </h4>
          <div className="border border-gray-200 rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-[0_0_10px_rgba(16,24,40,0.06)] w-4/5 mx-auto">
            <h5 className="font-bold mt-5 text-xl text-[#0F172A] mb-3">
              Bank transfer
            </h5>
            <p className="text-xs sm:text-sm text-[#5B6472] mb-3 sm:mb-4">
              Bank transfers may take 5-7 business days.
            </p>
            <ul className="text-xs mt-10 sm:text-sm text-[#5B6472]/90 mb-3 sm:mb-4  space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Note : 0.25% + $0.25 per payout</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Note : $5 Customer verification fee (one-time only)</span>
              </li>
            </ul>
            <div className="flex justify-end">
              <button
                  onClick={handleAddBankDetails}
                  disabled={isLoadingBankDetails}
                  className="bg-[#2F77FF] text-white px-3 sm:px-4 py-3 sm:py-3 rounded-xl text-xs sm:text-sm hover:bg-blue-600 shadow-[0_0_10px_rgba(47,119,255,0.25)] flex items-center"
              >
                {isLoadingBankDetails ? (
                    <>
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
                      Processing...
                    </>
                ) : (
                    'Add bank details'
                )}
              </button>
            </div>
          </div>
          <div className="border border-[#2D7FF0] border-1 bg-[#EDF7FF]/50 rounded-xl p-3 sm:p-4 text-[#2D7FF0] w-4/5 mx-auto">
            Payouts may require enhanced checks. We don't process prohibited
            transactions.
          </div>
        </div>
        {/* Modals */}
        <ConvertModal
            isOpen={showConvertModal}
            onClose={handleCloseConvertModal}
            onConfirm={handleConfirm}
            faceValue={faceValue}
        />
        <CompletionModal
            isOpen={showCompletionModal}
            onClose={handleCloseCompletionModal}
            faceValue={faceValue}
        />
      </div>
  )
}
export default ConversionCard
