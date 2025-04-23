import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Initialize Pusher with your app key
window.Pusher = Pusher;

const Chat = ({ receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const echoRef = useRef(null);

    useEffect(() => {
        // Initialize Echo with proper configuration
        const echo = new Echo({
            broadcaster: 'pusher',
            key: 'your_pusher_app_key', // Replace with your actual Pusher key
            cluster: 'mt1',
            forceTLS: true,
            authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
            auth: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        });

        echoRef.current = echo;

        // Listen for new messages
        const channel = echo.private(`chat.${localStorage.getItem('userId')}`);
        
        channel.listen('MessageSent', (e) => {
            console.log('Received message:', e);
            if (e.message) {
                setMessages(prev => [...prev, e.message]);
            }
        });

        // Fetch existing messages
        fetchMessages();

        return () => {
            channel.stopListening('MessageSent');
            echo.leave(`chat.${localStorage.getItem('userId')}`);
        };
    }, [receiverId]);

    const fetchMessages = async () => {
        try {
            setError(null);
            const response = await axios.get(`http://localhost:8000/api/messages/${receiverId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setError(error.response?.data?.error || 'Failed to fetch messages');
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            setError(null);
            const response = await axios.post('http://localhost:8000/api/messages', {
                receiver_id: receiverId,
                message: newMessage
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            console.log('Message sent:', response.data);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            setError(error.response?.data?.error || 'Failed to send message');
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-container">
            {error && <div className="error-message">{error}</div>}
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender_id === localStorage.getItem('userId') ? 'sent' : 'received'}`}>
                        <p>{message.message}</p>
                        <small>{new Date(message.created_at).toLocaleTimeString()}</small>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="message-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat; 