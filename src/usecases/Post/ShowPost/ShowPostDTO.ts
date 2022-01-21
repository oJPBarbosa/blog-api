export interface ISlug {
  language: string;
  slug: string;
}

export interface IShowPostRequestDTO {
  post_id?: string;
  slug?: ISlug;
}
