import React, { useState } from 'react';
import { BsFillEnvelopeHeartFill } from 'react-icons/bs';
import axios from 'axios';

const EmailForm = () => {
    const [emailData, setEmailData] = useState({
        emailEmail: '',
        emailName: '',
        emailSubject: '',
        emailMessage: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/sendEmail', emailData)
            .then(response => {
                console.log('Email sent successfully:', response);
                // Handle success if needed
            })
            .catch(error => {
                console.error('Failed to send email:', error);
                // Handle error if needed
            });
    }

    const handleChange = (event) => {
        setEmailData({
            ...emailData,
            [event.target.name]: event.target.value
        });
    }

    return (
        <form id='contact-grid' method='POST' onSubmit={handleSubmit}>
            <label htmlFor='emailName'>Your Name</label>
            <input type='text' className='email-textinput' id='email-name' name='emailName' placeholder='Name (min 2 characters)' required minLength={2} onChange={handleChange} />
            <label htmlFor='emailEmail'>Your Email</label>
            <input type='text' className='email-textinput' id='email-email' name='emailEmail' placeholder='Email (min 5 characters)' required minLength={5} onChange={handleChange} />
            <label htmlFor='emailMessage'>Your Message</label>
            <input type='text' className='email-textinput' id='email-subject' name='emailSubject' placeholder='Subject (min 5 characters)' required minLength={5} onChange={handleChange} />
            <label htmlFor='emailMessage'>Your Subject</label>
            <textarea id='email-message' name='emailMessage' placeholder='Message (min 10 characters)' required minLength={10}></textarea>
            <button type='submit' id='email-submit' ><BsFillEnvelopeHeartFill />Send Email<BsFillEnvelopeHeartFill /></button>
        </form>
    );
}

export default EmailForm;