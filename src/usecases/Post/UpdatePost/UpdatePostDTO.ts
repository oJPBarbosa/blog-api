export interface IPostData {
  slug: string;
  title?: string;
  description?: string;
  tags?: string;
  content?: string;
}

export interface UpdatePostRequestDTO {
  source_user_id: string,
  target_post_id: string;
  en?: IPostData;
  pt?: IPostData;
}