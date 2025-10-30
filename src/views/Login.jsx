import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            setError('');
            // Simulate successful login and sanitize email for display (if needed)
            const sanitizedEmail = sanitizeHtml(email, {
                allowedTags: [], // No HTML tags allowed
                allowedAttributes: {}
            });
            console.log('Sanitized email:', sanitizedEmail);
            navigate('/dashboard');
        } else {
            setError('Please fill in all fields');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                    {/*temporary display fpr testing*/}
                    {/*<p className ="mt-4">Entered Email: {email}</p>*/}
                </form>
            </div>
        </div>
    );
}

export default Login;