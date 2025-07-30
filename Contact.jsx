import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add form submission logic, e.g., send data to backend or email service
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen max-w-3xl mx-auto p-6 bg-gradient-to-br from-pink-50 to-indigo-50">
      <h1 className="text-4xl font-bold text-center text-[#5f27cd] mb-8">Contact Us</h1>
      {submitted ? (
        <p className="text-center text-green-600 text-lg">Thank you for contacting us! We will get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <label className="block mb-4">
            <span className="text-gray-700 font-semibold">Name</span>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700 font-semibold">Email</span>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700 font-semibold">Message</span>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-2 rounded shadow hover:scale-105 transition font-bold"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
