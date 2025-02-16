import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [input, setInput] = useState(''); // user input speichern
    const [messages, setMessages] = useState([]); // store chat messages
    const chatEndRef = useRef(null); // used to auto-scroll chat to the latest message

    // Funktion to send user message to ChatGPT API
    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages([...messages, userMessage]);
        setInput("");

        try {
            const res = await axios.post("http://localhost:8084/api/chat", { prompt: input }, {
                headers: { "Content-Type": "application/json" },
            });
            const botMessage = { text: res.data, sender: "bot" };
            setMessages([...messages, userMessage, botMessage]);
        } catch (err) {
            console.error("Failed to send message", err);
            setMessages([...messages, userMessage, { text: "Error retrieving response", sender: "bot" }]);
        }
    };

    // Scroll chat to bottom automatically when new messages arrive
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h4>Chatbot App</h4>
                </div>

                <div className="card-body chat-box" style={{ height: "400px", overflow: "auto" }}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`d-flex ${msg.sender === "user" ? "justify-content-end" : ""}`}>
                            <div className={`p-3 rounded shadow ${msg.sender === "user" ? "bg-primary text-white" : "bg-light"}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <div className="card-footer">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type your message....."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;