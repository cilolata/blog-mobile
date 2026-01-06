export interface IPost {
  id?: number;
  title: string;
  description: string;
  subject?: string;
  content: string;
  created_at?: Date;
  updated_at?: Date | string;
  user_id: number;
  teacher?: string;
}

export interface IPostUpdate {
  id?: number;
  title?: string;
  description?: string;
  subject?: string;
  content?: string;
  created_at?: Date;
  updated_at?: Date | string;
  user_id?: number;
}

export enum HTTPResponseStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export interface Session {
  permissionType: string | number;
  username: string;
}
