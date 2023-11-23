exports.handler = async function (event, context) {
    const { email } = JSON.parse(event.body);
    console.log('Received email:', email);
  
    try {
      // ... (your existing code)
  
      console.log('Email sent successfully');
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      };
    } catch (error) {
      console.error('Failed to send email', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send email' }),
      };
    }
  };
  