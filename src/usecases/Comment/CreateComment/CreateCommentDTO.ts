export interface CreateCommentRequestDTO {
  post_id: string;
  email: string;
  name: string;
  provider: string;
  content: string;
}
