export const paymentsContent = {
  es: {
    payments: {
      title: 'Escribe tu nombre y correo electrónico',
      description: 'Tu pago quedará asociado a este correo. Al completar la compra te pediremos crear una cuenta o iniciar sesión.',
      plan: 'Plan Premium',
      plan_total: 'Total a pagar',
      plan_description: 'Plan mensual con renovación automática cada mes.',
      plan_price: '$24 USD',
      plan_benefit_title: 'Lo que obtienes con el plan',
      plan_benefit_description: 'Tendrás acceso a toda nuestra información exclusiva',
      terminos: (
        <p>
          Al hacer clic en &quot;Continuar&quot; aceptas nuestros{' '}
          <a className="text-[#CBE850] hover:border-b hover:border-solid hover:border-[#CBE850]" href="/terminos-y-condiciones" target="_blank">
            Términos y condiciones
          </a>{' '}
          y{' '}
          <a className="text-[#CBE850] hover:border-b hover:border-solid hover:border-[#CBE850]" href="/politica-de-devoluciones" target="_blank">
            Políticas de devoluciones
          </a>.
        </p>
      ),
      placeholders: {
        firstName: 'Nombre',
        lastName: 'Apellido',
        email: 'Correo electrónico',
      },
      successMessage: '¡Suscripción creada exitosamente! ID de transacción: {transactionId}',
      errorMessages: {
        requiredFields: 'Por favor, completa todos los campos requeridos',
        paymentSystemNotLoaded: 'Error: El sistema de pago aún no está cargado',
        noPaymentToken: 'No se recibió un token de pago',
        genericError: 'Ocurrió un error',
      },
    },
    cta: {
      label: 'Continuar',
      link: '/contacto',
      processing_msg: 'Procesando...',
    },
  },
  en: {
    payments: {
      title: 'Enter your name and email address',
      description: 'Your payment will be associated with this email. When you complete the purchase we will ask you to create an account or log in.',
      plan: 'Premium Plan',
      plan_total: 'Total',
      plan_description: 'Monthly plan with automatic renewal every month.',
      plan_price: '$24 USD',
      plan_benefit_title: 'What you get with the plan',
      plan_benefit_description: 'You will have access to all our exclusive information',
      terminos: (
        <p>
          By clicking &quot;Continue&quot; you accept our{' '}
          <a className="text-[#CBE850] hover:border-b hover:border-solid hover:border-[#CBE850]" href="/terms-and-conditions" target="_blank">
            Terms and Conditions
          </a>{' '}
          and{' '}
          <a className="text-[#CBE850] hover:border-b hover:border-solid hover:border-[#CBE850]" href="/refunds-policy" target="_blank">
            Refund Policies
          </a>.
        </p>
      ),
      placeholders: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
      },
      successMessage: 'Subscription created successfully! Transaction ID: {transactionId}',
      errorMessages: {
        requiredFields: 'Please fill in all required fields',
        paymentSystemNotLoaded: 'Error: Payment system not loaded yet',
        noPaymentToken: 'No payment token received',
        genericError: 'An error occurred',
      },
    },
    cta: {
      label: 'Continue',
      link: '/contact',
      processing_msg: 'Processing...',
    },
  },
};