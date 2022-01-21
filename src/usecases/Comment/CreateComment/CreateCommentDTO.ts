export interface ICreateCommentRequestDTO {
  post_id: string;
  email: string;
  name: string;
  provider: string;
  content: string;
}
