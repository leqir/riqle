import { Html, Head, Body, Container, Text, Link, Hr, Section } from '@react-email/components';
import { type MeetingFormat } from '@prisma/client';

interface TutoringAdminNewBookingProps {
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  yearLevel?: string;
  subject?: string;
  goals?: string;
  scheduledAt: Date;
  meetingFormat: MeetingFormat;
  preferredLocation?: string;
  bookingId: string;
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

export default function TutoringAdminNewBooking({
  studentName,
  studentEmail,
  studentPhone,
  yearLevel,
  subject,
  goals,
  scheduledAt,
  meetingFormat,
  preferredLocation,
  bookingId,
}: TutoringAdminNewBookingProps) {
  const adminUrl = `${process.env.NEXT_PUBLIC_URL}/admin/tutoring`;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerTitle}>New Booking Request</Text>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              A new tutoring session has been requested and is pending your confirmation.
            </Text>

            <Section style={detailsBox}>
              <Text style={detailsLabel}>Student Details</Text>
              <Hr style={divider} />
              <Text style={detailRow}>
                <span style={detailKey}>Name</span>
                <br />
                <span style={detailValue}>{studentName}</span>
              </Text>
              <Text style={detailRow}>
                <span style={detailKey}>Email</span>
                <br />
                <span style={detailValue}>{studentEmail}</span>
              </Text>
              {studentPhone && (
                <Text style={detailRow}>
                  <span style={detailKey}>Phone</span>
                  <br />
                  <span style={detailValue}>{studentPhone}</span>
                </Text>
              )}
              {yearLevel && (
                <Text style={detailRow}>
                  <span style={detailKey}>Year Level</span>
                  <br />
                  <span style={detailValue}>{yearLevel}</span>
                </Text>
              )}
              {subject && (
                <Text style={detailRow}>
                  <span style={detailKey}>Subject</span>
                  <br />
                  <span style={detailValue}>{subject}</span>
                </Text>
              )}
              {goals && (
                <Text style={detailRow}>
                  <span style={detailKey}>Goals</span>
                  <br />
                  <span style={detailValue}>{goals}</span>
                </Text>
              )}
            </Section>

            <Section style={detailsBox}>
              <Text style={detailsLabel}>Session Details</Text>
              <Hr style={divider} />
              <Text style={detailRow}>
                <span style={detailKey}>Date &amp; Time</span>
                <br />
                <span style={detailValue}>{formatAest(scheduledAt)} AEST</span>
              </Text>
              <Text style={detailRow}>
                <span style={detailKey}>Format</span>
                <br />
                <span style={detailValue}>
                  {meetingFormat === 'in_person' ? 'In person' : 'Online · Zoom'}
                </span>
              </Text>
              {meetingFormat === 'in_person' && preferredLocation && (
                <Text style={detailRow}>
                  <span style={detailKey}>Preferred Location</span>
                  <br />
                  <span style={detailValue}>{preferredLocation}</span>
                </Text>
              )}
              <Text style={detailRow}>
                <span style={detailKey}>Booking ID</span>
                <br />
                <span style={detailValue}>{bookingId}</span>
              </Text>
            </Section>

            <Section style={ctaSection}>
              <Link href={adminUrl} style={button}>
                Review in Admin →
              </Link>
            </Section>
          </Section>

          <Section style={footer}>
            <Hr style={divider} />
            <Text style={footerText}>Riqle Admin · Internal notification</Text>
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
  backgroundColor: '#1e3a5f',
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
  backgroundColor: '#1e3a5f',
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
