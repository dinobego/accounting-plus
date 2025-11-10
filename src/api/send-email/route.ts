import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'dinobegovic6@gmail.com',
      subject: `Nova poruka od ${name}`,
      html: `
        <h2>Nova poruka sa veb sajta</h2>
        <p><strong>Ime:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Poruka:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return Response.json(
      { message: 'Email poslан uspješno!' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Greška pri slanju emaila' },
      { status: 500 }
    );
  }
}
