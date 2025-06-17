export const translations = {
  es: {
    sections: ['inicio', 'conocenos', 'terminos_condiciones'],
    about_us: {
      title: 'Conócenos',
      name: 'Nombre',
      surname: 'Apellidos',
      message: 'Mensaje',
      send: 'Enviar',
    },
    terms_conditions: 'Términos y condiciones',
    navigation: {
      next: 'Ir',
      prev: 'Atrás',
    },
    menu: {
      product: 'Producto',
      successCases: 'Casos de éxito',
      support: 'Soporte',
      pricing: 'Precios',
      productSubmenu: ['Características', 'Beneficios', 'Demo'],
      successCasesSubmenu: ['Clientes', 'Testimonios', 'Estudios'],
      supportSubmenu: ['FAQ', 'Documentación', 'Contacto'],
    },
    secondaryMenu: {
      home: 'Inicio',
      nosotros: 'Nosotros',
      aboutUs: 'Nosotros',
      misionVision: 'Misión - Visión',
      businessUnits: 'Servicios',
      howItWorks: 'Cómo funciona',
      whyChooseUs: 'Por qué elegirnos',
      faqs: 'Preguntas frecuentes',
      payments: 'Pagos',
    },
    buttons: {
      login: 'Iniciar sesión',
      createAccount: 'Crear una cuenta',
      back: "Volver", // Nueva entrada
    },
  },
  en: {
    sections: ['home', 'about_us', 'terms_conditions'],
    about_us: {
      title: 'Get to know us',
      name: 'Name',
      surname: 'Surname',
      message: 'Message',
      send: 'Send',
    },
    terms_conditions: 'Terms and Conditions',
    navigation: {
      next: 'Go',
      prev: 'Prev',
    },
    menu: {
      product: 'Product',
      successCases: 'Success Cases',
      support: 'Support',
      pricing: 'Pricing',
      productSubmenu: ['Features', 'Benefits', 'Demo'],
      successCasesSubmenu: ['Clients', 'Testimonials', 'Studies'],
      supportSubmenu: ['FAQ', 'Documentation', 'Contact'],
    },
    secondaryMenu: {
      home: 'Home',
      nosotros: 'About Us',
      aboutUs: 'About Us',
      misionVision: 'Mission - Vision',
      businessUnits: 'Services',
      howItWorks: 'How it works',
      whyChooseUs: 'Why choose us',
      faqs: 'Frequently Asked Questions',
      payments: 'Payments',
    },
    buttons: {
      login: 'Login',
      createAccount: 'Create an account',
      back: "Back", // Nueva entrada
    },
  },
};

export const mediaFiles = {
  es: {
    firstVideo: '/primer-video-es.mp4',
    secondVideo: '/segundo-video.mp4',
    backgroundImage: '/bg.webp',
    mobileBackground: '/video-1-es.gif',
    secondMobileBackground: '/video-2-es.gif',
    introText: (
      <div className="flex flex-col text-center" >
        <p className="text-white font-visby-heavy max-sm:text-4xl max-lg:text-[4rem] text-8xl">Lleva tu empresa</p>
        <p className="text-white font-visby-heavy max-sm:text-4xl max-lg:text-[4rem] text-8xl min-md:self-end">a otro</p>
        <p className="text-[#CBE850] uppercase max-sm:text-8xl max-lg:text-[12rem] text-[19rem] font-visby-heavy leading-none">nivel </p>
      </div>
    ),
  },
  en: {
    firstVideo: '/primer-video-en.mp4',
    secondVideo: '/segundo-video-en.mp4',
    backgroundImage: '/bg.webp',
    mobileBackground: '/video-1-en.gif',
    secondMobileBackground: '/video-2-en.gif',
    introText: (
      <div className="flex flex-col text-center" >
        <p className="text-white font-visby-heavy max-sm:text-4xl max-lg:text-[4rem] text-8xl">Take your business</p>
        <p className="text-white font-visby-heavy max-sm:text-4xl max-lg:text-[4rem] text-8xl min-md:self-end">to the next</p>
        <p className="text-[#CBE850] uppercase max-sm:text-8xl max-lg:text-[12rem] text-[19rem] font-visby-heavy leading-none">level</p>
      </div>
    ),
  },
};