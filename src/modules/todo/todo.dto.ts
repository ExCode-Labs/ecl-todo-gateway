export interface CreateTodoRequestDto {
  title: string;
}

export interface TodoResponseDto {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
