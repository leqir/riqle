import { Html, Head, Body, Container, Text, Link, Hr, Section } from '@react-email/components';

interface AccessInstructionsProps {
  customerName?: string;
  productName: string;
  accessUrl: string;
  instructions?: string;
}

export default function AccessInstructions({
  customerName = 'Valued Customer',
  productName,
  accessUrl,
  instructions,
}: AccessInstructionsProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={headerTitle}>Riqle</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>Hi {customerName},</Text>

            <Text style={paragraph}>
              Great news! Your access to <strong>{productName}</strong> is now ready.
            </Text>

            {/* Access Instructions Box */}
            <Section style={instructionBox}>
              <Text style={instructionTitle}>How to Access Your Content</Text>
              <Hr style={divider} />

              <Text style={step}>
                <strong>Step 1:</strong> Click the button below to access your content
              </Text>

              <Text style={step}>
                <strong>Step 2:</strong> Sign in with your account credentials
              </Text>

              <Text style={step}>
                <strong>Step 3:</strong> Start exploring your new resource!
              </Text>
            </Section>

            {/* CTA Button */}
            <Section style={ctaSection}>
              <Link href={accessUrl} style={button}>
                Access Your Content
              </Link>
            </Section>

            {/* Additional Instructions if provided */}
            {instructions && (
              <>
                <Text style={paragraph}>
                  <strong>Additional Information:</strong>
                </Text>
                <Text style={paragraph}>{instructions}</Text>
              </>
            )}

            {/* Support Info */}
            <Section style={supportBox}>
              <Text style={supportTitle}>Need Help?</Text>
              <Text style={supportText}>
                If you encounter any issues accessing your content or have questions, our support
                team is here to help. Reply to this email or visit our support page.
              </Text>
            </Section>

            <Text style={paragraph}>Best regards,</Text>
            <Text style={paragraph}>The Riqle Team</Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={divider} />
            <Text style={footerText}>Riqle - Professional resources and insights for creators</Text>
            <Text style={footerText}>
              This access is tied to your account. You can manage your content access from your
              account dashboard.
            </Text>
            <Text style={footerText}>{process.env.NEXT_PUBLIC_URL}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f4f4f4',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0',
  marginBottom: '64px',
};

const header = {
  backgroundColor: '#000000',
  padding: '20px 0',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
};

const content = {
  padding: '40px 20px',
};

const greeting = {
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 16px 0',
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#333333',
  margin: '16px 0',
};

const instructionBox = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  padding: '20px',
  margin: '24px 0',
};

const instructionTitle = {
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 12px 0',
};

const step = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#333333',
  margin: '12px 0 12px 0',
};

const divider = {
  borderColor: '#e0e0e0',
  margin: '12px 0',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#000000',
  color: '#ffffff',
  padding: '12px 32px',
  borderRadius: '4px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '600',
  display: 'inline-block',
};

const supportBox = {
  backgroundColor: '#f0f7ff',
  border: '1px solid #d4e6f1',
  borderRadius: '4px',
  padding: '20px',
  margin: '24px 0',
};

const supportTitle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#0056b3',
  margin: '0 0 12px 0',
};

const supportText = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#333333',
  margin: '0',
};

const footer = {
  padding: '20px',
  backgroundColor: '#f9f9f9',
};

const footerText = {
  fontSize: '12px',
  color: '#999999',
  margin: '4px 0',
  textAlign: 'center' as const,
};
