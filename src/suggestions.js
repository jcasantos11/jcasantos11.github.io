import { faqTopics, topics } from './profile.js'

const related = {
  welcome: [['about', 'experience', 'projects', 'websites', 'skills'], ['services', 'project-start', 'laravel-systems'], ['remote', 'role-fit', 'availability']],
  about: [['experience', 'skills', 'projects'], ['services', 'project-start'], ['location', 'remote', 'role-fit']],
  experience: [['projects', 'skills', 'websites'], ['laravel-systems', 'commerce', 'performance'], ['role-fit', 'remote', 'resume-download']],
  projects: [['websites', 'skills', 'experience'], ['laravel-systems', 'performance', 'project-start'], ['role-fit', 'availability']],
  websites: [['projects', 'skills', 'contact'], ['commerce', 'performance', 'maintenance'], ['availability', 'role-fit']],
  skills: [['experience', 'projects', 'education'], ['laravel-systems', 'commerce', 'performance'], ['role-fit', 'resume-download']],
  education: [['skills', 'experience', 'about'], ['services', 'project-start'], ['role-fit', 'resume-download']],
  contact: [['about', 'projects', 'websites'], ['services', 'project-start'], ['location', 'availability', 'remote']],
  client: [['projects', 'websites', 'contact'], ['services', 'project-start', 'maintenance'], ['availability', 'remote']],
  recruiter: [['experience', 'skills', 'contact'], ['laravel-systems', 'performance', 'services'], ['role-fit', 'remote', 'resume-download', 'availability']],
}

const allTopics = new Map([...topics, ...faqTopics].map(topic => [topic.id, topic]))

function pick(ids, count, excluded) {
  const pool = ids.filter(id => id !== excluded)
  return Array.from({ length: count }, () => {
    const index = Math.floor(Math.random() * pool.length)
    return allTopics.get(pool.splice(index, 1)[0])
  })
}

export function getSuggestions(topic) {
  const [pages, client, recruiter] = related[topic?.id] ?? related[topic?.category] ?? related.welcome
  return [
    ...pick(pages, 2, topic?.id),
    ...pick(client, 1, topic?.id),
    ...pick(recruiter, 1, topic?.id),
  ]
}
