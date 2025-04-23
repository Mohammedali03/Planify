import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import './Chat.css';
import axios from 'axios';

const ChatTest = () => {
    const [receiverId, setReceiverId] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch current user's ID
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCurrentUserId(response.data.id);
            } catch (error) {
                setError('Failed to fetch user data. Please make sure you are logged in.');
                console.error('Error fetching user:', error);
            }
        };

        fetchCurrentUser();
    }, []);

    return (
        <div className="chat-test-container">
            <h2>Chat Test</h2>
            
            {error ? (
                <div className="error-message">{error}</div>
            ) : (
                <>
                    <div className="user-info">
                        <h3>Your User ID: {currentUserId}</h3>
                        <p>Share this ID with the person you want to chat with</p>
                    </div>

                    <div className="chat-input-section">
                        <h3>Start a Chat</h3>
                        <div className="user-input">
                            <input
                                type="text"
                                placeholder="Enter the other person's User ID"
                                value={receiverId}
                                onChange={(e) => setReceiverId(e.target.value)}
                            />
                            <button 
                                onClick={() => setReceiverId(receiverId)}
                                disabled={!receiverId}
                            >
                                Start Chat
                            </button>
                        </div>
                    </div>

                    {receiverId && (
                        <div className="chat-wrapper">
                            <div className="chat-header">
                                <h3>Chatting with User ID: {receiverId}</h3>
                            </div>
                            <Chat receiverId={receiverId} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ChatTest; 