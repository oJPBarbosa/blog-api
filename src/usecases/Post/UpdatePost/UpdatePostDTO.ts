export interface IPostData {
  slug: string;
  title?: string;
  description?: string;
  tags?: string;
  content?: string;
}

export interface IUpdatePostRequestDTO {
  source_user_id: string;
  target_post_id: string;
  views?: number;
  en?: IPostData;
  pt?: IPostData;
}
