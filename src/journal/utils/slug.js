export function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function uniqueSlug(base, takenSlugs) {
  const safe = base || 'item'
  if (!takenSlugs.has(safe)) return safe
  let i = 2
  while (takenSlugs.has(`${safe}-${i}`)) i++
  return `${safe}-${i}`
}
