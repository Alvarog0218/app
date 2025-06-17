/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useContext, useState, useCallback, useRef, useEffect } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { paymentsContent } from '../lib/paymentsContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import Script from 'next/script';
import Image from 'next/image';

export default function PaymentsPage() {
  const { language } = useContext(LanguageContext);
  const currentSections = paymentsContent[language];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    amount: '24.00',
    isSubmitting: false,
    alertMessage: '',
    alertType: '' as 'success' | 'error' | '',
    token: '',
    transactionId: '',
  });

  const formDataRef = useRef({
    firstName: '',
    lastName: '',
    email: '',
    amount: '24.00',
  });

  useEffect(() => {
    formDataRef.current = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      amount: formData.amount,
    };
  }, [formData]);

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      amount: '24.00',
      isSubmitting: false,
      alertMessage: '',
      alertType: '',
      token: '',
      transactionId: '',
    });
  };

  const finishSubmit = useCallback(async (response: any) => {
    try {
      if (!response.token) {
        throw new Error(currentSections.payments.errorMessages.noPaymentToken);
      }

      const today = new Date();
      today.setDate(today.getDate() + 1);
      const start_date =
        today.getFullYear().toString() +
        String(today.getMonth() + 1).padStart(2, '0') +
        String(today.getDate()).padStart(2, '0');

      const planData = {
        payment_token: response.token,
        first_name: formDataRef.current.firstName,
        last_name: formDataRef.current.lastName,
        email: formDataRef.current.email,
        recurring: 'add_subscription' as const,
        plan_amount: formDataRef.current.amount,
        plan_id: 'PREM001',
        start_date: start_date,
      };

      const apiResponse = await fetch('/api/add-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
      });

      const result = await apiResponse.json();

      if (apiResponse.ok && result.success) {
        const successMessage = currentSections.payments.successMessage.replace(
          '{transactionId}',
          result.transactionId
        );
        setFormData(prev => ({
          ...prev,
          isSubmitting: false,
          alertMessage: successMessage,
          alertType: 'success',
          token: response.token,
          transactionId: result.transactionId,
        }));

        // Luego, enviar los correos
        const emailResponse = await fetch('/api/subscription-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formDataRef.current.email,
            firstName: formDataRef.current.firstName,
            lastName: formDataRef.current.lastName,
            transactionId: result.transactionId,
            language,
          }),
        });

        const emailResult = await emailResponse.json();
        if (!emailResponse.ok) {
          console.error('Error al enviar correos:', emailResult);
        }

        console.log('Suscripción completada exitosamente');

        alert(successMessage);
        setTimeout(() => resetForm(), 5000);
      } else {
        throw new Error(result.responseText || result.error || currentSections.payments.errorMessages.genericError);
      }
    } catch (error) {
      console.error('Error en finishSubmit:', error);
      setFormData(prev => ({
        ...prev,
        isSubmitting: false,
        alertMessage: error instanceof Error ? error.message : currentSections.payments.errorMessages.genericError,
        alertType: 'error',
        token: response.token || '',
        transactionId: '',
      }));
    }
  }, [currentSections, language]);

  const configurePayment = () => {
    window.CollectJS.configure({
      variant: 'inline',
      currency: 'USD',
      country: 'US',
      callback: (response) => {
        finishSubmit(response);
      },
      fields: {
        ccnumber: {
          placeholder: '0000 0000 0000 0000',
          selector: '#ccnumber',
        },
        ccexp: {
          placeholder: 'MM / YY',
          selector: '#ccexp',
        },
        cvv: {
          placeholder: 'CVV',
          selector: '#cvv',
        },
      },
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setFormData(prev => ({
        ...prev,
        alertMessage: currentSections.payments.errorMessages.requiredFields,
        alertType: 'error',
      }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      isSubmitting: true,
      alertMessage: '',
      alertType: '',
    }));
    if (window.CollectJS) {
      window.CollectJS.startPaymentRequest();
    } else {
      setFormData(prev => ({
        ...prev,
        isSubmitting: false,
        alertMessage: currentSections.payments.errorMessages.paymentSystemNotLoaded,
        alertType: 'error',
      }));
    }
  };

  return (
    <>
      <div className="flex w-[300vw] h-full">
        <section
          className="w-screen min-h-screen flex justify-center pt-16 md:pt-28"
          style={{ background: 'radial-gradient(circle at left center, rgb(94, 108, 56) -72%, rgb(19, 22, 28) 62%)' }}
        >
          <div className="flex flex-col w-full max-w-[90%] border-t-1 border-white">
            <div className="text-white text-xl" style={{ lineHeight: '1.5' }}>
              <div className="flex flex-col-reverse md:flex-row gap-6 min-h-[100vh]">
                <div className="flex-[4] flex flex-col p-4 sm:p-6 md:p-12 lg:p-24">
                  <h3 className="text-xl font-extrabold font-visby-extrabold text-[#d4fc6b] text-left">{currentSections.payments.title}</h3>
                  <p className="mt-4 mb-12">{currentSections.payments.description}</p>

                  {formData.alertMessage && (
                    <div className={`alert ${formData.alertType === 'success' ? 'text-[#d4fc6b]' : 'text-red-500'}`}>
                      {formData.alertMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="relative w-full mb-8">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400"
                      />
                      <input
                        type="text"
                        name="firstName"
                        className="w-full py-3 pl-10 pr-3 bg-black text-white border border-solid border-[#CBE850] rounded-md flex items-center"
                        placeholder={currentSections.payments.placeholders.firstName}
                        onChange={event => setFormData(prev => ({ ...prev, firstName: event.target.value }))}
                        value={formData.firstName}
                        disabled={formData.isSubmitting}
                      />
                    </div>

                    <div className="relative w-full mb-8">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400"
                      />
                      <input
                        type="text"
                        name="lastName"
                        className="w-full py-3 pl-10 pr-3 bg-black text-white border border-solid border-[#CBE850] rounded-md flex items-center"
                        placeholder={currentSections.payments.placeholders.lastName}
                        onChange={event => setFormData(prev => ({ ...prev, lastName: event.target.value }))}
                        value={formData.lastName}
                        disabled={formData.isSubmitting}
                      />
                    </div>

                    <div className="relative w-full mb-8">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400"
                      />
                      <input
                        type="email"
                        name="email"
                        className="w-full py-3 pl-10 pr-3 bg-black text-white border border-solid border-[#CBE850] rounded-md flex items-center"
                        placeholder={currentSections.payments.placeholders.email}
                        onChange={event => setFormData(prev => ({ ...prev, email: event.target.value }))}
                        value={formData.email}
                        disabled={formData.isSubmitting}
                      />
                    </div>
                    <div>
                      <Image
                        src="/visa-mastercard-american-express-logo-icons.webp"
                        alt="Credit cards we accept"
                        width={192}
                        height={64}
                        priority
                        className="logo w-48 max-[340px]:w-30 max-md:w-35 mb-2"
                      />
                    </div>
                    <div className="relative w-full py-3 pl-10 pr-3 mb-8 bg-black text-white border border-solid border-[#CBE850] rounded-md flex items-center">
                      <div id="ccnumber" />
                    </div>

                    <div className="relative w-full py-3 pl-10 pr-3 mb-8 bg-black text-white border border-solid border-[#CBE850] rounded-md flex items-center">
                      <div id="ccexp" />
                    </div>

                    <div className="relative w-full py-3 pl-10 pr-3 mb-8 bg-black text-white border border-solid border-[#CBE850] rounded-md flex items-center">
                      <div id="cvv" />
                    </div>

                    <input type="hidden" name="amount" value={formData.amount} />
                    <button
                      type="submit"
                      disabled={formData.isSubmitting}
                      className="w-full border font-extralight border-[#25292f] text-[#CBE850] bg-[#25292f] mt-8 mb-8 px-4 py-4 hover:bg-[#CBE850] hover:text-black transition-colors duration-200 cursor-pointer text-center disabled:opacity-50"
                    >
                      {formData.isSubmitting ? currentSections.cta.processing_msg : currentSections.cta.label}
                    </button>
                  </form>
                  {currentSections.payments.terminos}

                  <div>
                      <Image
                        src="/visa-mastercard-american-express-logo-icons.webp"
                        alt="Credit cards we accept"
                        width={192}
                        height={64}
                        priority
                        className="logo w-48 max-[340px]:w-30 max-md:w-35"
                      />
                    </div>

                </div>

                <div className="bg-[#171b22] p-4 sm:p-6 md:p-12 lg:p-24 flex-[3]">
                  <h3 className="text-xl font-extrabold font-visby-extrabold text-[#d4fc6b] text-left">{currentSections.payments.plan}</h3>
                  <p className="mt-4 mb-8">{currentSections.payments.plan_description}</p>
                  <div className="flex flex-row justify-between border-b border-solid border-white">
                    <h3 className="text-xl font-extrabold font-visby-extrabold text-[#d4fc6b] text-left">
                      {currentSections.payments.plan_total}
                    </h3>
                    <p className="mb-8">{currentSections.payments.plan_price}</p>
                  </div>

                  <p className="mt-8 md:mt-20 mb-4">{currentSections.payments.plan_benefit_title}</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-white font-light text-sm">
                      <span className="text-[rgb(212,252,107)] text-xl">
                        <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                      </span>
                      {currentSections.payments.plan_benefit_description}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Script
        src="https://secure.safewebservices.com/token/Collect.js"
        data-tokenization-key={process.env.NEXT_PUBLIC_TOKENIZATION_KEY || 'default-key'}
        strategy="afterInteractive"
        onLoad={configurePayment}
      />
    </>
  );
}