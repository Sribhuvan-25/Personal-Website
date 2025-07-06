```jsx
import React, { useState } from 'react';

function ContactForm() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form validation and send form data
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={form.name} onChange={handleInputChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={form.email} onChange={handleInputChange} />
            </label>
            <label>
                Subject:
                <input type="text" name="subject" value={form.subject} onChange={handleInputChange} />
            </label>
            <label>
                Message:
                <textarea name="message" value={form.message} onChange={handleInputChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default ContactForm;
```