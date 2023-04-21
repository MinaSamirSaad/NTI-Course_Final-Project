export interface UserData {
    userName: string;
    email: string;
    password: string;
    gender: string
    userType: string
    address:{
        city:string,
        country:string
    },
    age:number | null
    image:{} | string
}
