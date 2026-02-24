import { Html, Head, Body, Container, Text, Link, Hr, Section } from '@react-email/components';
import { type MeetingFormat } from '@prisma/client';

interface TutoringBookingConfirmedProps {
  studentName: string;
  scheduledAt: Date;
  meetingFormat: MeetingFormat;
  durationMinutes: number;
  meetingLink?: string;
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

export default function TutoringBookingConfirmed({
  studentName,
  scheduledAt,
  meetingFormat,
  durationMinutes,
  meetingLink,
}: TutoringBookingConfirmedProps) {
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

            <Text style={paragraph}>Your tutoring session is confirmed. See you then!</Text>

            <Section style={detailsBox}>
              <Text style={detailsLabel}>Session Details</Text>
              <Hr style={divider} />
              <Text style={detailRow}>
                <span style={detailKey}>Date &amp; Time</span>
                <br />
                <span style={detailValue}>{formatAest(scheduledAt)} AEST</span>
              </Text>
              <Text style={detailRow}>
                <span style={detailKey}>Duration</span>
                <br />
                <span style={detailValue}>{durationMinutes} minutes</span>
              </Text>
              <Text style={detailRow}>
                <span style={detailKey}>Format</span>
                <br />
                <span style={detailValue}>
                  {meetingFormat === 'in_person'
                    ? 'In person · Hurstville, Sydney'
                    : 'Online · Zoom'}
                </span>
              </Text>
              {meetingFormat === 'online' && meetingLink && (
                <Text style={detailRow}>
                  <span style={detailKey}>Zoom Link</span>
                  <br />
                  <Link href={meetingLink} style={link}>
                    {meetingLink}
                  </Link>
                </Text>
              )}
            </Section>

            {meetingFormat === 'in_person' ? (
              <Text style={paragraph}>
                <strong>What to bring:</strong> bring any essays, past papers, or specific questions
                you want to work through. We&apos;ll meet in the Hurstville area — I&apos;ll confirm
                the exact location separately.
              </Text>
            ) : (
              <Text style={paragraph}>
                <strong>Before the session:</strong> make sure Zoom is installed and your camera/mic
                are working. Have any essays or questions ready to share your screen.
              </Text>
            )}

            <Text style={paragraph}>
              If you need to reschedule or cancel, reply to this email at least 24 hours before the
              session.
            </Text>

            <Text style={paragraph}>
              Looking forward to it,
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

const link = {
  color: '#0c0a09',
  textDecoration: 'underline',
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
