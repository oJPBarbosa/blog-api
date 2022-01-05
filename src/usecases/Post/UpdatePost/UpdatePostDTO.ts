export interface IPostData {
  title?: string;
  description?: string;
  tags?: string;
  content?: string;
}

export interface UpdatePostRequestDTO {
  post_id: string;
  en?: IPostData;
  pt?: IPostData;
  votes?: number;
}