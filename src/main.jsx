import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUp, BriefcaseBusiness, ChevronRight, CodeXml, FolderOpen, GraduationCap, Mail, Menu,
  MessageCircle, Plus, Sparkles, UserRound, X,
} from 'lucide-react'
import { profile, topics } from './profile'
import './styles.css'

const icons = { about: UserRound, experience: BriefcaseBusiness, projects: FolderOpen, skills: CodeXml, education: GraduationCap, contact: Mail }

const searchableTopics = [...topics.slice(1), topics[0]]

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const inputRef = useRef(null)
  const endRef = useRef(null)
  const activeTopic = messages.at(-1)?.topic?.id

  useEffect(() => {
    if (messages.length) endRef.current?.scrollIntoView({ block: 'end' })
  }, [messages])

  useEffect(() => {
    if (!menuOpen) return
    function onKeyDown(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  function ask(question, topic) {
    const text = question.trim()
    if (!text) return
    const answerTopic = topic ?? searchableTopics.find(item => item.keywords.test(text))
    setMessages(current => [...current, { text, topic: answerTopic }])
    setInput('')
    setMenuOpen(false)
  }

  function handleComposerKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      event.currentTarget.form.requestSubmit()
    }
  }

  function reset() {
    setMessages([])
    setInput('')
    setMenuOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div className="app">
      {menuOpen && <button className="scrim" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}
      <aside className={menuOpen ? 'sidebar open' : 'sidebar'} id="navigation">
        <div className="brand">
          <span className="brand-icon"><MessageCircle size={19} /></span>
          <span>Portfolio<span className="brand-accent">Chat</span></span>
          <button className="icon-button mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={20} /></button>
        </div>
        <button className="new-chat" onClick={reset}><Plus size={18} /> New chat</button>
        <nav aria-label="Portfolio topics">
          <h2>Explore</h2>
          {topics.map(topic => {
            const Icon = icons[topic.id]
            return <button key={topic.id} aria-current={activeTopic === topic.id ? 'true' : undefined} onClick={() => ask(topic.prompt, topic)}><Icon size={17} />{topic.label}</button>
          })}
        </nav>
        <div className="profile">
          <span className="avatar">{profile.initials}</span>
          <div><strong>{profile.name}</strong><span>{profile.role}</span></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-title">
            <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="navigation" aria-label="Toggle navigation"><Menu size={21} /></button>
            <MessageCircle className="header-icon" size={17} />
            <span>Portfolio assistant</span>
          </div>
        </header>

        <div className="viewport">
          {messages.length === 0 ? (
            <section className="welcome content-width" aria-labelledby="welcome-title">
              <div className="hero-art" aria-hidden="true">
                <span className="orbit orbit-outer" /><span className="orbit orbit-inner" />
                <span className="star star-left">✦</span><span className="star star-right">✧</span>
                <span className="hero-icon"><Sparkles size={33} strokeWidth={1.65} /></span>
              </div>
              <h1 id="welcome-title">Hi, I’m <span>{profile.firstName}.</span></h1>
              <p>Welcome to my interactive portfolio. Ask me about my work,<br className="desktop-break" /> experience, or the tools I use.</p>
              <div className="suggestions">
                {topics.slice(0, 4).map(topic => {
                  const Icon = icons[topic.id]
                  return <button className="suggestion" key={topic.id} onClick={() => ask(topic.prompt, topic)}>
                    <span className="suggestion-icon"><Icon size={18} /></span>
                    <span className="suggestion-text"><strong>{topic.prompt}</strong><small>{topic.description}</small></span>
                    <ChevronRight className="suggestion-chevron" size={16} aria-hidden="true" />
                  </button>
                })}
              </div>
            </section>
          ) : (
            <section className="conversation content-width" role="log" aria-label="Portfolio conversation">
              {messages.map(({ text, topic }, index) => (
                <div className="exchange" key={index}>
                  <p className="question">{text}</p>
                  <article className="answer">
                    <span className="answer-icon" aria-hidden="true"><Sparkles size={17} /></span>
                    <div className="answer-body">
                      <h2>{topic?.label ?? 'Portfolio assistant'}</h2>
                      <p>{topic?.summary ?? 'Try asking about my background, experience, projects, skills, education, or contact details.'}</p>
                      {topic?.details && <dl>{topic.details.map(([name, description]) => <div key={name}><dt>{name}</dt><dd>{description}</dd></div>)}</dl>}
                      {topic?.links && <ul className="answer-links">{topic.links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>}
                    </div>
                  </article>
                </div>
              ))}
              <div ref={endRef} />
            </section>
          )}
        </div>

        <footer className="bottom content-width">
          <form className="composer" onSubmit={event => { event.preventDefault(); ask(input) }}>
            <textarea
              ref={inputRef}
              aria-label="Ask about the portfolio"
              placeholder={`Ask about ${profile.firstName}’s work…`}
              value={input}
              onChange={event => setInput(event.target.value)}
              onKeyDown={handleComposerKeyDown}
              maxLength={500}
              rows={2}
            />
            <div className="composer-toolbar">
              <span className="composer-hint">Shift + Enter for a new line</span>
              <button type="submit" disabled={!input.trim()} aria-label="Send message"><ArrowUp size={19} /></button>
            </div>
          </form>
          <p>Answers are drawn from my résumé.</p>
        </footer>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
