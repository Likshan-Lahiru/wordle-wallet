import React from 'react';
const ProcessSteps = () => {
  const steps = [{
    number: '1',
    title: 'Enter the code',
    description: 'Provide your unique eGift code to check its value instantly.'
  }, {
    number: '2',
    title: 'Add bank details',
    description: 'Securely enter your bank information to receive the payout.'
  }, {
    number: '3',
    title: 'Get paid',
    description: 'Receive your funds via bank transfer in 5-7 business days after verification.'
  }];
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
      {steps.map(step => <div key={step.number} className="bg-white p-4 sm:p-6 rounded-xl border border-[#E6EAF0] shadow-[0_0_24px_rgba(16,24,40,0.06)]">
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="w-10 h-12 mb-2 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl rounded-bl-3xl  flex items-center justify-center bg-[#EEF4FF] border-2 border-[#D9E4FF] text-[#1E3A8A] font-medium text-lg sm:text-xl">
              {step.number}
            </div>
          </div>
          <h4 className="font-medium text-[#0F172A]/90 text-base sm:text-lg mb-1 sm:mb-6">
            {step.title}
          </h4>
          <p className="text-xs sm:text-sm text-[#5B6472]">{step.description}</p>
        </div>)}
    </div>;
};
export default ProcessSteps;