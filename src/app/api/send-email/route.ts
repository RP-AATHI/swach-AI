import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { alertId, type, message, actionRecommended } = body;

        if (!message || !actionRecommended) {
            return NextResponse.json({ error: 'Missing required alert details.' }, { status: 400 });
        }

        // Generate Ethereal test account (Fake SMTP)
        // In production, you would use standard SMTP credentials from process.env
        let testAccount = await nodemailer.createTestAccount();

        // Create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        const mailOptions = {
            from: '"Swachh-Ayush Command Center" <system@swachh-ayush.local>',
            to: "ward-supervisor@swachh-ayush.local, health-officer@swachh-ayush.local",
            subject: `[${type}] AI Alert: Preventative Action Required (${alertId})`,
            text: `Alert Summary:\n${message}\n\nRecommended Action:\n${actionRecommended}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: ${type === 'CRITICAL' ? '#ef4444' : '#f59e0b'}; padding: 16px; color: white;">
                        <h2 style="margin: 0; font-size: 1.5rem;">🚨 ${type} Alert Triggered</h2>
                        <p style="margin: 4px 0 0 0; opacity: 0.9;">Ref: ${alertId}</p>
                    </div>
                    <div style="padding: 24px; background-color: #f8fafc;">
                        <h3 style="margin-top: 0; color: #334155;">AI Insight Summary</h3>
                        <p style="font-size: 16px; line-height: 1.5; color: #475569;">${message}</p>
                        
                        <div style="margin-top: 24px; padding: 16px; background-color: white; border-left: 4px solid #3b82f6; border-radius: 4px;">
                            <h4 style="margin: 0 0 8px 0; color: #1e293b;">Automated Action Recommendation:</h4>
                            <p style="margin: 0; font-weight: 500; color: #0f172a;">${actionRecommended}</p>
                        </div>
                    </div>
                    <div style="background-color: #1e293b; color: #94a3b8; padding: 12px; text-align: center; font-size: 0.8rem;">
                        This is an automated message from the Swachh-Ayush AI Intelligence Platform.
                    </div>
                </div>
            `,
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);

        return NextResponse.json({
            success: true,
            message: 'Action triggered and email sent successfully.',
            messageId: info.messageId,
            previewUrl: nodemailer.getTestMessageUrl(info) // Ethereal specific: returns a URL to view the fake email
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send action email.' }, { status: 500 });
    }
}
