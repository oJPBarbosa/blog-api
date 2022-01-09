export interface ISlug {
  language: string;
  slug: string;
}

export interface IViewPostRequestDTO {
  slug: ISlug;
}