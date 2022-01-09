export const slugify = (string: string): string => {
  string = string.replace(/^\s+|\s+$/g, '')
    .toLowerCase();

  const from = "àáäãâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaaeeeeiiiioooouuuunc------";
  
  for (let i = 0; i < from.length; i++) {
    string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  string = string.replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return string;
}