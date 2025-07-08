import React, { useState } from 'react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-4">Sign Up</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 border rounded" 
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 border rounded" 
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 border rounded" 
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;