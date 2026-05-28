import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, email, projectType, message, locale } = body

    if (!name || !company || !email || !projectType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // ── Send email via Resend (recommended) ───────────────────────
    // Uncomment and configure when RESEND_API_KEY is set
    /*
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'SORA Website <noreply@sorafusion.com>',
      to: 'info@sorafusion.com',
      subject: `Nuevo diagnóstico técnico — ${company} (${projectType})`,
      html: `
        <h2>Solicitud de diagnóstico técnico</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tipo de proyecto:</strong> ${projectType}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Enviado desde sorafusion.com (${locale})</small></p>
      `,
    })
    */

    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submission:', { name, company, email, projectType, message, locale })
    }

    return NextResponse.json({ success: true, message: 'Message received' }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
