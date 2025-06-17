import { NextRequest, NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';

// Initialize Mailjet client
const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY || '',
    apiSecret: process.env.MAILJET_SECRET_KEY || ''
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { phone, name, email, sector, company } = body;

        if (!phone || !name || !email || !sector || !company) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        const htmlMessage = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        color: #161310;
                    }
                    .logo {
                        text-align: center;
                        margin-bottom: 20px;
                        background-color: #161310;
                        padding: 15px;
                    }
                    .title {
                        color: #42492b;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    p {
                        line-height: 1.6;
                    }
                    .data {
                        background-color: #CBE850;
                        padding: 15px;
                        border-radius: 5px;
                        margin: 20px 0;
                    }
                    .data strong {
                        color: #000;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 12px;
                        color: #42492b;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="logo">
                    <img src="https://bigdatia.com.co/logo.png" alt="Logo" style="max-width: 200px;">
                </div>
                
                <h2 class="title">Nueva solicitud de llamada</h2>
                
                <p>Hola! A continuación podrás encontrar los datos que fueron registrados en nuestro formulario. Estamos emocionados de ponernos en contacto contigo:</p>
                
                <div class="data">
                    <p>
                        <strong>Teléfono:</strong> ${phone}<br>
                        <strong>Nombre:</strong> ${name}<br>
                        <strong>Email:</strong> ${email}<br>
                        <strong>Sector:</strong> ${sector}<br>
                        <strong>Compañía:</strong> ${company}
                    </p>
                </div>
                
                <div class="footer">
                    Este es un mensaje automático enviado desde nuestro sitio web.
                </div>
            </body>
            </html>
        `;

        const response = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [{
                    From: {
                        Email: 'gerencia@bigdatia.com.co',
                        Name: 'Contact Form'
                    },
                    To: [{
                        Email: process.env.CONTACT_EMAIL
                    }],
                    Subject: 'New Contact Form Submission',
                    HTMLPart: htmlMessage
                }]
            });
        console.log(JSON.stringify(response.response.data))

        return NextResponse.json({
            message: 'Email sent successfully',
            data: response.body
        }, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            message: 'Error sending email',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
