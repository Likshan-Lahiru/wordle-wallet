import React from 'react'
interface ConvertModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    faceValue: string
}
const ConvertModal = ({
                          isOpen,
                          onClose,
                          onConfirm,
                          faceValue,
                      }: ConvertModalProps) => {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
            <div className="absolute inset-0 bg-[#FFFFFF]/90" onClick={onClose}></div>
            <div className="relative bg-white rounded-xl border-2 border-[#2D7FF0]/80 shadow-[0_0_30px_rgba(16,24,40,0.19)] p-8 w-full max-w-md">
                <div className="text-left">
                    <h2 className="font-bold text-[#0F172A] mb-4">Convert Gift Card?</h2>
                    <p className="text-[#5B6472]/90 font-light mb-8">
                        Do you want to redeem {faceValue} to your bank account?
                    </p>
                </div>
                <div className="flex justify-end space-x-4 mt-16">
                    <button
                        onClick={onClose}
                        className="px-5 py-3 border border-[#2F77FF]/53 text-[#2F77FF] font-medium rounded-xl shadow-[0_0_10px_rgba(47,119,255,0.25)]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-3 bg-[#2F77FF] text-white font-medium rounded-xl shadow-[0_0_10px_rgba(47,119,255,0.25)]"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ConvertModal
