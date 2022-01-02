export interface UpdatePostRequestDTO {
  post_id: string;
  title?: string;
  description?: string;
  tags?: string;
  content?: string;
}