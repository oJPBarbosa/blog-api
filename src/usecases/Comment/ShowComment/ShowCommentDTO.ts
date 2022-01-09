export interface ISlug {
  language: string;
  slug: string;
}

export interface IShowCommentRequestDTO {
  comment_id?: string;
  post_id?: string;
  slug?: ISlug;
}