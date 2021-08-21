export interface iUser{
  id: number;
  firstName:string;
  lastName: string;
  email:string;
  phone:string;
  address:iAddress;
  description:string;
}
export interface iAddress{
  streetAddress:string;
  city: string;
  state:string;
  zip:string;
}
