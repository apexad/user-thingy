interface baseUser {
  id: number;
  name: string;
  location: string;
  gender?: "Male" | "Female";
};

export interface User extends baseUser{
  friends?: number[];
}

export interface ResponseUser extends baseUser {
  friends?: User[];
}
