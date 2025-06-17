import { NextRequest, NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY || '',
    apiSecret: process.env.MAILJET_SECRET_KEY || ''
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, firstName, lastName, transactionId, language } = body;

        if (!email || !firstName || !lastName || !transactionId || !language) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        // Email al cliente
        const clientHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; }
          .logo { text-align: center; margin-bottom: 20px; background-color: #161310; padding: 15px; }
          .header { color: #42492b; text-align: center; }
          .content { background-color: #f0f0f0; padding: 15px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="logo">
            <img src="https://bigdatia.com.co/logo.png" alt="Logo" style="max-width: 200px;">
        </div>
        <h2 class="header">${language === 'es' ? '¡Compra Exitosa!' : 'Purchase Successful!'}</h2>
        <div class="content">
          <p>${language === 'es' ? 'Hola' : 'Hello'} ${firstName} ${lastName},</p>
          <p>${language === 'es' ?
                'Tu suscripción al plan Premium se ha realizado correctamente.' :
                'Your Premium plan subscription has been successfully completed.'}
          </p>
          <p><strong>ID de Transacción / Transaction ID:</strong> ${transactionId}</p>
          <p>${language === 'es' ?
                'Gracias por tu compra. ¡Bienvenido al plan Premium!' :
                'Thank you for your purchase. Welcome to the Premium plan!'}</p>
        </div>
      </body>
      </html>
    `;

        // Email al administrador
        const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; }
          .logo { text-align: center; margin-bottom: 20px; background-color: #161310; padding: 15px; }
          .header { color: #42492b; text-align: center; }
          .content { background-color: #f0f0f0; padding: 15px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="logo">
            <img src="https://bigdatia.com.co/logo.png" alt="Logo" style="max-width: 200px;">
        </div>
        <h2 class="header">Nuevo Suscriptor Premium</h2>
        <div class="content">
          <p>Un nuevo cliente se ha suscrito al plan Premium:</p>
          <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>ID de Transacción:</strong> ${transactionId}</p>
          <p><strong>Idioma:</strong> ${language}</p>
        </div>
      </body>
      </html>
    `;

        // Enviar ambos correos
        await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: 'gerencia@bigdatia.com.co',
                            Name: 'Subscription System'
                        },
                        To: [{ Email: email }],
                        Subject: language === 'es' ? 'Confirmación de Suscripción Premium' : 'Premium Subscription Confirmation',
                        HTMLPart: clientHtml
                    },
                    {
                        From: {
                            Email: 'gerencia@bigdatia.com.co',
                            Name: 'Subscription System'
                        },
                        To: [{ Email: process.env.PAYMENTS_EMAIL }],
                        Subject: 'Nueva Suscripción Premium',
                        HTMLPart: adminHtml
                    }
                ]
            });

        return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            message: 'Error sending emails',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
