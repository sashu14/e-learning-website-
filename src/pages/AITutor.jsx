import React, { useState } from 'react';
import { Mic, Video, Settings, X, Send, PhoneOff, Phone, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './AITutor.module.css';

const AITutor = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your AI Tutor. Click 'Start Session' to begin.", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [conversationUrl, setConversationUrl] = useState('');
    const [debug, setDebug] = useState('');

    // Configuration
    const TAVUS_API_KEY = "c27523e1dc5c4dd1abe8c35531eb7ef4"; // User provided key
    const PERSONA_ID = "pc55154f229a";

    const updateStatus = (msg) => {
        setDebug(msg);
        console.log(msg);
    };

    const createConversation = async () => {
        setIsLoading(true);
        updateStatus("Initializing Tavus session...");

        try {
            const response = await fetch("/api/tavus/v2/conversations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": TAVUS_API_KEY,
                },
                body: JSON.stringify({
                    persona_id: PERSONA_ID,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create conversation");
            }

            const data = await response.json();
            console.log("Tavus Response:", data);

            if (data.conversation_url) {
                setConversationUrl(data.conversation_url);
                setIsSessionActive(true);
                updateStatus("Session active");
            } else {
                throw new Error("No conversation URL returned");
            }

        } catch (error) {
            console.error("Failed to start session:", error);
            updateStatus(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const endSession = () => {
        setConversationUrl('');
        setIsSessionActive(false);
        updateStatus("Session ended");
    };

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { id: Date.now(), text: input, sender: 'user' }]);
        setInput('');
        // Note: For iframe integration, text chat usually needs to be handled via the iframe's UI 
        // or a specific data channel if supported.
    };

    return (
        <div className={styles.tutorContainer}>
            {/* Video Area */}
            <div className={styles.videoStage}>
                {/* Main Video Background */}
                <div className={styles.avatarMain}>
                    {isSessionActive && conversationUrl ? (
                        <iframe
                            src={conversationUrl}
                            className={styles.avatarVideo}
                            allow="microphone; camera; display-capture; autoplay"
                            title="Tavus AI Tutor"
                            style={{ border: 'none', width: '100%', height: '100%' }}
                        />
                    ) : (
                        <div className={styles.placeholderContainer}>
                            <img
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1920&h=1080"
                                alt="AI Tutor Placeholder"
                                className={styles.avatarLarge}
                            />
                            {!isLoading && (
                                <div className={styles.startOverlay}>
                                    <button className={styles.startBtn} onClick={createConversation}>
                                        <Phone size={24} /> Start Interactive Session
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {isLoading && (
                        <div className={styles.loadingOverlay}>
                            <Loader2 className="animate-spin" size={48} color="white" />
                            <p>Connecting to AI Tutor...</p>
                        </div>
                    )}
                </div>

                {/* UI Overlay Layer - Only shown when NOT active (offline state) or for specific controls */}
                {!isSessionActive && (
                    <div className={styles.videoOverlay}>
                        <div className={styles.topBar}>
                            <div className={styles.connectionStatus}>
                                <div className={styles.signalDot}></div>
                                <span>OFFLINE</span>
                            </div>
                            <div className={styles.windowControls}>
                                <Link to="/" className={styles.closeBtn}><X size={24} /></Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Close button always visible when active */}
                {/* Close button always visible when active */}
                {isSessionActive && (
                    <div className={styles.videoOverlay} style={{ pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div className={styles.topBar} style={{ pointerEvents: 'auto' }}>
                            <div className={styles.connectionStatus}>
                                <div className={`${styles.signalDot} ${styles.activeSignal}`}></div>
                                <span>LIVE SESSION</span>
                            </div>
                        </div>

                        {/* End Call Button */}
                        <div style={{ pointerEvents: 'auto', display: 'flex', justifyContent: 'center', paddingBottom: '5rem' }}>
                            <button
                                onClick={endSession}
                                style={{
                                    backgroundColor: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50px',
                                    padding: '1rem 2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <PhoneOff size={20} /> End Call
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Debug Info */}
            <div className={styles.debugText} style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 100 }}>{debug}</div>

        </div>
    );
};

export default AITutor;
