import { caseStudies } from './case-studies.js'
import { websites } from './websites.js'

export const profile = {
  name: 'Jose Carlos Santos',
  firstName: 'JC',
  initials: 'JC',
  role: 'Senior Software Engineer',
  location: 'Cainta, Rizal, Philippines',
  email: 'jcasantos11@gmail.com',
  resume: 'JC_Santos_Resume.pdf',
}

export const workEmailHref = `mailto:${profile.email}?subject=${encodeURIComponent('Let’s build something together')}`

export const topics = [
  {
    id: 'about',
    label: 'About me',
    prompt: 'Tell me about yourself',
    description: 'Background and what I do',
    keywords: /\b(?:about (?:you|jc)\b|yourself|background|intro(?:duction)?|location|where (?:are you|is jc) (?:from|based)|who (?:are you|is jc))\b|^(?:hi|hello|hey)[.!?]*$/i,
    summary: 'I’m Jose Carlos Santos, a senior software engineer based in the Philippines. I build full-stack web applications, internal business systems, and eCommerce sites. My work spans PHP and Laravel development, WordPress, Shopify, and integrations for organizations in the Philippines, Australia, the United States, and the United Kingdom.',
  },
  {
    id: 'experience',
    label: 'Experience',
    prompt: 'Walk me through your experience',
    description: 'Roles and responsibilities',
    keywords: /experience|career|how many years|how long have you been (?:working|coding|developing)|work(?:ed)? (?:history|at|for)|roles?|jobs?|employers?|resume|résumé|gold coast|q digital|kotis|sabinc|novanude|pinoypubliko|trustmix|\bpsi\b/i,
    summary: 'I’ve worked across software engineering, WordPress development, web optimization, and eCommerce. Here’s a timeline of my roles.',
    details: [
      ['Gold Coast Websites / Q Digital · Oct 2025–Nov 2026', 'WordPress Developer. Built responsive WordPress sites, customized WooCommerce, resolved performance issues, and managed deployments and quality checks.'],
      ['Kotis Design · Nov 2024–Oct 2025', 'Web Optimization & Content Organization. Maintained and optimized the primary WordPress site, led its migration to Elementor, and built reusable HubSpot modules, forms, and automation assets.'],
      ['SABInc · Apr 2022–Oct 2024', 'Project Consultant / Software Engineer. Independently designed the architecture, database schemas, and business logic for Laravel applications serving approximately 50 users.'],
      ['Novanude.com · Feb 2023–Jul 2024', 'Shopify Developer. Built storefront features with Shopify Liquid and JavaScript and integrated GA4, Hotjar, Klaviyo, and Meta Business Suite. The work contributed to a reported 25% improvement in site performance and a 15% increase in user engagement.'],
      ['Pinoypubliko.com · Mar 2021–Apr 2024', 'WordPress Developer & Social Media Administrator. Maintained WordPress content, responsive layouts, site updates, and analytics reporting.'],
      ['TrustMix.io · Nov 2021–Feb 2022', 'Project Consultant. Implemented responsive Vue.js and Nuxt.js interfaces in an environment using .NET Core and MSSQL.'],
      ['PSI · Mar 2019–Jan 2020', '.NET Developer. Developed and tested Xamarin mobile applications and supporting web services.'],
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    prompt: 'What projects have you built?',
    description: 'Laravel systems and web projects',
    keywords: /projects?|built|portfolio|case stud|work samples?|payroll|fleet|constructors|logistics|billing|hris|impact|outcomes|pinoy-publiko|news site|multimedia/i,
    summary: 'My projects include Laravel systems for day-to-day operations and websites for organizations and online stores.',
    details: [
      ['HR and payroll system', 'Digitized HR and payroll workflows at SABInc, reducing administrative workload by 40%.'],
      ['Fleet management system', 'Built a fleet management solution at SABInc that reduced repair and maintenance costs by 15%.'],
      ['Philippine Constructors Association', 'Developed the organization’s website.'],
      ['Pinoypubliko', 'Worked on this WordPress news and multimedia site, including responsive layouts, site updates, and analytics. The site achieved a reported score of 100 in Google PageSpeed Insights.'],
    ],
    caseStudies,
    links: [
      ['Philippine Constructors Association website', 'https://philippineconstructors.org/'],
      ['Pinoypubliko website', 'https://pinoy-publiko.com/'],
    ],
  },
  {
    id: 'websites',
    label: 'Websites',
    prompt: 'What websites have you worked on?',
    description: 'WordPress and Shopify client work',
    keywords: /websites?|web sites?|client sites?|storefronts?|online stores?/i,
    summary: 'Here are websites and storefronts I’ve developed, customized, or supported.',
    websites,
  },
  {
    id: 'skills',
    label: 'Skills',
    prompt: 'What are your technical skills?',
    description: 'Backend, frontend and operations',
    keywords: /skills?|tools|technical|framework|stack|languages?|technolog|laravel|php|wordpress|shopify|vue|nuxt|hubspot|codex|claude|database/i,
    summary: 'My core stack is PHP and Laravel. I also build WordPress and Shopify sites and handle integrations, testing, performance troubleshooting, and deployments.',
    details: [
      ['Backend and data', 'PHP, Laravel, Filament, Livewire, MySQL, PostgreSQL, MSSQL, .NET Core, and API integrations.'],
      ['Frontend and commerce', 'JavaScript, HTML, CSS, Tailwind CSS, Vue.js, Nuxt.js, WordPress, WooCommerce, Shopify Liquid, and HubSpot/HubL.'],
      ['Engineering and operations', 'PHPUnit, Git, Linux, cPanel, WP Engine, hosting administration, and performance optimization.'],
      ['Analytics and development tools', 'GA4, Google Tag Manager, PageSpeed Insights, Figma, Ahrefs, SEMrush, OpenAI Codex, and Claude Code.'],
    ],
  },
  {
    id: 'education',
    label: 'Education',
    prompt: 'What did you study?',
    description: 'Degrees and certifications',
    keywords: /education|stud(?:y|ied)|degree|university|certif|map[uú]a|six sigma/i,
    summary: 'I studied Information Technology and Computer Science at Mapúa and earned Lean Six Sigma Yellow Belt and White Belt certifications in October 2025.',
    details: [
      ['BS Information Technology · 2014–2018', 'Mapúa University, Java specialization.'],
      ['BS Computer Science · 2006–2011', 'Mapúa Institute of Technology, UNIX administration specialization.'],
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    heading: 'Let’s work together',
    prompt: 'How can I get in touch?',
    description: 'Contact details and links',
    keywords: /contact|email|reach|get in touch|hire/i,
    summary: 'I’d love to hear what you’re working on. If you’re hiring a software engineer, building a Laravel app, or improving a WordPress or Shopify site, tell me a little about the role or project and what you’d like to accomplish.',
    action: { label: 'Start a conversation', href: workEmailHref },
  },
]

const employerMatches = [
  [/gold coast websites|q digital/i, []],
  [/kotis(?: design)?/i, ['Kotis Design', 'Kotis Design Swag']],
  [/sab\s*inc\b/i, [], ['sabinc-payroll', 'sabinc-fleet']],
  [/novanude/i, ['Novanude']],
  [/pinoy[- ]?publiko/i, ['Pinoypubliko'], ['pinoypubliko']],
  [/trustmix/i, []],
  [/\bpsi\b/i, []],
]
const experience = topics.find(topic => topic.id === 'experience')

export function findEmployerTopic(question) {
  const index = employerMatches.findIndex(([pattern]) => pattern.test(question))
  if (index < 0) return undefined

  const [, websiteNames, caseStudySlugs = []] = employerMatches[index]
  const [role, summary] = experience.details[index]
  return {
    id: `employer-${index}`,
    category: experience.id,
    label: role,
    summary,
    websites: websites.filter(site => websiteNames.includes(site.name)),
    caseStudies: caseStudies.filter(study => caseStudySlugs.includes(study.slug)),
  }
}

export const faqTopics = [
  {
    id: 'location',
    category: 'recruiter',
    label: 'Location',
    prompt: 'Where are you located?',
    keywords: /\b(?:location|where (?:are you|is jc)(?: currently)? (?:located|based|from)|where do you live|what (?:city|country|time\s?zone)|where in the philippines)\b|^where are you[?.!]*$/i,
    summary: `I’m based in ${profile.location}, on Philippine Time (UTC+8).`,
  },
  {
    id: 'remote',
    category: 'recruiter',
    label: 'Remote work',
    prompt: 'Have you worked with remote teams?',
    keywords: /\b(?:remote(?:ly)?|distributed teams?|international (?:clients|teams)|time\s?zone overlap|us hours|night shift|relocat\w*|on[ -]?site|hybrid work)\b/i,
    summary: 'I’ve worked remotely with teams in Australia, the United States, and the United Kingdom. I’m based in the Philippines (UTC+8). If your team needs specific overlap hours or on-site work, share the schedule and location so we can discuss it.',
  },
  {
    id: 'role-fit',
    category: 'recruiter',
    label: 'Role fit',
    prompt: 'What roles are a good fit for you?',
    keywords: /\b(?:good fit|best fit|ideal role|why (?:should we hire|hire)|what (?:roles?|positions?) (?:are|would)|looking for in (?:a|your next) role)\b/i,
    summary: 'My strongest fit is senior PHP or Laravel work that involves building internal systems, integrating services, or improving existing applications. My WordPress and Shopify experience also fits roles centered on websites and eCommerce.',
  },
  {
    id: 'resume-download',
    category: 'recruiter',
    label: 'Résumé',
    prompt: 'Can I download your résumé?',
    keywords: /\b(?:download|send|share|see|view|copy|pdf)\b.*\b(?:r[eé]sum[eé]|cv)\b|\b(?:r[eé]sum[eé]|cv)\b.*\b(?:download|pdf)\b|^(?:your )?(?:r[eé]sum[eé]|cv)[?.!]*$/i,
    summary: 'My résumé covers my work history, technical skills, and education. You can download the PDF from the header or open it here.',
    links: [['Open résumé PDF', `./${profile.resume}`]],
  },
  {
    id: 'availability',
    category: 'recruiter',
    label: 'Availability and pricing',
    prompt: 'How can I check your availability?',
    keywords: /\b(?:availab\w*|notice period|when can you start|how soon|start date|salary|compensation|hourly rate|your rates?|what (?:do|would) you charge|how much (?:do you charge|would it cost)|quote for|taking (?:on )?(?:new )?clients|open to (?:work|opportunities|roles))\b/i,
    summary: 'For availability, start dates, or pricing, send me a short note. Include the role or project scope, your target start date, and any budget or time-zone requirements you can share.',
    action: { label: 'Ask JC by email', href: workEmailHref },
  },
  {
    id: 'services',
    category: 'client',
    label: 'How I can help',
    prompt: 'What can you help my business with?',
    keywords: /\b(?:services?|what can you (?:help|do for)|help (?:my|our) business|can you (?:build|develop|create|make) (?:me |us )?(?:an?|my|our|a new) (?:web\s?site|web app|business system))\b/i,
    summary: 'I help teams cut down on repetitive admin work and improve websites that are slow or hard to update. At SABInc, I built an HR and payroll system that reduced administrative workload by 40%. If you’re hiring or have a project in mind, tell me what’s slowing your team down and what you’d like to improve.',
    caseStudies: caseStudies.filter(study => study.slug === 'sabinc-payroll'),
    action: { label: 'Tell me what you need', href: workEmailHref },
  },
  {
    id: 'laravel-systems',
    category: 'client',
    label: 'Laravel and business systems',
    prompt: 'Can you build a custom Laravel system?',
    keywords: /\b(?:custom laravel|business process automation|internal (?:tool|system)s?|automate (?:our|my)|laravel (?:system|app|development))\b/i,
    summary: 'Yes. At SABInc I designed and built Laravel applications serving about 50 users, including HR and payroll, fleet management, logistics, billing, and cheque management. I owned the application architecture, database schemas, and business logic.',
    caseStudies: caseStudies.filter(study => study.slug.startsWith('sabinc-')),
  },
  {
    id: 'commerce',
    category: 'client',
    label: 'Online stores',
    prompt: 'Can you customize a Shopify or WooCommerce store?',
    keywords: /\b(?:shopify|woocommerce|e-?commerce|online store)\b.*\b(?:customiz\w*|build|setup|set up|platform|store|theme)\b|\b(?:customiz\w*|set up|build|develop\w*)\b.*\b(?:shopify|woocommerce|online store)\b/i,
    summary: 'Yes. I’ve customized WordPress and WooCommerce functionality, built Shopify storefront features with Liquid and JavaScript, and integrated analytics and marketing tools. The website examples below show the kind of storefront work I’ve supported.',
    websites: websites.filter(site => ['Kotis Design Swag', 'Novanude'].includes(site.name)),
  },
  {
    id: 'performance',
    category: 'client',
    label: 'Website performance',
    prompt: 'Can you speed up an existing website?',
    keywords: /\b(?:speed up|slow (?:site|website)|page\s?speed|lighthouse|core web vitals|performance (?:audit|optimization)|optimi[sz]\w* (?:my|our|an? existing) (?:site|website)|website performance)\b/i,
    summary: 'Yes. I’ve worked on WordPress performance troubleshooting and storefront optimization, using tools such as PageSpeed Insights to identify issues. Pinoypubliko reached a reported PageSpeed Insights score of 100. Any work on your site would start with a fresh baseline for the pages that matter most.',
    caseStudies: caseStudies.filter(study => study.slug === 'pinoypubliko'),
  },
  {
    id: 'maintenance',
    category: 'client',
    label: 'Maintenance and handover',
    prompt: 'Can you help maintain an existing site?',
    keywords: /\b(?:maintain|(?:ongoing|website|site|wordpress) maintenance|ongoing support|handover|hand[ -]off|training|existing site|bug fix(?:es)?|site updates?)\b/i,
    summary: 'I’ve maintained existing sites and applications, handled updates and deployment checks, and supported training and troubleshooting for internal tools. If you need ongoing help, tell me what the site runs on and what you’d like taken care of.',
    action: { label: 'Discuss maintenance', href: workEmailHref },
  },
  {
    id: 'project-start',
    category: 'client',
    label: 'Getting started',
    prompt: 'What do you need to start a project?',
    keywords: /\b(?:how (?:do|can) (?:we|i) (?:start|get started|work together)|get(?:ting)? started|what do you need|project process|how do you work|what should i send|project timeline|how long (?:would|will) it take)\b/i,
    summary: 'Start with the problem you want to solve, a link to any existing site or system, and your target timeline. It helps to know who will use it, any tools it needs to connect to, and whether you need someone to maintain it afterward.',
    action: { label: 'Tell me about your project', href: workEmailHref },
  },
]

const searchableTopics = [...topics.slice(1), topics[0]]

export function findAnswerTopic(question) {
  const text = question.trim().normalize('NFD').replace(/\p{M}/gu, '').replace(/[‘’]/g, "'")
  const faq = faqTopics.find(topic => topic.keywords.test(text))
  if (faq) return faq

  if (/\b(?:examples?(?=\s*(?:please)?[?.!]*$)|examples? of (?:your|past) work|work samples?|samples? of (?:your|past) work|(?:show|see|view|browse|check out)\b.*\b(?:your|previous|past) (?:work|projects?)|what have you built|what have you worked on)\b/i.test(text)) {
    return topics.find(topic => topic.id === (/\b(?:websites?|stores?|storefronts?)\b/i.test(text) ? 'websites' : 'projects'))
  }

  return findEmployerTopic(text) ?? searchableTopics.find(topic => topic.keywords.test(text))
}
