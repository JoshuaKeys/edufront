export interface ListDTO<T> extends ObjectConstructor {
  content: T[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: string | null;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
}
