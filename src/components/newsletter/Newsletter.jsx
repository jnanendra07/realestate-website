import React, { useState } from 'react';
import classes from './newsletter.module.css';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSend = async () => {
    console.log('Sending email:', email);
  
    try {
      const response = await axios.post('/.netlify/functions/sendEmail', { email });
      console.log('Response:', response);
  
      if (response.status === 200) {
        console.log('Email sent successfully!');
        alert('Email sent successfully!');
      } else {
        console.error('Failed to send email. Unexpected status code:', response.status);
        alert('Failed to send email. Please try again later.');
      }
    } catch (error) {
      console.error('Failed to send email', error);
      alert('Failed to send email. Please try again later.');
    }
  };
  

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Want to get the latest offers?</h5>
          <h2>Send us your email and we will do the rest!</h2>
        </div>
        <div className={classes.inputContainer}>
          <input
            type="email"
            placeholder="Type email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FiSend className={classes.sendIcon} onClick={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
