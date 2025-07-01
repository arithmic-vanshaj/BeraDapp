'use client';
import "../globals.css";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { config } from '../dapp/providers';

const agentURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/agent`;

const Agent: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [assistantId, setAssistantId] = useState<string | undefined>();
    const [threadId, setThreadId] = useState<string | undefined>();
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAssistantReady, setIsAssistantReady] = useState(false); 
    const { isConnected } = useAccount({config});
    const { openConnectModal } = useConnectModal();

    // 1. Send intro message when connected for the first time
    useEffect(() => {
      if (!isConnected || isAssistantReady) return;

      const initializeConversation = async () => {
        try {
          const userMessage: string = 'Hi Alt Bera.';
          // setMessages([{ sender: 'You', text: userMessage }]);
          setLoading(true);

          const response = await fetch(agentURL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userMessage, assistantId, threadId }),
          });

          const result = await response.json();

          setMessages((prev) => [...prev, { sender: 'Assistant', text: result.reply}]);
          setAssistantId(result.assistantId);
          setThreadId(result.threadId);
          setIsAssistantReady(true);

        } catch (err) {
          console.error('Init error:', err);
          setMessages((prev) => [...prev, { sender: 'Assistant', text: 'Error initializing assistant.' }]);
        } finally {
          setLoading(false);
        }
      };

        initializeConversation();
      }, [isConnected, isAssistantReady]);

      // 2. Handle user submitting a new message
    const handleSubmit = useCallback(async () => {
        if (!input.trim() || !isConnected || loading || !isAssistantReady) return;

        const userMessage = input;
        setInput('');
        setMessages((prev) => [...prev, { sender: 'You', text: userMessage }]);
        setLoading(true);

        try {
          const response = await fetch(agentURL, {
              method: 'POST', 
              headers:{ 'Content-Type': 'application/json' },
              body: JSON.stringify({userMessage, assistantId, threadId})
            });

          const reply = await response.json();

          setMessages((prev) => [...prev, { sender: 'Assistant', text: reply.reply }]);
          if (reply.assistantId) setAssistantId(reply.assistantId);
          if (reply.threadId) setThreadId(reply.threadId);
        } catch (err) {
          console.error('Chat error:', err);
          setMessages((prev) => [...prev, { sender: 'Assistant', text: 'Error getting assistant response.' }]);
        } finally {
          setLoading(false);
        }
    }, [input, isConnected, loading, isAssistantReady, assistantId, threadId]);

      const lines = [];
      const spacing = 32;
      const max = 8096;
      const count = max / spacing;

    for (let i = 0; i <= count; i++) {
        const pos = i * spacing;
        // Horizontal line
        lines.push(<line key={`h-${i}`} x1="0" y1={pos} x2={max} y2={pos} />);
        // Vertical line
        lines.push(<line key={`v-${i}`} x1={pos} y1="0" x2={pos} y2={max} />);
    }

  return (
    // background
    <>
     <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Turbulence + displacement filter */}
                <filter id="bendFilter" x="0" y="0" width="100%" height="100%">
                  <feTurbulence
                    type="turbulence"
                    baseFrequency="0.02"
                    numOctaves="3"
                    result="turbulence"
                    seed="2"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="turbulence"
                    scale="40"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>

                {/* Radial gradient mask to localize bending near text */}
                <radialGradient id="maskGradient" cx="50%" cy="40%" r="35%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>

                <mask id="textMask">
                  <rect width="100%" height="100%" fill="url(#maskGradient)" />
                </mask>
              </defs>

              {/* Lines group */}
              <g
                filter="url(#bendFilter)"
                mask="url(#textMask)"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.15"
              >
                {lines}
              </g>
            </svg>
      </div>

      {/* chat section */}
      <div className="flex flex-col z-10 h-[75vh] max-h-[80vh] w-full max-w-[90vh] mx-auto bg-white/10 rounded-lg overflow-hidden relative mt-5">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <p key={i} className="mb-1">
                <strong>{m.sender}:</strong> {m.text}
              </p>
            ))}
          </div>

          {isConnected ? (
            <>
              <div className="absolute bottom-0 left-0 w-full flex items-center p-2 bg-white/80">
                <textarea
                  className="flex-1 h-10 p-2 rounded resize-none text-black focus:outline-none"
                  placeholder="Enter your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  disabled={loading}
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="ml-3 p-2 rounded-full bg-orange-500 text-white"
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={openConnectModal}
              className="absolute bottom-0 left-0 w-full p-4 bg-white/70 text-orange-700 font-semibold hover:bg-white/80"
            >
              Connect wallet to continue
            </button>
          )}
      </div>
    </>
    );
  };

export default Agent;