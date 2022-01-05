export interface IPostData {
  title: string;
  description: string;
  tags: string;
  content: string;
}

export interface CreatePostRequestDTO {
  author_id: string;
  en: IPostData;
  pt: IPostData;
}