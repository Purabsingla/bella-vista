import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    console.log("Contact form data:", { name, email, subject, message });

    // create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use SMTP
      auth: {
        user: process.env.SMTP_USER, // your gmail/SMTP user
        pass: process.env.SMTP_PASS, // your app password
      },
    });

    // send mail
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "yourrestaurant@gmail.com", // where you receive contact messages
      subject: `Contact Form: ${subject}`,
      text: message,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (err) {
    console.error("Error sending message:", err);
    return NextResponse.json(
      { success: false, message: "Failed to send message." },
      { status: 500 }
    );
  }
}
