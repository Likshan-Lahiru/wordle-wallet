import React from 'react'
interface CompletionModalProps {
    isOpen: boolean
    onClose: () => void
    faceValue: string
}
const CompletionModal = ({
                             isOpen,
                             onClose,
                             faceValue,
                         }: CompletionModalProps) => {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
            <div className="absolute inset-0 bg-[#FFFFFF]/90" onClick={onClose}></div>
            <div className="relative bg-white rounded-xl border-2 border-[#2D7FF0]/80 shadow-[0_0_30px_rgba(16,24,40,0.19)] p-8 w-full max-w-md">
                <div className="mb-6">
                    <div className="flex items-center mb-4">

                        <h2 className="text-lg font-bold text-[#0F172A] mr-4">
                            Conversion Complete
                        </h2>
                        <img
                            src="https://uploadthingy.s3.us-west-1.amazonaws.com/taKPchMC3CcDF8HZpUVbnx/right-mark.png"
                            alt="Success"
                            className="w-7 h-7 "
                        />
                    </div>
                    <p className="text-[#5B6472]/90 font-light mb-8">
                        You redeemed {faceValue} to your bank account. You will receive it
                        in 5-7 business days.
                    </p>
                </div>
                <div className="flex justify-end mt-16">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-[#2F77FF] text-white font-medium rounded-xl shadow-[0_0_10px_rgba(47,119,255,0.25)]"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    )
}
export default CompletionModal
