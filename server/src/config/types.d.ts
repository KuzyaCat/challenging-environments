export type SortOrder = 'ASC' | 'DESC';
export type SortBy<T> = keyof T;

export type Response<T> = {
  success: boolean,
  message: string,
  data?: T
};
