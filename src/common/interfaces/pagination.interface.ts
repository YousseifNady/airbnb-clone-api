export interface PaginationInterface<T> {
  data: T[];
  meta: {
    currentPage: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}
