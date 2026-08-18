const modules = import.meta.glob('../posts/*.json', { eager: true })

export const posts = Object.values(modules)
  .map(m => m.default)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export function getPostBySlug(slug) {
  return posts.find(p => p.slug === slug)
}