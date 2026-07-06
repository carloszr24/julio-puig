import { LEAD_SOURCE_LABELS } from '@/lib/leads'
import type { LeadSource } from '@/types'

export type LeadNotificationPayload = {
  full_name: string
  phone: string
  email?: string | null
  source: string
  intent: string
  notes?: string | null
  property_ref?: string | null
  sale_timeline?: string | null
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildSubject(record: LeadNotificationPayload): string {
  const name = record.full_name
  switch (record.source) {
    case 'web_contacto':
      return `Nuevo contacto web: ${name}`
    case 'web_valoracion':
      return `Nueva valoración gratuita: ${name}`
    default:
      return `Nuevo lead: ${name}`
  }
}

function buildEmailContent(record: LeadNotificationPayload) {
  const sourceLabel =
    LEAD_SOURCE_LABELS[record.source as LeadSource] || record.source

  const lines: [string, string][] = [
    ['Nombre', record.full_name],
    ['Teléfono', record.phone],
    ['Email', record.email || 'No indicado'],
    ['Origen', sourceLabel],
    ['Interés', record.intent],
    ['Referencia', record.property_ref || 'No indicado'],
    ['Plazo venta', record.sale_timeline || 'No indicado'],
    ['Mensaje', record.notes || 'No indicado'],
  ]

  const text = ['Nuevo aviso en YMAR Inmobiliaria', '', ...lines.map(([k, v]) => `${k}: ${v}`)].join(
    '\n'
  )

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#1c1917">
      <h2 style="margin:0 0 16px;font-size:18px">Nuevo aviso en la web</h2>
      <table style="border-collapse:collapse;width:100%;max-width:520px">
        ${lines
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px 8px 0;font-weight:600;vertical-align:top;color:#57534e">${escapeHtml(label)}</td>
            <td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(value)}</td>
          </tr>`
          )
          .join('')}
      </table>
    </div>
  `.trim()

  return { text, html, subject: buildSubject(record) }
}

function notificationRecipients(): string[] {
  const raw = process.env.LEADS_NOTIFICATION_EMAIL?.trim() || 'ymarinmobiliaria@gmail.com'
  return raw
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
}

export function isLeadEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && notificationRecipients().length > 0)
}

export async function sendLeadNotificationEmail(
  record: LeadNotificationPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    return { ok: false, error: 'RESEND_API_KEY no configurada' }
  }

  const to = notificationRecipients()
  if (to.length === 0) {
    return { ok: false, error: 'LEADS_NOTIFICATION_EMAIL no configurado' }
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || 'YMAR Inmobiliaria <onboarding@resend.dev>'

  const { text, html, subject } = buildEmailContent(record)
  const body: Record<string, unknown> = {
    from,
    to,
    subject,
    text,
    html,
  }

  if (record.email) {
    body.reply_to = record.email
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('[lead-notification] Resend error:', res.status, err)
    return { ok: false, error: err }
  }

  return { ok: true }
}
