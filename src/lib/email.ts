import nodemailer from "nodemailer";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

/**
 * Universal email dispatcher supporting:
 * 1. Direct Gmail SMTP / standard SMTP (via nodemailer)
 * 2. Resend API (if RESEND_API_KEY is configured)
 * 3. Graceful fallback simulation logger
 */
export async function sendEmail({
  to,
  subject,
  html,
  from,
}: SendEmailOptions): Promise<{ success: boolean; messageId?: string }> {
  // Option 1: Direct SMTP (Gmail SMTP using Google App Password)
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE !== "false", // true for 465, false for 587
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const senderFrom =
        from ||
        process.env.SMTP_FROM ||
        `"Sangale's Group" <${smtpUser}>`;

      const info = await transporter.sendMail({
        from: senderFrom,
        to,
        subject,
        html,
      });

      return { success: true, messageId: info.messageId };
    } catch (smtpErr) {
      console.error("SMTP dispatch error:", smtpErr);
      // Fall through to try other options or graceful log
    }
  }

  // Option 2: Resend API
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: from || "SANGALE'S Corporate <notifications@sangales.com>",
          to,
          subject,
          html,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Resend email dispatch error:", data);
        return { success: false };
      }
      return { success: true, messageId: data.id };
    } catch (err) {
      console.error("Resend service error:", err);
      return { success: false };
    }
  }

  // Graceful local logging when neither SMTP nor Resend is configured
  console.log(`[EMAIL DISPATCH SIMULATION]`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body:\n${html.replace(/<[^>]*>/g, " ").slice(0, 300)}...`);
  return { success: true, messageId: `mock-email-${Date.now()}` };
}

/**
 * Dispatches instant mobile push notifications to the Admin's device.
 * Since the administrator cannot continually check emails or CRM dashboards,
 * this delivers zero-latency alerts directly to their phone via:
 * 1. Telegram Bot (Instant push notification with ring/vibrate sound)
 * 2. WhatsApp Gateway (CallMeBot)
 * 3. Custom Webhook (Discord / Slack / Zapier / Make)
 */
async function sendAdminInstantMobileAlert(enquiry: {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  enquiryType: string;
  businessName?: string;
  message: string;
}) {
  const cleanPhone = enquiry.phone.replace(/[^0-9]/g, "");
  const waTarget = cleanPhone.startsWith("91")
    ? cleanPhone
    : `91${cleanPhone.replace(/^0+/, "")}`;

  // 1. Instant Telegram Push Notification
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChatId = process.env.TELEGRAM_CHAT_ID;

  if (tgToken && tgChatId) {
    try {
      const tgText =
        `🔔 *NEW COMMERCIAL ENQUIRY RECEIVED*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Prospect:* ${enquiry.fullName}\n` +
        `📞 *Phone:* ${enquiry.phone}\n` +
        `✉️ *Email:* ${enquiry.email}\n` +
        `🏢 *Company:* ${enquiry.companyName || "Individual"}\n` +
        `📌 *Category:* ${enquiry.enquiryType}\n` +
        `🎯 *Target Entity:* ${enquiry.businessName || "Sangale's Group"}\n\n` +
        `💬 *Message:*\n"${enquiry.message}"\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👉 [Open Admin CRM](https://www.sangales.com/admin/enquiries)\n` +
        `💬 [One-Click WhatsApp Reply](https://wa.me/${waTarget})`;

      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: tgText,
          parse_mode: "Markdown",
          disable_web_page_preview: true,
        }),
      });
    } catch (tgErr) {
      console.error("Telegram notification error:", tgErr);
    }
  }

  // 2. WhatsApp Direct Alert via CallMeBot (Optional free WhatsApp API)
  const cmbPhone = process.env.CALLMEBOT_PHONE;
  const cmbKey = process.env.CALLMEBOT_API_KEY;

  if (cmbPhone && cmbKey) {
    try {
      const waMsg =
        `*New Lead - Sangale's Group*\n` +
        `Name: ${enquiry.fullName}\n` +
        `Phone: ${enquiry.phone}\n` +
        `Email: ${enquiry.email}\n` +
        `Entity: ${enquiry.businessName || "Sangale's Group"}\n` +
        `Msg: ${enquiry.message}`;

      const cmbUrl = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
        cmbPhone
      )}&text=${encodeURIComponent(waMsg)}&apikey=${encodeURIComponent(cmbKey)}`;

      await fetch(cmbUrl);
    } catch (waErr) {
      console.error("CallMeBot alert error:", waErr);
    }
  }

  // 3. Custom Webhook for Automation (Zapier / Make / Slack / Discord)
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "new_lead_enquiry",
          timestamp: new Date().toISOString(),
          enquiry,
        }),
      });
    } catch (whErr) {
      console.error("Webhook dispatch error:", whErr);
    }
  }
}

/**
 * Handles full notification pipeline for every incoming business lead:
 * 1. Admin Email sent to contact.sangales@gmail.com
 * 2. Automated Confirmation Email sent to the prospect
 * 3. Instant Push / Mobile alert dispatched to Administrator
 */
export async function notifyNewEnquiry(enquiry: {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  enquiryType: string;
  businessName?: string;
  message: string;
}) {
  const adminEmail = process.env.NOTIFICATION_EMAIL || "contact.sangales@gmail.com";

  const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
      <div style="background-color: #142735; padding: 18px 24px; border-radius: 6px; margin-bottom: 20px;">
        <h2 style="color: #ffffff; margin: 0; font-size: 18px; letter-spacing: 0.5px;">SANGALE'S – A GROUP OF COMPANIES</h2>
        <p style="color: #C6A66B; margin: 4px 0 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">New Commercial Enquiry Received</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: bold; color: #64748b; width: 140px;">Prospect:</td>
          <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${enquiry.fullName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Phone:</td>
          <td style="padding: 10px 0; color: #0f172a;"><a href="tel:${enquiry.phone}" style="color: #0f172a; text-decoration: none;">${enquiry.phone}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Email:</td>
          <td style="padding: 10px 0; color: #0f172a;"><a href="mailto:${enquiry.email}" style="color: #0284c7; text-decoration: none;">${enquiry.email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Company / Org:</td>
          <td style="padding: 10px 0; color: #0f172a;">${enquiry.companyName || "N/A (Individual / Retail)"}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Interest Area:</td>
          <td style="padding: 10px 0; color: #0f172a;"><span style="background-color: #f1f5f9; padding: 3px 8px; border-radius: 4px; font-weight: 600;">${enquiry.enquiryType}</span></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Target Entity:</td>
          <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${enquiry.businessName || "Sangale's Group Headquarters"}</td>
        </tr>
      </table>

      <div style="background-color: #f8fafc; padding: 16px; border-left: 4px solid #C6A66B; margin: 20px 0; border-radius: 0 4px 4px 0;">
        <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Client Message / Requirement:</p>
        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${enquiry.message}</p>
      </div>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; display: flex; gap: 12px;">
        <a href="https://www.sangales.com/admin/enquiries" style="display: inline-block; background-color: #142735; color: #ffffff; text-decoration: none; padding: 10px 20px; font-size: 12px; font-weight: bold; letter-spacing: 0.5px; border-radius: 4px;">MANAGE IN ADMIN CRM →</a>
      </div>

      <p style="font-size: 11px; color: #94a3b8; margin-top: 24px; text-align: center;">This notification was automatically dispatched by the Sangale's Group Corporate Portal.</p>
    </div>
  `;

  const ackHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
      <div style="background-color: #142735; padding: 18px 24px; border-radius: 6px; margin-bottom: 20px;">
        <h2 style="color: #ffffff; margin: 0; font-size: 18px;">SANGALE'S – A GROUP OF COMPANIES</h2>
        <p style="color: #C6A66B; margin: 4px 0 0; font-size: 12px; font-weight: 600; text-transform: uppercase;">Corporate Communications Desk</p>
      </div>

      <p style="font-size: 15px; color: #0f172a;">Dear <strong>${enquiry.fullName}</strong>,</p>
      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        Thank you for contacting <strong>Sangale's Group</strong> regarding <strong>${enquiry.enquiryType}</strong> for <strong>${enquiry.businessName || "Sangale's – A Group of Companies"}</strong>.
      </p>
      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        Your inquiry has been logged in our system and forwarded directly to our commercial operations team. A representative will review your requirement and connect with you shortly.
      </p>

      <div style="background-color: #f8fafc; padding: 14px; border-radius: 4px; margin: 20px 0; font-size: 13px; color: #475569;">
        <p style="margin: 0 0 4px 0;"><strong>Direct Contact Desk:</strong></p>
        <p style="margin: 0;">Phone & WhatsApp: <strong>+91 75077 00936</strong></p>
        <p style="margin: 4px 0 0 0;">Official Email: <strong>contact.sangales@gmail.com</strong></p>
      </div>

      <p style="font-size: 13px; color: #64748b; margin-top: 30px; line-height: 1.5;">
        Warm regards,<br/>
        <strong>Commercial Operations &amp; Partnership Desk</strong><br/>
        SANGALE'S – A GROUP OF COMPANIES<br/>
        <a href="https://www.sangales.com" style="color: #0284c7; text-decoration: none;">www.sangales.com</a>
      </p>
    </div>
  `;

  await Promise.allSettled([
    // 1. Dispatch email to Corporate Email (contact.sangales@gmail.com)
    sendEmail({
      to: adminEmail,
      subject: `[LEAD] ${enquiry.enquiryType} Enquiry - ${enquiry.fullName} (${enquiry.businessName || "Sangale's Group"})`,
      html: adminHtml,
    }),
    // 2. Dispatch acknowledgement to prospect
    sendEmail({
      to: enquiry.email,
      subject: `Acknowledgement: Your enquiry to Sangale's Group (${enquiry.businessName || "Commercial Desk"})`,
      html: ackHtml,
    }),
    // 3. Dispatch instant mobile notifications (Telegram / WhatsApp / Webhook)
    sendAdminInstantMobileAlert(enquiry),
  ]);
}
