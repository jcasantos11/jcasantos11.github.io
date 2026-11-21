import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import {
  ArrowLeft, ArrowUp, BriefcaseBusiness, ChevronRight, CodeXml, FolderOpen, Globe, GraduationCap, Mail, MailOpen, MapPin, Menu, Moon, PanelLeftClose, PanelLeftOpen, FileDown, Sun, ChevronUp,
  MessageCircle, Plus, Sparkles, UserRound, X,
} from 'lucide-react'
import { findEmployerTopic, profile, topics, workEmailHref } from './profile'
import { caseStudies } from './case-studies'
import './styles.css'

const icons = { about: UserRound, experience: BriefcaseBusiness, projects: FolderOpen, websites: Globe, skills: CodeXml, education: GraduationCap, contact: Mail }

function TopicIcon({ id, size }) {
  const Icon = icons[id]

  return (
    <span className="topic-icon" data-topic={id} aria-hidden="true">
      <Icon size={size} />
      {id === 'contact' && <MailOpen className="topic-icon-mail-open" size={size} />}
    </span>
  )
}

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

const caseStudyHref = study => `#projects/${study.slug}`

function currentCaseStudy() {
  return caseStudies.find(study => caseStudyHref(study) === window.location.hash)
}

function FeaturedMetric({ metric, ready }) {
  const finalValue = Number.parseInt(metric, 10)
  const suffix = metric.endsWith('%') ? '%' : ''
  const [value, setValue] = useState(() =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? finalValue : 0,
  )
  const metricRef = useRef(null)

  useEffect(() => {
    if (!ready) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setValue(finalValue)
      return
    }

    let frame
    let startedAt
    let observer
    function tick(now) {
      startedAt ??= now
      const progress = Math.min(1, (now - startedAt) / 1050)
      const eased = 1 - (1 - progress) ** 2
      setValue(Math.floor(finalValue * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    if (typeof IntersectionObserver === 'undefined') {
      frame = requestAnimationFrame(tick)
    } else {
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        frame = requestAnimationFrame(tick)
      }, { threshold: .25 })
      observer.observe(metricRef.current)
    }

    return () => {
      observer?.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [ready, finalValue])

  return (
    <>
      <span className="featured-metric-label">{metric}</span>
      <strong ref={metricRef} aria-hidden="true">{value}{suffix}</strong>
    </>
  )
}

function CaseStudy({ study, headingRef }) {
  const imageDialog = useRef(null)
  const imageUrl = study.image && `${import.meta.env.BASE_URL}images/${study.image}`

  return (
    <article className="case-study content-width">
      <a className="case-link" href="#"><ArrowLeft size={16} aria-hidden="true" /> Back to portfolio chat</a>
      <p className="case-context">{study.context}</p>
      <h1 ref={headingRef} tabIndex={-1}>{study.name}</h1>
      <p className="case-outcome"><strong>{study.metric}</strong> {study.outcome}</p>
      {imageUrl && (
        <>
          <button
            type="button"
            className="case-image"
            aria-haspopup="dialog"
            aria-label={`Enlarge screenshot: ${study.imageAlt}`}
            onClick={() => imageDialog.current.showModal()}
          >
            <img src={imageUrl} alt={study.imageAlt} />
          </button>
          <dialog
            ref={imageDialog}
            className="case-image-dialog"
            aria-label="Case study screenshot"
            onClick={event => {
              if (event.target === event.currentTarget) event.currentTarget.close()
            }}
          >
            <div className="case-image-panel">
              <div className="case-image-toolbar">
                <button type="button" className="icon-button" aria-label="Close screenshot" onClick={() => imageDialog.current.close()}><X size={18} /></button>
              </div>
              <img src={imageUrl} alt={study.imageAlt} />
            </div>
          </dialog>
        </>
      )}
      <section><h2>Problem</h2><p>{study.problem}</p></section>
      <section><h2>My role</h2><p>{study.role}</p></section>
      <section><h2>What I built</h2><p>{study.implementation}</p></section>
      <section><h2>Result</h2><p>{study.result}</p></section>
      {study.links && <ul className="answer-links">{study.links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>}
    </article>
  )
}

const unmatchedSummary = 'I couldn’t match that question to the topics in my portfolio. You can email it to me or try one of the questions below.'

function WorkEmailLink({ href, children, contact = false, header = false, linkRef }) {
  const [launching, setLaunching] = useState(false)
  const launchTimer = useRef(null)

  useEffect(() => () => window.clearTimeout(launchTimer.current), [])

  function launchEmail(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    event.preventDefault()
    if (launchTimer.current !== null) return
    setLaunching(true)
    launchTimer.current = window.setTimeout(() => {
      launchTimer.current = null
      setLaunching(false)
      window.location.href = href
    }, 430)
  }

  return (
    <a
      ref={linkRef}
      className={`work-cta${contact ? ' contact-cta' : ''}${header ? ' header-work-cta' : ''}${launching ? ' is-launching' : ''}`}
      href={href}
      aria-label={header ? children : undefined}
      data-tooltip={header ? children : undefined}
      onClick={launchEmail}
    >
      <span className="work-cta-envelope" aria-hidden="true">
        <Mail className="work-cta-mail-closed" size={17} />
        <MailOpen className="work-cta-mail-open" size={17} />
      </span>
      <span className="work-cta-label">{children}</span>
      {header && <span className="work-cta-sparkles" aria-hidden="true"><i /><i /><i /></span>}
    </a>
  )
}

function WebsiteShowcase({ websites }) {
  const [index, setIndex] = useState(0)
  const current = websites[index]
  const hasMultiple = websites.length > 1
  const move = step => setIndex(value => (value + step + websites.length) % websites.length)

  return (
    <section className="website-showcase" aria-label="Website portfolio">
      {hasMultiple && (
        <div className="website-controls">
          <button type="button" onClick={() => move(-1)}>Previous</button>
          <span aria-live="polite">{index + 1} of {websites.length}</span>
          <button type="button" onClick={() => move(1)}>Next</button>
        </div>
      )}
      <article className="website-card" key={current.url}>
        {current.image && (
          <img src={`${import.meta.env.BASE_URL}images/${current.image}`} alt={`${current.name} website screenshot`} loading="lazy" />
        )}
        <div className="website-card-content">
          <span className="website-platform">{current.platform}{current.archived ? ' · Archived screenshot' : ''}</span>
          <h3>{current.name}</h3>
          <p>{current.description}</p>
          <a className="website-visit" href={current.url} target="_blank" rel="noopener noreferrer">Visit {current.name}</a>
        </div>
      </article>
    </section>
  )
}

function App() {
  const [messages, setMessages] = useState([])
  const [portfolioReady, setPortfolioReady] = useState(false)
  const pendingPresentation = useRef(null)
  const [pendingReply, setPendingReply] = useState(null)
  const [input, setInput] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [theme, setTheme] = useState(initialTheme)
  const appRef = useRef(null)
  const headerWorkLink = useRef(null)
  const workLinkOrigin = useRef(null)
  const hasMessages = messages.length > 0
  const inputRef = useRef(null)
  const viewportRef = useRef(null)
  const followReply = useRef(false)
  const presentEntry = React.useCallback((entry, behavior = 'instant') => {
    const viewport = viewportRef.current
    if (!followReply.current || entry.closest('.exchange') !== viewport.querySelector('.exchange:last-child')) return

    const { bottom } = viewport.getBoundingClientRect()
    const distance = entry.getBoundingClientRect().bottom - bottom + 16
    if (distance > 0) viewport.scrollBy({ top: distance, behavior })
  }, [])
  const [study, setStudy] = useState(currentCaseStudy)
  const studyHeading = useRef(null)
  const [activeTopic, setActiveTopic] = useState(undefined)

  useLayoutEffect(() => {
    const origin = workLinkOrigin.current
    workLinkOrigin.current = null
    const link = headerWorkLink.current
    if (!link || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const target = link.getBoundingClientRect()
    const landing = { transform: 'none', opacity: 1 }
    let frames = [{ transform: 'translateY(8px)', opacity: 0 }, landing]
    const canFly = origin && target.width && target.height
    if (canFly) {
      const scaleX = Math.min(1.5, origin.width / target.width)
      const scaleY = origin.height / target.height
      const x = origin.left - target.left + (origin.width - target.width * scaleX) / 2
      const y = origin.top - target.top
      frames = [
        { transform: `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`, opacity: 1 },
        {
          offset: .66,
          transform: `translate(${x * .33}px, ${y * .34 + 9}px) scale(${1 + (scaleX - 1) * .25}, ${1 + (scaleY - 1) * .25})`,
          opacity: 1,
        },
        landing,
      ]
    }

    const animation = link.animate?.(
      frames,
      { duration: canFly ? 680 : 220, easing: 'cubic-bezier(.28, .12, .26, 1)' },
    )
    return () => animation?.cancel()
  }, [hasMessages])

  useEffect(() => {
    const loader = document.getElementById('portfolio-loader')
    if (!loader) {
      setPortfolioReady(true)
      return
    }

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      loader.remove()
      setPortfolioReady(true)
      return
    }

    const startedAt = performance.getEntriesByName?.('portfolio-loader')[0]?.startTime ?? 0
    let removal
    const fade = window.setTimeout(() => {
      loader.dataset.ready = ''
      loader.setAttribute('aria-hidden', 'true')
      removal = window.setTimeout(() => {
        loader.remove()
        setPortfolioReady(true)
      }, 220)
    }, Math.max(0, 360 - (performance.now() - startedAt)))

    return () => {
      window.clearTimeout(fade)
      window.clearTimeout(removal)
    }
  }, [])

  useEffect(() => {
    const onHashChange = () => setStudy(currentCaseStudy())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.title = study ? `${study.name} | Jose Carlos Santos` : 'Jose Carlos Santos | Software Engineering Portfolio'
    if (study) {
      followReply.current = false
      studyHeading.current?.focus({ preventScroll: true })
    }
  }, [study])

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const exchange = viewport.querySelector('.exchange:last-child')
    if (!exchange) {
      viewport.scrollTop = 0
      return
    }

    const latestReply = messages.at(-1)
    if (pendingReply === latestReply || pendingPresentation.current !== latestReply) {
      const exchangeTop = exchange.getBoundingClientRect().top - viewport.getBoundingClientRect().top
      viewport.scrollTop = Math.min(viewport.scrollTop + exchangeTop, viewport.scrollHeight - viewport.clientHeight)
      return
    }
    pendingPresentation.current = null

    const followUps = exchange.querySelector('.follow-ups')
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      if (followUps) presentEntry(followUps)
      return
    }

    const entries = exchange.querySelectorAll('.reply-body > p, .email-question, .contact-cta, .website-showcase, dl > div, .reply-body li, .follow-ups')
    const stagger = Math.min(120, 650 / Math.max(1, entries.length - 1))
    const presentation = Array.from(entries, (entry, index) => {
      const delay = index * stagger
      const animation = entry.animate?.(
        [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 380, delay, easing: 'ease-out', fill: 'backwards' },
      )
      const timer = window.setTimeout(() => presentEntry(entry, 'smooth'), delay)
      return { animation, timer }
    })

    return () => presentation.forEach(({ animation, timer }) => {
      animation?.cancel()
      window.clearTimeout(timer)
    })
  }, [messages, pendingReply, study, presentEntry])

  useEffect(() => {
    if (!pendingReply) return
    const timer = window.setTimeout(() => setPendingReply(null), 460)
    return () => window.clearTimeout(timer)
  }, [pendingReply])

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

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setTheme(nextTheme)
      return
    }

    const updateTheme = () => {
      document.documentElement.dataset.theme = nextTheme
      flushSync(() => setTheme(nextTheme))
    }

    if (document.startViewTransition) {
      document.startViewTransition(updateTheme)
      return
    }

    updateTheme()
    appRef.current?.animate?.([{ opacity: .72 }, { opacity: 1 }], { duration: 240, easing: 'ease-out' })
  }

  function ask(question, topic) {
    const text = question.trim()
    if (!text) return
    const answerTopic = topic ?? findEmployerTopic(text) ?? searchableTopics.find(item => item.keywords.test(text))
    if (!hasMessages) {
      const origin = viewportRef.current.querySelector('.welcome .work-cta')?.getBoundingClientRect()
      const viewport = viewportRef.current.getBoundingClientRect()
      if (origin && origin.width && origin.height && origin.top >= viewport.top && origin.bottom <= viewport.bottom) {
        workLinkOrigin.current = origin
      }
    }
    if (study) window.location.hash = ''
    const reply = { text, topic: answerTopic }
    pendingPresentation.current = reply
    followReply.current = true
    setPendingReply(reply)
    setMessages(current => [...current, reply])
    setActiveTopic(answerTopic?.id)
    setInput('')
    setMenuOpen(false)
  }

  function openSidebarTopic(topic) {
    if (messages.at(-1)?.topic?.id === topic.id) {
      setMenuOpen(false)
      return
    }

    ask(topic.prompt, topic)
  }

  function stopFollowingReply() {
    if (!followReply.current) return
    followReply.current = false
    const viewport = viewportRef.current
    viewport.scrollTo({ top: viewport.scrollTop, behavior: 'instant' })
  }

  function handleComposerKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      event.currentTarget.form.requestSubmit()
    }
  }

  function reset() {
    if (study) window.location.hash = ''
    stopFollowingReply()
    setMessages([])
    setPendingReply(null)
    pendingPresentation.current = null
    setActiveTopic(undefined)
    setInput('')
    setMenuOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={appRef} className={sidebarCollapsed ? 'app sidebar-collapsed' : 'app'}>
      <button
        type="button"
        className={menuOpen ? 'scrim open' : 'scrim'}
        onClick={() => setMenuOpen(false)}
        tabIndex={-1}
        aria-hidden={!menuOpen}
        aria-label="Close navigation"
      />
      <aside className={menuOpen ? 'sidebar open' : 'sidebar'} id="navigation">
        <div className="brand">
          <span className="brand-icon"><MessageCircle size={19} /></span>
          <span className="brand-name">Portfolio<span className="brand-accent">Chat</span></span>
          <button className="icon-button mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={20} /></button>
        </div>
        <button className="new-chat" onClick={reset} aria-label="New chat" data-tooltip="New chat"><Plus size={18} /><span>New chat</span></button>
        <nav aria-label="Portfolio topics">
          <h2>Explore</h2>
          {topics.map(topic => (
            <button key={topic.id} aria-label={topic.label} data-tooltip={topic.label} aria-current={activeTopic === topic.id ? 'true' : undefined} onClick={() => openSidebarTopic(topic)}><TopicIcon id={topic.id} size={17} /><span className="topic-label">{topic.label}</span></button>
          ))}
        </nav>
        <details className="profile">
          <summary aria-label="Contact and location" data-tooltip="Contact and location">
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
              data-tooltip={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </button>
            <span>Portfolio assistant</span>
          </div>
          <div className="topbar-actions">
            <button
              className="icon-button theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              data-tooltip={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun size={19} /> : <span className="theme-moon" aria-hidden="true"><Moon size={19} /></span>}
            </button>
            <a className="resume-download" href={`${import.meta.env.BASE_URL}${profile.resume}`} download aria-label="Download résumé PDF" data-tooltip="Download résumé PDF">
              <FileDown size={17} aria-hidden="true" /><span>Résumé</span>
            </a>
            {hasMessages && <WorkEmailLink href={workEmailHref} header linkRef={headerWorkLink}>Work with me</WorkEmailLink>}
          </div>
        </header>

        <div
          className="viewport"
          ref={viewportRef}
          tabIndex={0}
          role="region"
          aria-label={study ? 'Case study' : 'Chat'}
          onWheel={stopFollowingReply}
          onTouchMove={stopFollowingReply}
          onPointerDown={event => {
            if (event.target === event.currentTarget) stopFollowingReply()
          }}
          onKeyDown={event => {
            if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
              stopFollowingReply()
            }
          }}
        >
          {study ? <CaseStudy study={study} headingRef={studyHeading} /> : messages.length === 0 ? (
            <section className="welcome content-width" aria-labelledby="welcome-title">
              <div className="hero-art" aria-hidden="true">
                <span className="orbit orbit-outer" /><span className="orbit orbit-inner" />
                <span className="star star-left">✦</span><span className="star star-right">✧</span>
                <span className="hero-emblem"><span className="hero-icon"><Sparkles size={33} strokeWidth={1.65} /></span></span>
              </div>
              <h1 id="welcome-title">Hi, I’m <span>{profile.firstName}.</span></h1>
              <p>Welcome to my interactive portfolio. Ask me about my work,<br className="desktop-break" /> experience, or the tools I use.</p>
              <WorkEmailLink href={workEmailHref}>Work with me</WorkEmailLink>
              <section className="featured-projects" aria-labelledby="featured-heading">
                <h2 id="featured-heading">Featured projects</h2>
                <div className="featured-grid">
                  {caseStudies.map(item => (
                    <a key={item.slug} href={caseStudyHref(item)}>
                      <FeaturedMetric metric={item.metric} ready={portfolioReady} />
                      <span>{item.name}</span>
                      <small>{item.outcome}</small>
                    </a>
                  ))}
                </div>
              </section>
              <div className="suggestions">
                {topics.filter(topic => ['experience', 'projects', 'websites', 'skills'].includes(topic.id)).map(topic => {
                  return <button className="suggestion" key={topic.id} onClick={() => ask(topic.prompt, topic)}>
                    <span className="suggestion-icon"><TopicIcon id={topic.id} size={18} /></span>
                    <span className="suggestion-text"><strong>{topic.prompt}</strong><small>{topic.description}</small></span>
                    <ChevronRight className="suggestion-chevron" size={16} aria-hidden="true" />
                  </button>
                })}
              </div>
            </section>
          ) : (
            <section className="conversation content-width" role="log" aria-label="Portfolio conversation">
              {messages.map((reply, index) => {
                const { text, topic } = reply
                const isThinking = pendingReply === reply
                const summary = topic?.summary ?? unmatchedSummary
                return (
                  <div className="exchange" key={index}>
                    <p className="question">{text}</p>
                    <article className="answer">
                      <span className="answer-icon" aria-hidden="true"><Sparkles size={17} /></span>
                      {isThinking ? (
                        <div className="answer-body thinking-reply" role="status">
                          Thinking…
                          <span className="thinking-dots" aria-hidden="true"><i /><i /><i /></span>
                        </div>
                      ) : (
                        <div className="answer-body reply-body">
                          <h2>{topic?.heading ?? topic?.label ?? 'Portfolio assistant'}</h2>
                          <p>{summary}</p>
                          <div>
                            {!topic && (
                              <a className="email-question" href={`mailto:${profile.email}?subject=${encodeURIComponent('Portfolio question')}&body=${encodeURIComponent(text)}`}>
                                <Mail size={16} aria-hidden="true" /> Email this question to JC
                              </a>
                            )}
                            {topic?.details && (
                              <dl className={topic.id === 'experience' ? 'experience-timeline' : undefined}>
                                {topic.details.map(([name, description], index) => (
                                  <div key={name}>
                                    {topic.id === 'experience' && (
                                      <span className="timeline-marker" aria-hidden="true" style={{ '--timeline-pulse-delay': `${index * 190}ms` }} />
                                    )}
                                    <dt>{name}</dt><dd>{description}</dd>
                                  </div>
                                ))}
                              </dl>
                            )}
                            {topic?.websites?.length > 0 && <WebsiteShowcase websites={topic.websites} />}
                            {topic?.caseStudies?.length > 0 && (
                              <ul className="answer-links">{topic.caseStudies.map(item => <li key={item.slug}><a href={caseStudyHref(item)}>{item.name} case study</a></li>)}</ul>
                            )}
                            {topic?.action && (
                              <WorkEmailLink href={topic.action.href} contact>{topic.action.label}</WorkEmailLink>
                            )}
                            {topic?.links && <ul className="answer-links">{topic.links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>}
                          </div>
                        </div>
                      )}
                    </article>
                    {!isThinking && <div className="follow-ups" role="group" aria-label="Suggested follow-up questions">
                      {(followUps[topic?.category ?? topic?.id] ?? followUps.about).map(id => {
                        const suggestion = topics.find(item => item.id === id)
                        return <button key={id} onClick={() => ask(suggestion.prompt, suggestion)}>{suggestion.prompt}</button>
                      })}
                    </div>}
                  </div>
                )
              })}
            </section>
          )}
        </div>

        <footer className="bottom content-width" hidden={Boolean(study)}>
          <form className={pendingReply ? 'composer is-waiting' : 'composer'} onSubmit={event => { event.preventDefault(); ask(input) }}>
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
