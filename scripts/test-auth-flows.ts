/**
 * Comprehensive Authentication Flow Testing Script
 *
 * Tests all authentication endpoints and flows:
 * 1. Login with existing user
 * 2. Signup with new user
 * 3. Email verification
 * 4. Password reset flow
 * 5. Invalid credentials handling
 */

const BASE_URL = 'http://localhost:3001';

interface TestResult {
  test: string;
  status: 'PASS' | 'FAIL';
  details?: string;
  response?: any;
}

const results: TestResult[] = [];

function logResult(result: TestResult) {
  results.push(result);
  const icon = result.status === 'PASS' ? '✅' : '❌';
  console.log(`${icon} ${result.test}`);
  if (result.details) {
    console.log(`   ${result.details}`);
  }
  console.log('');
}

async function testLogin(email: string, password: string, shouldSucceed: boolean = true) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/callback/credentials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (shouldSucceed) {
      if (response.ok) {
        logResult({
          test: `Login with ${email}`,
          status: 'PASS',
          details: 'Login successful',
          response: data,
        });
      } else {
        logResult({
          test: `Login with ${email}`,
          status: 'FAIL',
          details: `Expected success but got: ${JSON.stringify(data)}`,
        });
      }
    } else {
      if (!response.ok) {
        logResult({
          test: `Login rejection for ${email}`,
          status: 'PASS',
          details: 'Correctly rejected invalid credentials',
        });
      } else {
        logResult({
          test: `Login rejection for ${email}`,
          status: 'FAIL',
          details: 'Should have rejected but succeeded',
        });
      }
    }
  } catch (error) {
    logResult({
      test: `Login with ${email}`,
      status: 'FAIL',
      details: `Error: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
}

async function testSignup(email: string, password: string, name: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (response.ok) {
      logResult({
        test: `Signup with ${email}`,
        status: 'PASS',
        details: data.message,
        response: data,
      });
    } else {
      // Check if it's expected failure (email already exists)
      if (response.status === 409 && data.error === 'Email already registered') {
        logResult({
          test: `Signup with ${email}`,
          status: 'PASS',
          details: 'Correctly rejected duplicate email',
        });
      } else {
        logResult({
          test: `Signup with ${email}`,
          status: 'FAIL',
          details: `Error: ${data.error}`,
        });
      }
    }
  } catch (error) {
    logResult({
      test: `Signup with ${email}`,
      status: 'FAIL',
      details: `Error: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
}

async function testPasswordValidation() {
  const weakPasswords = [
    { password: '12345', reason: 'too short' },
    { password: 'abcdefgh', reason: 'no uppercase or number' },
    { password: 'ABCDEFGH', reason: 'no lowercase or number' },
    { password: 'Abcdefgh', reason: 'no number' },
  ];

  for (const { password, reason } of weakPasswords) {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: `test-${Date.now()}@example.com`,
          password,
          name: 'Test User',
        }),
      });

      const data = await response.json();

      if (response.status === 400 && data.error) {
        logResult({
          test: `Password validation - ${reason}`,
          status: 'PASS',
          details: `Correctly rejected: ${data.error}`,
        });
      } else {
        logResult({
          test: `Password validation - ${reason}`,
          status: 'FAIL',
          details: 'Weak password should have been rejected',
        });
      }
    } catch (error) {
      logResult({
        test: `Password validation - ${reason}`,
        status: 'FAIL',
        details: `Error: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  }
}

async function testForgotPassword(email: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    // Should always return 200 to prevent email enumeration
    if (response.ok) {
      logResult({
        test: `Forgot password for ${email}`,
        status: 'PASS',
        details: data.message,
      });
    } else {
      logResult({
        test: `Forgot password for ${email}`,
        status: 'FAIL',
        details: `Unexpected status: ${response.status}`,
      });
    }
  } catch (error) {
    logResult({
      test: `Forgot password for ${email}`,
      status: 'FAIL',
      details: `Error: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
}

async function checkPageExists(path: string, pageName: string) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'GET',
      redirect: 'manual',
    });

    if (response.status === 200 || response.status === 0) {
      logResult({
        test: `Page exists: ${pageName}`,
        status: 'PASS',
        details: `${path} is accessible`,
      });
    } else if (response.status === 404) {
      logResult({
        test: `Page exists: ${pageName}`,
        status: 'FAIL',
        details: `${path} returns 404`,
      });
    } else {
      logResult({
        test: `Page exists: ${pageName}`,
        status: 'PASS',
        details: `${path} returns ${response.status} (may be redirect)`,
      });
    }
  } catch (error) {
    logResult({
      test: `Page exists: ${pageName}`,
      status: 'FAIL',
      details: `Error: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
}

async function runAllTests() {
  console.log('='.repeat(60));
  console.log('AUTHENTICATION SYSTEM TEST SUITE');
  console.log('='.repeat(60));
  console.log('\n');

  console.log('📄 TESTING PAGE ACCESSIBILITY');
  console.log('-'.repeat(60));
  await checkPageExists('/login', 'Login Page');
  await checkPageExists('/signup', 'Signup Page');
  await checkPageExists('/forgot-password', 'Forgot Password Page');
  await checkPageExists('/verify-email', 'Verify Email Page');
  await checkPageExists('/reset-password', 'Reset Password Page');

  console.log('\n🔐 TESTING LOGIN FLOW');
  console.log('-'.repeat(60));
  await testLogin('nathanael.thie@gmail.com', 'TempPassword123', true);
  await testLogin('admin@riqle.com', 'AdminPassword123', true);
  await testLogin('nathanael.thie@gmail.com', 'wrongpassword', false);
  await testLogin('nonexistent@example.com', 'Password123', false);

  console.log('\n📝 TESTING SIGNUP FLOW');
  console.log('-'.repeat(60));
  await testSignup('nathanael.thie@gmail.com', 'TestPassword123', 'Test User');
  const newEmail = `test-${Date.now()}@example.com`;
  await testSignup(newEmail, 'ValidPassword123', 'New Test User');

  console.log('\n🔒 TESTING PASSWORD VALIDATION');
  console.log('-'.repeat(60));
  await testPasswordValidation();

  console.log('\n🔑 TESTING FORGOT PASSWORD');
  console.log('-'.repeat(60));
  await testForgotPassword('nathanael.thie@gmail.com');
  await testForgotPassword('nonexistent@example.com');

  // Summary
  console.log('\n');
  console.log('='.repeat(60));
  console.log('TEST SUMMARY');
  console.log('='.repeat(60));

  const passed = results.filter((r) => r.status === 'PASS').length;
  const failed = results.filter((r) => r.status === 'FAIL').length;
  const total = results.length;

  console.log(`Total Tests: ${total}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);

  if (failed > 0) {
    console.log('\n⚠️  Failed Tests:');
    results
      .filter((r) => r.status === 'FAIL')
      .forEach((r) => {
        console.log(`  - ${r.test}: ${r.details}`);
      });
  }

  console.log('\n');
}

// Run tests
runAllTests().catch(console.error);
