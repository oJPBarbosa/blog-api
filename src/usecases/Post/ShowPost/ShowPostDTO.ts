export interface ISlug {
  language: string;
  slug: string;
}

export interface ShowPostRequestDTO {
  post_id?: string;
  slug?: ISlug;
}