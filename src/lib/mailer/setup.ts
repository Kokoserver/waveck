import nodemailer from 'nodemailer';
import {
	SMTP_USERNAME,
	SMTP_PASSWORD,
	SMTP_HOST,
	SMTP_PORT
} from '$env/static/private';

export const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: SMTP_PORT,
	secure: false,
	auth: {
		user: SMTP_USERNAME,
		pass: SMTP_PASSWORD
	}
});
