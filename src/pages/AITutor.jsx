import React, { useState } from "react";
import { PhoneOff, Phone, Loader2, X } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./AITutor.module.css";

const TAVUS_API_KEY = "5025bb9c40e0412ab6a94217052745af";
const PERSONA_ID = "p05bb98321de";
const REPLICA_ID = "rf8f3aa4b33e";

const LANGUAGE_CONFIG = {
    english: {
        label: "English",
        greeting: "Hello! I'm your AI tutor. How can I help you today?",
        context: `You are a helpful AI tutor. You MUST speak and respond ONLY in English at all times, regardless of what language the student uses. Always reply in English.`,
    },
    hindi: {
        label: "Hindi",
        greeting:
            "नमस्ते! मैं आपका AI ट्यूटर हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
        context: `You are a helpful AI tutor. You MUST speak and respond ONLY in Hindi (हिंदी) at all times, regardless of what language the student uses. Always reply in Hindi using Devanagari script.`,
    },
    hinglish: {
        label: "Hinglish",
        greeting:
            "Hello! Main aapka AI tutor hoon. Aaj main aapki kaise help kar sakta hoon?",
        context: `You are a helpful AI tutor. You MUST speak and respond ONLY in Hinglish (a natural mix of Hindi and English, written in Roman script) at all times. For example: "Aaj hum algebra ke baare mein padhenge. Koi doubt ho toh poochho!" Always reply in Hinglish.`,
    },
    telugu: {
        label: "Telugu",
        greeting:
            "నమస్కారం! నేను మీ AI ట్యూటర్ని. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
        context: `You are a helpful AI tutor. You MUST speak and respond ONLY in Telugu (తెలుగు) at all times, regardless of what language the student uses. Always reply in Telugu using Telugu script.`,
    },
};

const AITutor = () => {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [conversationUrl, setConversationUrl] = useState("");
    const [conversationId, setConversationId] = useState("");
    const [debug, setDebug] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("english");

    const updateStatus = (msg) => {
        console.log(msg);
        setDebug(msg);
    };

    const createConversation = async () => {
        setIsLoading(true);
        updateStatus("Initializing AI Tutor session...");

        try {
            const response = await fetch(
                "https://tavusapi.com/v2/conversations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": TAVUS_API_KEY,
                    },
                    body: JSON.stringify({
                        persona_id: PERSONA_ID,
                        replica_id: REPLICA_ID,
                        conversational_context:
                            LANGUAGE_CONFIG[selectedLanguage].context,
                        custom_greeting: LANGUAGE_CONFIG[selectedLanguage].greeting,
                        properties: {
                            max_call_duration: 3600,
                            participant_left_timeout: 60,
                            enable_recording: false,
                        },
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message ||
                    errorData.error ||
                    "Failed to create conversation"
                );
            }

            const data = await response.json();
            console.log("Tavus response:", data);

            const url = data.conversation_url;
            const id = data.conversation_id;

            if (url) {
                setConversationUrl(url);
                setConversationId(id);
                setIsSessionActive(true);
                updateStatus("Session connected successfully ✅");
            } else {
                throw new Error("No conversation URL returned from Tavus");
            }
        } catch (error) {
            console.error("Session start failed:", error);
            updateStatus(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const endSession = async () => {
        if (conversationId) {
            try {
                await fetch(
                    `https://tavusapi.com/v2/conversations/${conversationId}/end`,
                    {
                        method: "POST",
                        headers: {
                            "x-api-key": TAVUS_API_KEY,
                        },
                    }
                );
            } catch (e) {
                console.warn("Could not end conversation on Tavus:", e);
            }
        }

        setConversationUrl("");
        setConversationId("");
        setIsSessionActive(false);
        updateStatus("Session ended");
    };

    return (
        <div className={styles.tutorContainer}>
            <div className={styles.videoStage}>
                <div className={styles.avatarMain}>
                    {isSessionActive && conversationUrl ? (
                        <iframe
                            src={conversationUrl}
                            className={styles.avatarVideo}
                            allow="microphone; camera; display-capture; autoplay"
                            title="AI Tutor"
                            style={{ border: "none", width: "100%", height: "100%" }}
                        />
                    ) : (
                        <div className={styles.placeholderContainer}>
                            <img
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1920&h=1080"
                                alt="AI Tutor Placeholder"
                                className={styles.avatarLarge}
                            />

                            {!isLoading && (
                                <div
                                    className={styles.startOverlay}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "1rem",
                                    }}
                                >
                                    <select
                                        value={selectedLanguage}
                                        onChange={(e) =>
                                            setSelectedLanguage(e.target.value)
                                        }
                                        style={{
                                            padding: "0.5rem 1rem",
                                            borderRadius: "8px",
                                            border: "1px solid #ccc",
                                            fontSize: "1rem",
                                            backgroundColor: "white",
                                            color: "black",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {Object.entries(LANGUAGE_CONFIG).map(
                                            ([key, val]) => (
                                                <option key={key} value={key}>
                                                    {val.label}
                                                </option>
                                            )
                                        )}
                                    </select>

                                    <button
                                        className={styles.startBtn}
                                        onClick={createConversation}
                                    >
                                        <Phone size={24} /> Start Interactive Session
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {isLoading && (
                        <div className={styles.loadingOverlay}>
                            <Loader2
                                className="animate-spin"
                                size={48}
                                color="white"
                            />
                            <p>Connecting to AI Tutor...</p>
                        </div>
                    )}
                </div>

                {!isSessionActive && (
                    <div className={styles.videoOverlay}>
                        <div className={styles.topBar}>
                            <div className={styles.connectionStatus}>
                                <div className={styles.signalDot}></div>
                                <span>OFFLINE</span>
                            </div>
                            <div className={styles.windowControls}>
                                <Link to="/" className={styles.closeBtn}>
                                    <X size={24} />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {isSessionActive && (
                    <div
                        className={styles.videoOverlay}
                        style={{
                            pointerEvents: "none",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            className={styles.topBar}
                            style={{ pointerEvents: "auto" }}
                        >
                            <div className={styles.connectionStatus}>
                                <div
                                    className={`${styles.signalDot} ${styles.activeSignal}`}
                                ></div>
                                <span>LIVE SESSION</span>
                            </div>
                        </div>

                        <div
                            style={{
                                pointerEvents: "auto",
                                display: "flex",
                                justifyContent: "center",
                                paddingBottom: "5rem",
                            }}
                        >
                            <button
                                onClick={endSession}
                                style={{
                                    backgroundColor: "#ef4444",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50px",
                                    padding: "1rem 2rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                }}
                            >
                                <PhoneOff size={20} /> End Call
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div
                className={styles.debugText}
                style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    zIndex: 100,
                }}
            >
                {debug}
            </div>
        </div>
    );
};

export default AITutor;
