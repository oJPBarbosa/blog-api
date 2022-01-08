export interface IPostData {
  title?: string;
  description?: string;
  tags?: string;
  content?: string;
}

export interface UpdatePostRequestDTO {
  source_user_id: string,
  post_id: string;
  en?: IPostData;
  pt?: IPostData;
}