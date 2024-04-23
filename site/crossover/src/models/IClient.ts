export default interface IClient{
    id: number;
    fullName: string;
    phone: string;
    email?: string;
    birthDate? : Date;
    login: string;
    password: string;
}