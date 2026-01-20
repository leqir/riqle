/**
 * Test NextAuth session endpoint
 */

const BASE_URL = 'http://localhost:3001';

async function testSession() {
  try {
    console.log('Testing NextAuth session endpoint...\n');

    // Test session endpoint
    const sessionResponse = await fetch(`${BASE_URL}/api/auth/session`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    console.log('Session Status:', sessionResponse.status);
    const sessionData = await sessionResponse.json();
    console.log('Session Data:', JSON.stringify(sessionData, null, 2));

    // Test providers
    const providersResponse = await fetch(`${BASE_URL}/api/auth/providers`, {
      method: 'GET',
    });

    console.log('\nProviders Status:', providersResponse.status);
    const providersData = await providersResponse.json();
    console.log('Available Providers:', JSON.stringify(providersData, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testSession();
