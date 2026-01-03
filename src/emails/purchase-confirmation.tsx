import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Hr,
  Section,
  Row,
  Column,
} from '@react-email/components';

interface PurchaseConfirmationProps {
  orderId: string;
  customerName?: string;
  productName: string;
  amount: number;
  currency: string;
  purchaseDate: string;
}

export default function PurchaseConfirmation({
  orderId,
  customerName = 'Valued Customer',
  productName,
  amount,
  currency,
  purchaseDate,
}: PurchaseConfirmationProps) {
  const formattedAmount = (amount / 100).toFixed(2);
  const orderUrl = `${process.env.NEXT_PUBLIC_URL}/account/orders/${orderId}`;

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
              Thank you for your purchase! We&apos;re excited to help you get access to your order.
            </Text>

            {/* Order Details */}
            <Section style={orderBox}>
              <Text style={orderLabel}>Order Confirmation</Text>
              <Hr style={divider} />
              <Row>
                <Column style={labelColumn}>
                  <Text style={label}>Order ID</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{orderId}</Text>
                </Column>
              </Row>
              <Row>
                <Column style={labelColumn}>
                  <Text style={label}>Product</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{productName}</Text>
                </Column>
              </Row>
              <Row>
                <Column style={labelColumn}>
                  <Text style={label}>Amount</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>
                    {currency} ${formattedAmount}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column style={labelColumn}>
                  <Text style={label}>Date</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{purchaseDate}</Text>
                </Column>
              </Row>
            </Section>

            <Text style={paragraph}>
              Your order has been confirmed and is being processed. You can view the full details of
              your order by clicking the button below.
            </Text>

            {/* CTA Button */}
            <Section style={ctaSection}>
              <Link href={orderUrl} style={button}>
                View Order
              </Link>
            </Section>

            <Text style={paragraph}>
              If you have any questions about your order, please don&apos;t hesitate to contact our
              support team.
            </Text>

            <Text style={paragraph}>Best regards,</Text>
            <Text style={paragraph}>The Riqle Team</Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={divider} />
            <Text style={footerText}>Riqle - Professional resources and insights for creators</Text>
            <Text style={footerText}>
              If you have any questions, reply to this email or visit our website.
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

const orderBox = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  padding: '20px',
  margin: '24px 0',
};

const orderLabel = {
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 12px 0',
};

const divider = {
  borderColor: '#e0e0e0',
  margin: '12px 0',
};

const labelColumn = {
  width: '40%',
};

const valueColumn = {
  width: '60%',
};

const label = {
  fontSize: '13px',
  color: '#666666',
  margin: '8px 0',
};

const value = {
  fontSize: '13px',
  fontWeight: '600',
  color: '#333333',
  margin: '8px 0',
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
