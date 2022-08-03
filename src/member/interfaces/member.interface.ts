export interface IUser {
  firstname: string;
  lastname: string;
  birthdate: string;
  report_subject: string;
  phone: string;
  email: string;
  country_id: number | null;
}

export interface IUserInfo {
  about?: string;
  company?: string;
  position?: string;
  photo_url?: string;
  photo_hash?: string;
  photo_ext?: string;
  photo?: string;
}

export interface IMember extends IUser, IUserInfo {
  id?: number;
  created_at?: string;
  deleted_at?: null;
  updated_at?: string;
}
