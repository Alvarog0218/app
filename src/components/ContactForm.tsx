'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { contactFormContent } from '../lib/contactFormContent';

const ContactForm: React.FC = () => {

    const { language } = useContext(LanguageContext);

    const formContent = contactFormContent[language].find(
        (section) => section.id === 'contact'
    );

    const [formData, setFormData] = useState({
        countryCode: '+57',
        phone: '',
        name: '',
        email: '',
        sector: '',
        company: '',
    });

    const countryOptions = [
        { code: '+57', name: 'Colombia', flag: '🇨🇴' },
        { code: '+1', name: 'United States', flag: '🇺🇸' },
    ];

    const validatePhoneNumber = (phone: string) => {
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length === 10;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePhoneNumber(formData.phone)) {
            alert('Por favor, ingresa un número de teléfono válido de 10 dígitos');
            return;
        }

        const fullPhoneNumber = `${formData.countryCode}${formData.phone.replace(/\D/g, '')}`;
        const submissionData = {
            phone: fullPhoneNumber,
            name: formData.name,
            email: formData.email,
            sector: formData.sector,
            company: formData.company,
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                alert('Formulario enviado con éxito!');
                setFormData({
                    countryCode: '+57',
                    phone: '',
                    name: '',
                    email: '',
                    sector: '',
                    company: '',
                });
            } else {
                alert('Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error al enviar el formulario');
        }
    };

    if (!formContent) return null; // Por seguridad, en caso de que no exista

    return (
        <div className="min-h-screen bg-black flex items-start justify-center p-4">
            <div className="relative w-full bg-gradient-to-br from-[#42492b] to-[#161310] rounded-2xl overflow-visible">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                    {/* Form Column */}
                    <div className="p-8">
                        <h3
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#fff',
                                marginBottom: '20px'
                            }}>{formContent.title}</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Phone Number with Country Selector */}
                            <div>
                                <label className="text-white block mb-1">
                                {formContent.phone_number} <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-col md:flex-row gap-2">
                                    <select
                                        value={formData.countryCode}
                                        onChange={(e) =>
                                            setFormData({ ...formData, countryCode: e.target.value })
                                        }
                                        className="bg-transparent border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-[#CBE850] w-24"
                                        required
                                    >
                                        {countryOptions.map((country) => (
                                            <option key={country.code} value={country.code} className="text-black">
                                                {country.flag} {country.code}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                        className="flex-1 bg-transparent border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-[#CBE850]"
                                        placeholder="3121234567"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Otros campos */}
                            {[
                                { name: 'name', label: formContent.name, type: 'text' },
                                { name: 'email', label: formContent.email, type: 'email' },
                                { name: 'sector', label: formContent.sector, type: 'text' },
                                { name: 'company', label: formContent.company, type: 'text' },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="text-white block mb-1">
                                        {field.label} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name as keyof typeof formData]}
                                        onChange={(e) =>
                                            setFormData({ ...formData, [field.name]: e.target.value })
                                        }
                                        className="w-full bg-transparent border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-[#CBE850]"
                                        required
                                    />
                                </div>
                            ))}

                            <button
                                type="submit"
                                className="w-full bg-[#CBE850] text-black rounded-[8px] px-4 py-2 hover:bg-[#D4FC69] hover:text-black transition-colors duration-200 cursor-pointer"
                            >
                                {formContent.cta}
                            </button>
                        </form>
                    </div>

                    {/* Image Column */}
                    <Image
                        src="/how_it_works.png"
                        alt="Floating image"
                        width={248}
                        height={440}
                        className="absolute top-[100px] -right-[100px] max-w-none hidden md:block"
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactForm;