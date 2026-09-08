const axios = require('axios');

// Messaging Service API V2 Configuration - INTERNET SMS
// NOTE: these are no longer captured as module-level constants, because doing so
// locks in whatever process.env looked like at require() time. If this file gets
// required before dotenv.config() runs (as was happening in server.js), that
// captured value is permanently undefined for the life of the process, even
// after dotenv.config() later populates process.env correctly.
function getConfig() {
  return {
    token: process.env.MESSAGING_API_TOKEN,
    baseUrl: process.env.MESSAGING_BASE_URL || 'https://messaging-service.co.tz',
    senderId: process.env.MESSAGING_SENDER_ID || 'POS'
  };
}

/**
 * Send SMS to customer's mobile phone (Internet SMS)
 * This sends a normal SMS that appears in the customer's phone SMS inbox
 */
async function sendSMS(phone, message, options = {}) {
  const { token: MESSAGING_API_TOKEN, baseUrl: MESSAGING_BASE_URL, senderId: MESSAGING_SENDER_ID } = getConfig();

  try {
    // Validate inputs
    if (!phone) {
      throw new Error('Phone number is required');
    }
    if (!message) {
      throw new Error('Message is required');
    }

    // Check if token is configured
    if (!MESSAGING_API_TOKEN) {
      console.error('❌ API Token is missing!');
      console.error('💡 Get your token from: Customer Info → Customization → API Keys');
      throw new Error('API Token not configured. Please check your .env file.');
    }

    // Format phone number (E.164 format - 255XXXXXXXX)
    let formattedPhone = phone.replace(/\s/g, '').replace(/^\+/, '');
    if (!formattedPhone.startsWith('255')) {
      formattedPhone = formattedPhone.replace(/^0/, '255');
    }
    
    console.log('📱 Sending SMS to:', formattedPhone);
    console.log('📝 Message:', message.substring(0, 50) + (message.length > 50 ? '...' : ''));

    // Prepare request for Internet SMS
    const requestData = {
      from: options.sender || MESSAGING_SENDER_ID || 'POS',
      to: formattedPhone,
      text: message,
      flash: 0 // 0 = normal SMS
    };

    // Add optional parameters
    if (options.reference) requestData.reference = options.reference;
    if (options.date) requestData.date = options.date;
    if (options.time) requestData.time = options.time;

    console.log('📨 Sending via Internet SMS endpoint');
    console.log('🔑 Using token:', MESSAGING_API_TOKEN.substring(0, 10) + '...');

    // Send via Internet SMS endpoint
    const response = await axios.post(
      `${MESSAGING_BASE_URL}/api/sms/v2/text/single`,
      requestData,
      {
        headers: {
          'Authorization': `Bearer ${MESSAGING_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 15000
      }
    );

    const result = response.data;
    
    if (result.messages && result.messages.length > 0) {
      const msg = result.messages[0];
      console.log('✅ SMS sent successfully!');
      console.log('📊 Message ID:', msg.messageId);
      console.log('📊 Status:', msg.status?.name || 'Unknown');
      console.log('📊 Price:', msg.price, 'credits');
      
      return {
        success: true,
        messageId: msg.messageId,
        status: msg.status,
        smsCount: msg.smsCount || 1,
        price: msg.price || 0,
        phone: formattedPhone,
        data: result
      };
    } else {
      return {
        success: false,
        error: 'Unexpected response format',
        data: result
      };
    }

  } catch (error) {
    let errorMessage = 'Failed to send SMS';
    let errorDetails = {};

    if (error.response) {
      console.error('❌ API Error:', {
        status: error.response.status,
        data: error.response.data
      });
      
      if (error.response.status === 401) {
        errorMessage = 'Authentication failed! Your API token is invalid or expired.';
        errorDetails = {
          status: 401,
          message: 'Get a new token from: Customer Info → Customization → API Keys',
          data: error.response.data
        };
      } else {
        errorMessage = error.response.data?.message || error.response.data?.error || 'API error';
        errorDetails = error.response.data;
      }
    } else if (error.request) {
      errorMessage = 'No response from API. Check your network connection.';
    } else {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
      details: errorDetails,
      phone: phone
    };
  }
}

/**
 * Send test SMS (NO authentication required, NO real SMS sent)
 * Uses the test endpoint - perfect for development/testing
 */
async function sendTestSMS(phone, message) {
  const { baseUrl: MESSAGING_BASE_URL, senderId: MESSAGING_SENDER_ID } = getConfig();

  try {
    if (!phone || !message) {
      throw new Error('Phone and message are required');
    }

    let formattedPhone = phone.replace(/\s/g, '').replace(/^\+/, '');
    if (!formattedPhone.startsWith('255')) {
      formattedPhone = formattedPhone.replace(/^0/, '255');
    }

    console.log('🧪 TEST MODE - No real SMS will be sent');
    console.log('📱 To:', formattedPhone);
    console.log('📝 Message:', message);

    // Test endpoint - NO AUTH required!
    const response = await axios.post(
      `${MESSAGING_BASE_URL}/api/sms/v2/test/text/single`,
      {
        from: MESSAGING_SENDER_ID || 'POS',
        to: formattedPhone,
        text: message,
        flash: 0
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 15000
      }
    );

    console.log('✅ Test successful! (No real SMS sent)');
    
    return {
      success: true,
      isTest: true,
      data: response.data,
      phone: formattedPhone,
      note: 'Test mode - No real SMS was sent. Get your API token to send real SMS.'
    };

  } catch (error) {
    console.error('❌ Test failed:', error);
    return {
      success: false,
      error: error.message || 'Test failed',
      isTest: true
    };
  }
}

/**
 * Send SMS via link (GET method)
 * Alternative method using URL parameters
 */
async function sendSMSViaLink(phone, message) {
  const { token: MESSAGING_API_TOKEN, baseUrl: MESSAGING_BASE_URL, senderId: MESSAGING_SENDER_ID } = getConfig();

  try {
    if (!phone || !message) {
      throw new Error('Phone and message are required');
    }

    let formattedPhone = phone.replace(/\s/g, '').replace(/^\+/, '');
    if (!formattedPhone.startsWith('255')) {
      formattedPhone = formattedPhone.replace(/^0/, '255');
    }

    if (!MESSAGING_API_TOKEN) {
      throw new Error('API Token is required for sending via link');
    }

    const encodedMessage = encodeURIComponent(message);
    const url = `${MESSAGING_BASE_URL}/link/sms/v2/text/single?token=${MESSAGING_API_TOKEN}&from=${MESSAGING_SENDER_ID}&to=${formattedPhone}&text=${encodedMessage}`;
    
    console.log('📨 Sending SMS via link');

    const response = await axios.get(url, {
      timeout: 15000
    });

    const result = response.data;
    
    if (result.messages && result.messages.length > 0) {
      const msg = result.messages[0];
      console.log('✅ SMS sent via link successfully:', msg.messageId);
      return {
        success: true,
        messageId: msg.messageId,
        status: msg.status,
        phone: formattedPhone
      };
    } else {
      return {
        success: false,
        error: 'Unexpected response format',
        data: result
      };
    }

  } catch (error) {
    console.error('❌ SMS via link failed:', error);
    return {
      success: false,
      error: error.message || 'Failed to send SMS via link'
    };
  }
}

module.exports = {
  sendSMS,           // Real SMS - requires valid token
  sendTestSMS,       // Test mode - no token required, no real SMS
  sendSMSViaLink     // Alternative method using GET
};