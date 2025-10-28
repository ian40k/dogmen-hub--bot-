import { useState } from 'react';

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pairingCode, setPairingCode] = useState('');
  const [step, setStep] = useState(1);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handlePhoneSubmit = () => {
    if (!phoneNumber.trim()) {
      alert('Please enter your phone number');
      return;
    }
    setStep(2);
  };

  const handlePairingSubmit = () => {
    if (pairingCode.toUpperCase() !== 'DOGMEN') {
      alert('Invalid pairing code! Use: DOGMEN');
      return;
    }
    setStep(3);
    setMessages([
      { type: 'bot', text: '✅ WhatsApp connected successfully!' },
      { type: 'bot', text: '🤖 Welcome to WhatsApp Bot! Type commands starting with .' },
      { type: 'bot', text: 'Try: .movie .yt .gg .tt .ping .menu' }
    ]);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    if (input.startsWith('.')) {
      const command = input.slice(1).split(' ')[0];
      const query = input.slice(1 + command.length).trim();

      try {
        const response = await fetch('/api/bot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ command, query }),
        });

        const data = await response.json();
        
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'bot', text: data.response }]);
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'bot', text: '❌ Error processing command' }]);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: '💡 Type commands starting with . (dot)\nTry .menu for all commands' }]);
      }, 1000);
    }

    setInput('');
  };

  const quickCommands = [
    { cmd: '.movie avengers', label: '🎬 Movie' },
    { cmd: '.yt funny cats', label: '📺 YouTube' },
    { cmd: '.gg weather today', label: '🔍 Google' },
    { cmd: '.tt dance tutorial', label: '📱 TikTok' },
    { cmd: '.ping', label: '🏓 Status' },
    { cmd: '.menu', label: '📖 Menu' }
  ];

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '0 auto', 
      height: '100vh',
      background: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: '#25d366',
        color: 'white',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <h1>🤖 WhatsApp Bot</h1>
        <p>{step === 3 ? 'Online • Connected' : 'Connect with DOGMEN'}</p>
      </div>

      {/* Step 1: Phone Number */}
      {step === 1 && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
          <h2>Link Your WhatsApp</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>Enter your phone number to receive pairing code</p>
          
          <input
            type="tel"
            placeholder="+1234567890"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.2rem',
              border: '2px solid #25d366',
              borderRadius: '10px',
              marginBottom: '1rem',
              textAlign: 'center'
            }}
          />
          
          <button
            onClick={handlePhoneSubmit}
            style={{
              background: '#25d366',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '10px',
              fontSize: '1.1rem',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            Send Code
          </button>
        </div>
      )}

      {/* Step 2: Pairing Code */}
      {step === 2 && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h2>Enter Pairing Code</h2>
          <p style={{ color: '#666', marginBottom: '1rem' }}>Check WhatsApp for pairing notification</p>
          
          <div style={{
            background: '#ffeb3b',
            padding: '1rem',
            borderRadius: '10px',
            margin: '1rem 0',
            borderLeft: '4px solid #ff9800'
          }}>
            📲 <strong>WhatsApp Notification:</strong><br />
            "Are you trying to link a device? Use code: <strong>DOGMEN</strong>"
          </div>
          
          <input
            type="text"
            placeholder="Enter code from WhatsApp"
            value={pairingCode}
            onChange={(e) => setPairingCode(e.target.value.toUpperCase())}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.5rem',
              border: '2px solid #25d366',
              borderRadius: '10px',
              marginBottom: '1rem',
              textAlign: 'center',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          />
          
          <button
            onClick={handlePairingSubmit}
            style={{
              background: '#25d366',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '10px',
              fontSize: '1.1rem',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            Verify & Connect
          </button>
        </div>
      )}

      {/* Step 3: Chat Interface */}
      {step === 3 && (
        <div style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
          {/* Quick Commands */}
          <div style={{ padding: '1rem', background: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
            <h4 style={{ marginBottom: '0.5rem', color: '#666' }}>Quick Commands:</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {quickCommands.map((quick, index) => (
                <button
                  key={index}
                  onClick={() => setInput(quick.cmd)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {quick.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', background: '#e5ddd5' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '1rem'
              }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '0.8rem 1rem',
                  borderRadius: '1rem',
                  background: msg.type === 'user' ? '#dcf8c6' : 'white',
                  whiteSpace: 'pre-line'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div style={{ padding: '1rem', background: '#f0f0f0', borderTop: '1px solid #ddd' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Type command starting with . (e.g., .movie avengers)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                style={{
                  flex: 1,
                  padding: '0.8rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '25px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim()}
                style={{
                  background: '#25d366',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '25px',
                  cursor: 'pointer'
                }}
              >
                Send
              </button>
            </div>
          </div>

          {/* Channel Info */}
          <div style={{ padding: '1rem', background: '#f8f9fa', borderTop: '1px solid #ddd', textAlign: 'center' }}>
            <a 
              href="https://whatsapp.com/channel/0029Vb71mgIElaglZCU0je0x" 
              target="_blank"
              style={{ color: '#25d366', textDecoration: 'none', fontWeight: 'bold' }}
            >
              📢 Join My WhatsApp Channel
            </a>
          </div>
        </div>
      )}
    </div>
  );
    }
