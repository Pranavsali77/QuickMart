export interface Profile {
  id?: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  profilePicture?: string;
  joinDate?: string;
}
