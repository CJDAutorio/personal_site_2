import React, { useState } from 'react';
import { BsFillEnvelopeHeartFill } from 'react-icons/bs';
import axios from 'axios';
import DOMPurify from 'dompurify';

const EmailForm = () => {
    const [emailData, setEmailData] = useState({
        emailEmail: '',
        emailName: '',
        emailSubject: '',
        emailMessage: ''
    });
    const [formErrors, setFormErrors] = useState({
        isEmailInvalid: false,
        isEmailEmpty: false,
        isNameEmpty: false,
        isSubjectEmpty: false,
        isMessageEmpty: false
    });

    function validateInputs() {
        if (!emailData.emailEmail) {
            setFormErrors({ ...formErrors, isEmailEmpty: true });
            return false;
        }
        if (!emailData.emailName) {
            setFormErrors({ ...formErrors, isNameEmpty: true });
            return false;
        }
        if (!emailData.emailSubject) {
            setFormErrors({ ...formErrors, isSubjectEmpty: true });
            return false;
        }
        if (!emailData.emailMessage) {
            setFormErrors({ ...formErrors, isMessageEmpty: true });
            return false;
        }

        return true;
    }

    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailPattern.test(emailData.emailEmail)) {
            return true;
        } else {
            setFormErrors({ ...formErrors, isEmailInvalid: true });
            return false;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateInputs && validateEmail) {
            // axios.post(
            //     '/',
            //     emailData,
            //     {
            //         headers: {
            //             "Content-Type": "application/x-www-form-urlencoded"
            //         }
            //     }
            // )
            //     .then(response => {
            //         console.log('Email sent successfully:', response);
            //         // Handle success if needed
            //     })
            //     .catch(error => {
            //         console.error('Failed to send email:', error);
            //         // Handle error if needed
            //     });
        }
    }

    const handleChange = (event) => {
        setEmailData({
            ...emailData,
            [event.target.name]: event.target.value
        });
    }

    return (
        <form id='contact-grid' method='POST' onSubmit={handleSubmit} data-netlify="true">
            <label htmlFor='emailName'>Your Name</label>
            <input
                type='text'
                className='email-textinput'
                id='email-name' name='emailName'
                placeholder='Name (min 2 characters)'
                required
                minLength={2}
                onChange={handleChange}
            />
            {formErrors.isNameEmpty && <div className='contact-error'><p>Please enter a name</p></div>}
            <label htmlFor='emailEmail'>Your Email</label>
            <input
                type='email'
                className='email-textinput'
                id='email-email'
                name='emailEmail'
                placeholder='example@example.com (min 5 characters)'
                required
                minLength={5}
                onChange={handleChange}
            />
            {formErrors.isEmailEmpty && <div className='contact-error'><p>Please enter an email</p></div>}
            {formErrors.isEmailInvalid && <div className='contact-error'><p>Please enter a valid email</p></div>}
            <label htmlFor='emailSubject'>Your Subject</label>
            <input
                type='text'
                className='email-textinput'
                id='email-subject'
                name='emailSubject'
                placeholder='Subject (min 5 characters)'
                required
                minLength={5}
                onChange={handleChange}
            />
            {formErrors.isSubjectEmpty && <div className='contact-error'><p>Please enter a subject</p></div>}
            <label htmlFor='emailMessage'>Your Message</label>
            <textarea
                id='email-message'
                name='emailMessage'
                placeholder='Message (min 10 characters)'
                required
                minLength={10}
            >
            </textarea>
            {formErrors.isMessageEmpty && <div className='contact-error'><p>Please enter a message</p></div>}
            <button type='submit' id='email-submit' ><BsFillEnvelopeHeartFill />Send Email<BsFillEnvelopeHeartFill /></button>
        </form>
    );
}

export default EmailForm;