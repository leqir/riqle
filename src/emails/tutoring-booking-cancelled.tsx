import { Html, Head, Body, Container, Text, Link, Hr, Section } from '@react-email/components';

interface TutoringBookingCancelledProps {
  studentName: string;
  scheduledAt: Date;
  reason?: string;
}

function formatAest(date: Date): string {
  return date.toLocaleString('en-AU', {
    timeZone: 'Australia/Sydney',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default function TutoringBookingCancelled({
  studentName,
  scheduledAt,
  reason,
}: TutoringBookingCancelledProps) {
  const bookUrl = `${process.env.NEXT_PUBLIC_URL}/tutoring/book`;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerTitle}>Riqle Tutoring</Text>
          </Section>

          <Section style={content}>
            <Text style={greeting}>Hi {studentName},</Text>

            <Text style={paragraph}>Unfortunately, your tutoring session has been cancelled.</Text>

            <Section style={detailsBox}>
              <Text style={detailsLabel}>Cancelled Session</Text>
              <Hr style={divider} />
              <Text style={detailRow}>
                <span style={detailKey}>Date &amp; Time</span>
                <br />
                <span style={detailValue}>{formatAest(scheduledAt)} AEST</span>
              </Text>
              {reason && (
                <Text style={detailRow}>
                  <span style={detailKey}>Reason</span>
                  <br />
                  <span style={detailValue}>{reason}</span>
                </Text>
              )}
            </Section>

            <Text style={paragraph}>
              You&apos;re welcome to book a new time at your convenience:
            </Text>

            <Section style={ctaSection}>
              <Link href={bookUrl} style={button}>
                Book a new session
              </Link>
            </Section>

            <Text style={paragraph}>If you have any questions, reply to this email.</Text>

            <Text style={paragraph}>
              Apologies for any inconvenience,
              <br />
              Nathanael
            </Text>
          </Section>

          <Section style={footer}>
            <Hr style={divider} />
            <Text style={footerText}>Riqle Tutoring · HSC English Advanced &amp; Extension 1</Text>
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
  backgroundColor: '#0c0a09',
  padding: '20px 0',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '20px',
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

const detailsBox = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  padding: '20px',
  margin: '24px 0',
};

const detailsLabel = {
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 12px 0',
};

const divider = {
  borderColor: '#e0e0e0',
  margin: '12px 0',
};

const detailRow = {
  fontSize: '13px',
  margin: '10px 0',
};

const detailKey = {
  color: '#666666',
  display: 'block',
};

const detailValue = {
  fontWeight: '600',
  color: '#333333',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '24px 0',
};

const button = {
  backgroundColor: '#0c0a09',
  color: '#ffffff',
  padding: '12px 32px',
  borderRadius: '4px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '600',
  display: 'inline-block',
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
