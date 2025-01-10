import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendWelcomeEmail } from '@/lib/resend'

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json(
                { message: 'Invalid email format' },
                { status: 400 }
            )
        }

        const { data: existingEmail } = await supabase
            .from('waitlist')
            .select('email')
            .eq('email', email)
            .single()
        console.log('existing email', existingEmail)
        if (existingEmail) {
            return NextResponse.json(
                { message: 'Email already registered' },
                { status: 409 }
            )
        }

        const { data, error } = await supabase
            .from('waitlist')
            .insert([{
                email,
                created_at: new Date().toISOString(),
                metadata: {
                    userAgent: request.headers.get('user-agent'),
                    source: 'website'
                }
            }])
            .select()

        if (error) throw error

        // Get total count for waitlist position
        const { count } = await supabase
            .from('waitlist')
            .select('*', { count: 'exact' })

        // Send welcome email
        await sendWelcomeEmail(email, count || 1)

        return NextResponse.json(
            {
                message: 'Successfully joined waitlist',
                data,
                position: count
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Waitlist error:', error)
        return NextResponse.json(
            { message: 'Error adding to waitlist' },
            { status: 500 }
        )
    }
}
