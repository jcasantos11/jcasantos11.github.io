import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUp, BriefcaseBusiness, ChevronRight, CodeXml, FolderOpen, Globe, GraduationCap, Mail, MapPin, Menu, Moon, PanelLeftClose, PanelLeftOpen, FileDown, Sun, ChevronUp,
  MessageCircle, Plus, Sparkles, UserRound, X,
} from 'lucide-react'
import { profile, topics } from './profile'
import './styles.css'

const icons = { about: UserRound, experience: BriefcaseBusiness, projects: FolderOpen, websites: Globe, skills: CodeXml, education: GraduationCap, contact: Mail }

const searchableTopics = [...topics.slice(1), topics[0]]

const followUps = {
  about: ['experience', 'projects', 'websites'],
  experience: ['projects', 'skills', 'websites'],
  projects: ['websites', 'skills', 'contact'],
  websites: ['projects', 'experience', 'contact'],
  skills: ['projects', 'experience', 'education'],
  education: ['skills', 'experience', 'contact'],
  contact: ['about', 'projects', 'websites'],
}

function initialTheme() {
  try {
    return localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [theme, setTheme] = useState(initialTheme)
  const inputRef = useRef(null)
  const viewportRef = useRef(null)
  const activeTopic = messages.at(-1)?.topic?.id

  useEffect(() => {
    const viewport = viewportRef.current
    const exchange = viewport.querySelector('.exchange:last-child')
    if (!exchange) {
      viewport.scrollTop = 0
      return
    }

    const exchangeTop = exchange.getBoundingClientRect().top - viewport.getBoundingClientRect().top
    viewport.scrollTop = Math.min(viewport.scrollTop + exchangeTop, viewport.scrollHeight - viewport.clientHeight)
  }, [messages])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      // Keep the theme usable when browser storage is unavailable.
    }
  }, [theme])

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
    <div className={sidebarCollapsed ? 'app sidebar-collapsed' : 'app'}>
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
        <details className="profile">
          <summary aria-label="Contact and location">
            <span className="avatar">{profile.initials}</span>
            <span className="profile-identity"><strong>{profile.name}</strong><span>{profile.role}</span></span>
            <ChevronUp className="profile-chevron" size={15} aria-hidden="true" />
          </summary>
          <div className="profile-details">
            <p><MapPin size={16} aria-hidden="true" />{profile.location}</p>
            <a href={`mailto:${profile.email}`}><Mail size={16} aria-hidden="true" />{profile.email}</a>
          </div>
        </details>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-title">
            <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="navigation" aria-label="Toggle navigation"><Menu size={21} /></button>
            <button
              className="icon-button desktop-sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-expanded={!sidebarCollapsed}
              aria-controls="navigation"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </button>
            <span>Portfolio assistant</span>
          </div>
          <div className="topbar-actions">
            <button
              className="icon-button theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <a className="resume-download" href={`${import.meta.env.BASE_URL}${profile.resume}`} download aria-label="Download résumé PDF" title="Download résumé PDF">
              <FileDown size={17} aria-hidden="true" /><span>Résumé</span>
            </a>
          </div>
        </header>

        <div className="viewport" ref={viewportRef} tabIndex={0} role="region" aria-label="Chat">
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
                {topics.filter(topic => ['experience', 'projects', 'websites', 'skills'].includes(topic.id)).map(topic => {
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
                      <p>{topic?.summary ?? 'I couldn’t match that question to the topics in my portfolio. You can email it to me or try one of the questions below.'}</p>
                      {!topic && (
                        <a className="email-question" href={`mailto:${profile.email}?subject=${encodeURIComponent('Portfolio question')}&body=${encodeURIComponent(text)}`}>
                          <Mail size={16} aria-hidden="true" /> Email this question to JC
                        </a>
                      )}
                      {topic?.details && <dl>{topic.details.map(([name, description]) => <div key={name}><dt>{name}</dt><dd>{description}</dd></div>)}</dl>}
                      {topic?.websites && (
                        <ul className="website-grid">
                          {topic.websites.map(site => (
                            <li key={site.url}>
                              <a href={site.url} target="_blank" rel="noopener noreferrer">
                                {site.image && <img src={`${import.meta.env.BASE_URL}images/${site.image}`} alt="" loading="lazy" />}
                                <div>
                                  <h3>{site.name}</h3>
                                  <span>{site.platform}{site.archived ? ' · Archived screenshot' : ''}</span>
                                  <p>{site.description}</p>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                      {topic?.links && <ul className="answer-links">{topic.links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>}
                    </div>
                  </article>
                  <div className="follow-ups" role="group" aria-label="Suggested follow-up questions">
                    {(followUps[topic?.id] ?? followUps.about).map(id => {
                      const suggestion = topics.find(item => item.id === id)
                      return <button key={id} onClick={() => ask(suggestion.prompt, suggestion)}>{suggestion.prompt}</button>
                    })}
                  </div>
                </div>
              ))}
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
          <p>Answers are drawn from my résumé and portfolio.</p>
        </footer>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
