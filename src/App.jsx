import { useState, useRef, useEffect } from 'react'
import './App.css'

const BOT_NAME = 'Dota 2 AI'

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Olá! Sou seu assistente especializado em Dota 2. Pergunte sobre heróis, habilidades, itens ou o universo do jogo.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/dota', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: text,
      })
      const reply = await res.text()
      setMessages(prev => [...prev, { role: 'bot', text: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Erro ao conectar com o servidor. Verifique se o backend está rodando.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-wrapper">
      <header className="chat-header">
        <span className="header-icon">⚔</span>
        <h1>{BOT_NAME}</h1>
        <span className="header-badge">Powered by Ollama</span>
      </header>

      <main className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <span className="bubble">{msg.text}</span>
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <span className="bubble typing">
              <span /><span /><span />
            </span>
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      <form className="input-area" onSubmit={sendMessage}>
        <input
          className="chat-input"
          type="text"
          placeholder="Pergunte sobre Dota 2..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
          autoFocus
        />
        <button className="send-btn" type="submit" disabled={loading || !input.trim()}>
          Enviar
        </button>
      </form>
    </div>
  )
}
