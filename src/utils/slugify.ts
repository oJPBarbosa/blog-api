import slug from 'slugify';

export const slugify: Function = (string: string): string => {
  return slug(string, {
    remove: /[\|'"!@#$%¨&*()_+=[]{};:.>,<]/g,
    lower: true,
    strict: true,
    trim: true,
  });
};
