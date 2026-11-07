export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  from = "SANGALES Corporate <notifications@sangales.com>",
}: SendEmailOptions): Promise<{ success: boolean; messageId?: string }> {
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
          from,
          to,
          subject,
          html,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Transactional email dispatch error:", data);
        return { success: false };
      }
      return { success: true, messageId: data.id };
    } catch (err) {
      console.error("Email service error:", err);
      return { success: false };
    }
  }

  // Graceful local logging when RESEND_API_KEY is not configured
  console.log(`[EMAIL DISPATCH SIMULATION]`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body:\n${html.replace(/<[^>]*>/g, " ").slice(0, 300)}...`);
  return { success: true, messageId: `mock-email-${Date.now()}` };
}

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
  const adminEmail = process.env.NOTIFICATION_EMAIL || "contact@sangales.com";

  const adminHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 4px;">
      <h2 style="color: #142735; border-bottom: 2px solid #C6A66B; padding-bottom: 10px;">New Commercial Enquiry Received</h2>
      <p><strong>Enquiry Reference:</strong> ${enquiry.id}</p>
      <p><strong>Prospect:</strong> ${enquiry.fullName} (${enquiry.email}, ${enquiry.phone})</p>
      <p><strong>Company:</strong> ${enquiry.companyName || "N/A"}</p>
      <p><strong>Nature:</strong> ${enquiry.enquiryType}</p>
      <p><strong>Target Entity:</strong> ${enquiry.businessName || "Sangales Corporate Group"}</p>
      <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #142735; margin: 15px 0;">
        <p style="margin: 0; font-size: 14px; color: #334155;">${enquiry.message}</p>
      </div>
      <p style="font-size: 12px; color: #64748b;">Review and update lead status at <a href="https://www.sangales.com/admin/enquiries">Sangales Admin Portal</a>.</p>
    </div>
  `;

  const ackHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 4px;">
      <h2 style="color: #142735;">Thank you for contacting Sangales Group</h2>
      <p>Dear ${enquiry.fullName},</p>
      <p>We have successfully received your inquiry regarding <strong>${enquiry.enquiryType}</strong> for ${enquiry.businessName || "Sangales – A Group of Companies"}.</p>
      <p>Our corporate leadership desk reviews and responds to every verified business proposal within 24–48 business hours.</p>
      <p style="font-size: 12px; color: #64748b; margin-top: 30px;">Warm regards,<br/><strong>Corporate Communications Desk</strong><br/>SANGALES – A GROUP OF COMPANIES</p>
    </div>
  `;

  await Promise.allSettled([
    sendEmail({
      to: adminEmail,
      subject: `[LEAD] ${enquiry.enquiryType} Enquiry - ${enquiry.fullName}`,
      html: adminHtml,
    }),
    sendEmail({
      to: enquiry.email,
      subject: `Acknowledgement: Your enquiry to Sangales Group`,
      html: ackHtml,
    }),
  ]);
}
