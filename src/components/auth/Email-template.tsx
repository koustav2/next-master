import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  verificationCode ?: string;
  
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  verificationCode,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <h2>Your otp for email verification  is: {verificationCode}</h2>
  </div>
);
