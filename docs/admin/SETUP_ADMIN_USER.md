# Admin User Setup Guide

## Quick Start: Create Your First Admin User

### Method 1: SQL (Fastest)

Run this SQL in your PostgreSQL database:

```sql
-- 1. Create admin role (if it doesn't exist)
INSERT INTO "Role" (id, name, description, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin',
  'Full administrative access to all system functions',
  NOW(),
  NOW()
)
ON CONFLICT (name) DO NOTHING;

-- 2. Find your user ID (replace with your actual email)
SELECT id, email FROM "User" WHERE email = 'your-email@example.com';

-- 3. Grant admin role to your user
INSERT INTO "UserRole" (id, "userId", "roleId", "createdAt")
VALUES (
  gen_random_uuid(),
  (SELECT id FROM "User" WHERE email = 'your-email@example.com'),
  (SELECT id FROM "Role" WHERE name = 'admin'),
  NOW()
)
ON CONFLICT DO NOTHING;
```

### Method 2: Prisma Studio (Visual)

```bash
# Open Prisma Studio
npx prisma studio

# 1. Go to Role table → Add Record
#    - name: admin
#    - description: Full administrative access to all system functions

# 2. Go to User table → Find your user

# 3. Go to UserRole table → Add Record
#    - Select your User
#    - Select admin Role
```

### Method 3: Node.js Script

Create `scripts/create-admin.ts`:

```typescript
import { db } from '../src/lib/db';
import { grantAdminRole } from '../src/lib/auth/admin';

async function createAdmin() {
  const email = process.argv[2];

  if (!email) {
    console.error('Usage: tsx scripts/create-admin.ts user@example.com');
    process.exit(1);
  }

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error(`User ${email} not found`);
    process.exit(1);
  }

  await grantAdminRole(user.id, user.id);
  console.log(`✅ Admin role granted to ${email}`);
}

createAdmin();
```

Run it:

```bash
npx tsx scripts/create-admin.ts your-email@example.com
```

---

## Verify Admin Access

1. **Sign out** if you're currently logged in
2. **Sign in** with your admin user account
3. Navigate to `/admin`
4. You should see the admin dashboard

If you see an "Unauthorized" page, check that:

- Your user has the admin role in the database
- You're signed in with the correct account
- The session has the `role` field (sign out and sign in again)

---

## Admin Navigation

Once logged in, you'll have access to:

### Content Management

- **Posts** - `/admin/posts` - Manage writing & essays
- **Projects** - `/admin/projects` - Manage work portfolio
- **Startups** - `/admin/startups` - Manage startup showcase
- **Products** - `/admin/products` - Manage resources & products

### Commerce

- **Orders** - `/admin/orders` - View orders & refunds
- **Entitlements** - `/admin/entitlements` - Manage customer access

### System

- **Monitoring** - `/admin/monitoring` - Failed jobs & errors
- **Audit Logs** - `/admin/audit` - All admin actions
- **Email Logs** - `/admin/email-logs` - Email delivery status
- **Cache** - `/admin/cache` - Revalidate pages

---

## Common Tasks

### Publishing Content

1. Go to the relevant content page (posts/projects/startups/products)
2. Click on a draft item
3. Edit and publish (edit forms coming soon)
4. Go to `/admin/cache` and revalidate the relevant path

### Fixing Customer Access Issues

1. Go to `/admin/orders`
2. Find the customer's order
3. Check order status and fulfillment
4. Go to `/admin/entitlements` to verify access was granted
5. Go to `/admin/email-logs` to check if access email was sent

### Monitoring System Health

1. Check dashboard for alerts
2. Go to `/admin/monitoring` for failed jobs
3. Retry or abandon failed jobs as needed
4. Check `/admin/email-logs` for email delivery issues

---

## Security Best Practices

1. **Use a strong password** for your admin account
2. **Don't share admin credentials** - create separate admin accounts
3. **Review audit logs** regularly (`/admin/audit`)
4. **Monitor failed jobs** to catch issues early
5. **Sign out** when done with admin tasks

---

## Troubleshooting

### "Unauthorized" Error

- **Cause**: User doesn't have admin role or not signed in
- **Fix**: Grant admin role via SQL or Prisma Studio, then sign out and sign in

### Dashboard Shows No Data

- **Cause**: No content or orders in database
- **Fix**: This is normal for a new installation

### Failed Jobs Piling Up

- **Cause**: Background job system not configured or service failures
- **Fix**: Review job details, check service status (Stripe, email), retry or abandon

### Cache Not Revalidating

- **Cause**: Invalid path or tag
- **Fix**: Ensure path starts with `/` and tag matches cache configuration

---

## Next Steps

Now that you have admin access:

1. ✅ Verify all pages load correctly
2. ✅ Test content listing (posts/projects/startups/products)
3. ✅ Check orders and entitlements (if any exist)
4. ✅ Review audit logs to see your login
5. ✅ Test cache revalidation

**Ready to build content editing forms?** See `docs/admin/CONTENT_EDITING.md` (coming soon)
