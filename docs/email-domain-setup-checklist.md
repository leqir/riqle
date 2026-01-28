# Email Domain Setup Checklist

## DNS Records Required

### SPF Record (prevents spoofing)
```
TXT @ "v=spf1 include:_spf.resend.com ~all"
```

### DKIM Record (email authentication)
```
TXT resend._domainkey "p=<public-key>"
```

### DMARC Record (email policy)
```
TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:hello@yourdomain.com"
```

## Verification Steps

1. Add DNS records via domain registrar
2. Verify domain in email service (Resend/SendGrid)
3. Send test email to yourself
4. Check spam score (mail-tester.com)
5. Verify sender identity displays correctly

## Success Criteria

- [ ] Emails land in inbox (not spam)
- [ ] Sender shows as "Your Name <hello@yourdomain.com>"
- [ ] Reply-to works correctly
- [ ] No security warnings in Gmail/Outlook

## Testing

Send test emails to:
- Gmail account
- Outlook/Hotmail account
- Corporate email (if available)

Check that all display correctly and don't go to spam.
