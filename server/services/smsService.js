// services/smsService.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

let apiKey = null;
let senderId = null;

function initSMS() {
    if (apiKey) return;
    
    apiKey = process.env.BRIQ_API_KEY || 'K75FXq0vWTvzS2Cw';
    senderId = process.env.BRIQ_SENDER_ID || 'CARGOCO';
    
    console.log('📱 SMS Service initialized');
    console.log('  - API Key:', apiKey ? '✅ Present' : '❌ Missing');
    console.log('  - Sender ID:', senderId);
}

function formatPhoneNumber(phone) {
    if (!phone) return null;
    
    let cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.startsWith('0')) {
        cleaned = '255' + cleaned.substring(1);
    } else if (cleaned.match(/^[7][1-9]/)) {
        cleaned = '255' + cleaned;
    } else if (!cleaned.startsWith('255')) {
        cleaned = '255' + cleaned;
    }
    
    return cleaned;
}

function logSMS(phone, message, status, response, endpoint) {
    try {
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        
        const logFile = path.join(logDir, 'sms_log.txt');
        const logEntry = `[${new Date().toISOString()}] ${status} | TO: ${phone} | ENDPOINT: ${endpoint || 'N/A'} | MSG: ${message.substring(0, 50)}...\n`;
        fs.appendFileSync(logFile, logEntry);
    } catch (err) {
        // Silent fail
    }
}

async function sendSMS(phone, message, options = {}) {
    try {
        initSMS();
        
        console.log('📨 SENDING SMS to:', phone);
        console.log('📝 Message length:', message?.length || 0);
        
        // Validation
        if (!apiKey) {
            logSMS(phone, message, 'ERROR - No API Key', null, 'N/A');
            return { success: false, error: 'API key not configured' };
        }
        
        if (!phone) {
            return { success: false, error: 'Phone number is required' };
        }
        
        if (!message) {
            return { success: false, error: 'Message is required' };
        }
        
        const formattedPhone = formatPhoneNumber(phone);
        if (!formattedPhone) {
            return { success: false, error: 'Invalid phone number format' };
        }
        
        // Try the Briq SMS endpoint
        const endpoint = 'https://karibu.briq.tz/v1/message/send-instant';
        
        const requestData = {
            content: message,
            recipients: [formattedPhone],
            sender_id: options.sender || senderId
        };
        
        console.log('🔍 Endpoint:', endpoint);
        
        const response = await axios.post(
            endpoint,
            requestData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': apiKey,
                },
                timeout: 15000
            }
        );
        
        console.log('✅ SMS sent successfully!');
        console.log('📨 Response:', JSON.stringify(response.data, null, 2));
        
        logSMS(formattedPhone, message, 'SENT', response.data, endpoint);
        
        return {
            success: true,
            data: response.data,
            phone: formattedPhone,
            message: 'SMS sent successfully'
        };
    } catch (error) {
        console.error('❌ SMS error:', error.message);
        
        // Log the error
        logSMS(phone, message, 'ERROR', error.message, 'N/A');
        
        // Return a clean error response - NEVER throw
        return {
            success: false,
            error: error.message || 'Failed to send SMS',
            phone: phone,
            details: error.response?.data || null
        };
    }
}

async function sendBulkSMS(recipients, message, options = {}) {
    try {
        const results = [];
        
        for (const phone of recipients) {
            const result = await sendSMS(phone, message, options);
            results.push(result);
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        
        const successful = results.filter(r => r.success).length;
        const failed = results.filter(r => !r.success).length;
        
        return {
            success: true,
            total: recipients.length,
            successful,
            failed,
            results
        };
    } catch (error) {
        console.error('❌ Bulk SMS error:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

module.exports = {
    sendSMS,
    sendBulkSMS,
    formatPhoneNumber
};