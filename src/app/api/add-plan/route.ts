// app/api/add-plan/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Interfaz actualizada
interface AddPlanParams {
    payment_token: string;
    first_name: string;
    last_name: string;
    email: string;
    recurring: 'add_subscription';
    plan_amount: string;
    plan_id: string;
    start_date: string; // Nuevo campo: YYYYMMDD
}

const SECURITY_KEY = process.env.SECURITY_KEY;

// Validación actualizada
function validateParams(params: AddPlanParams): string | null {
    if (!params.plan_amount || !params.plan_id) {
        return 'Missing required fields: plan_amount or plan_id';
    }

    if (!/^\d+\.\d{2}$/.test(params.plan_amount)) {
        return 'plan_amount must be in format x.xx';
    }

    if (!params.payment_token) {
        return 'Missing required field: payment_token';
    }
    if (!params.first_name) {
        return 'Missing required field: first_name';
    }
    if (!params.last_name) {
        return 'Missing required field: last_name';
    }
    if (!params.email) {
        return 'Missing required field: email';
    }
    if (!SECURITY_KEY) {
        return 'Server configuration error: SECURITY_KEY not set';
    }

    // Validación para start_date (YYYYMMDD)
    if (!params.start_date || !/^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/.test(params.start_date)) {
        return 'start_date is required and must be in YYYYMMDD format';
    }

    return null;
}

export async function POST(request: NextRequest) {
    try {
        const body: AddPlanParams = await request.json();
        body.recurring = 'add_subscription';

        const validationError = validateParams(body);
        if (validationError) {
            return NextResponse.json(
                { error: validationError },
                { status: 400 }
            );
        }

        const formData = new URLSearchParams();
        // formData.append('type', 'sale');
        formData.append('security_key', SECURITY_KEY!);
        formData.append('payment_token', body.payment_token);
        formData.append('first_name', body.first_name);
        formData.append('last_name', body.last_name);
        formData.append('email', body.email);
        formData.append('recurring', body.recurring);
        // formData.append('plan_amount', body.plan_amount);
        formData.append('plan_id', body.plan_id);
        // formData.append('start_date', body.start_date); // Nuevo campo agregado

        console.log('formdata', formData.entries())

        const response = await fetch('https://halarapay.transactiongateway.com/api/transact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        });

        const responseText = await response.text();
        const responseData = new URLSearchParams(responseText);
        const responseCode = responseData.get('response');
        const responseTextValue = responseData.get('responsetext');
        const transactionId = responseData.get('transactionid');

        if (!response.ok || responseCode !== '1') {
            return NextResponse.json(
                {
                    error: 'Failed to add plan',
                    responseCode,
                    responseText: responseTextValue || 'Unknown error',
                },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: responseTextValue || 'Plan added successfully',
            transactionId,
        });
    } catch (error) {
        console.error('Error adding plan:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}