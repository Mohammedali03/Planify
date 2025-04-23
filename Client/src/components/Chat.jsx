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
            key: 'your_pusher_app_key',
            cluster: 'mt1',
            forceTLS: true,
            authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
            auth: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            },
            enabledTransports: ['ws', 'wss'],
            disableStats: true,
            activityTimeout: 30000,
            pongTimeout: 10000,
            maxReconnectionAttempts: 5
        });

        echoRef.current = echo;

        // Listen for new messages
        const channel = echo.private(`chat.${localStorage.getItem('userId')}`);
        
        channel.listen('MessageSent', (e) => {
            console.log('Received message event:', e);
            if (e.message && typeof e.message === 'object') {
                const receivedMessage = {
                    id: e.message.id,
                    sender_id: e.message.sender_id,
                    receiver_id: e.message.receiver_id,
                    message: e.message.message,
                    created_at: e.message.created_at
                };
                console.log('Adding received message:', receivedMessage);
                setMessages(prev => [...prev, receivedMessage]);
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
            // Transform the messages to only include necessary fields
            const formattedMessages = response.data.map(msg => ({
                id: msg.id,
                sender_id: msg.sender_id,
                receiver_id: msg.receiver_id,
                message: msg.message,
                created_at: msg.created_at
            }));
            setMessages(formattedMessages);
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
            // Create a temporary message object
            const tempMessage = {
                id: Date.now(), // temporary ID
                sender_id: localStorage.getItem('userId'),
                receiver_id: receiverId,
                message: newMessage,
                created_at: new Date().toISOString()
            };

            // Immediately add the message to the UI
            setMessages(prev => [...prev, tempMessage]);
            setNewMessage('');

            const response = await axios.post('http://localhost:8000/api/messages', {
                receiver_id: receiverId,
                message: newMessage
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            console.log('Server response:', response.data);
            
            // Update the temporary message with the real one from the server
            if (response.data && typeof response.data === 'object') {
                const serverMessage = {
                    id: response.data.id,
                    sender_id: response.data.sender_id,
                    receiver_id: response.data.receiver_id,
                    message: response.data.message,
                    created_at: response.data.created_at
                };
                console.log('Updating with server message:', serverMessage);
                setMessages(prev => prev.map(msg => 
                    msg.id === tempMessage.id ? serverMessage : msg
                ));
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setError(error.response?.data?.error || 'Failed to send message');
            // Remove the temporary message if sending failed
            setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-container">
            {error && <div className="error-message">{error}</div>}
            <div className="messages">
                {messages.map((message, index) => {
                    console.log('Rendering message:', message);
                    const messageText = typeof message.message === 'string' ? message.message : '';
                    return (
                        <div key={index} className={`message ${message.sender_id === localStorage.getItem('userId') ? 'sent' : 'received'}`}>
                            <p>{messageText}</p>
                            <small>
                                {message.created_at ? new Date(message.created_at).toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit',
                                    hour12: true 
                                }) : ''}
                            </small>
                        </div>
                    );
                })}
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