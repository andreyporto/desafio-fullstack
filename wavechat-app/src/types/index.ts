export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Room {
  id: number;
  name: string;
  description: string | null;
  created_by: number;
  members_count: number;
  created_at: string;
}

export interface RoomDetail extends Room {
  members: User[];
}

export interface Message {
  id: number;
  body: string;
  created_at: string;
  user: Pick<User, "id" | "name">;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface LoginResponse {
  message: string;
  access_token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}
