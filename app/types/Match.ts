export interface Match {
  id: number;
  users: [{ id: number; email: string }, { id: number; email: string }];
  createdAt: number[];
  updatedAt: number[];
}
