import slug from 'slugify'

export const slugify = (string: string): string => {
  return slug(string, {
    remove: /[\|'"!@#$%¨&*()_+=[]{};:.>,<]/g,
    lower: true,
    strict: true,
    trim: true,
  })
}