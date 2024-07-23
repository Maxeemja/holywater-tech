import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmailInput.scss';

function EmailInput() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            localStorage.setItem('quizEmail', email);
            navigate('/thank-you');
        } else {
            setError('Please enter a valid email address');
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
        setError('');
    };

    return (
        <div className="email-input">
            <h2>Almost done!</h2>
            <p>Please enter your email to see your results.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={error ? 'error' : ''}
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" disabled={!email}>Next</button>
            </form>
        </div>
    );
}

export default EmailInput;