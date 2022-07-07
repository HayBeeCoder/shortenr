
interface IUser{
    email: string,
    password: string,
    confirm_password: string
  }

  interface SignUpResponse{
    email: string
    id: number
}