// import { resendClient, sender } from "../lib/resend.js";
// import { createWelcomeEmailTemplate } from "./emailTemplates.js";

// export const sendWellcomeEmail = async (email, name, clientURL) => {
//     const { data, error } = await resendClient.emails.send({
//         from: `${sender.name} <${sender.email}>`,
//        // to: "kana445500@gmail.com", // Sandbox mode allows only this email
//         to:email,
//         subject: "Welcome to ChatApp!",
//         html: createWelcomeEmailTemplate(name, clientURL),
//     });

//     if (error) {
//         console.error("error sending welcome email:", error);
//         throw new Error("Failed to send welcome email");
//     }

//     console.log("welcome email sent successfully", data);
// };
