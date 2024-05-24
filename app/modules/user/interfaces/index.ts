type UserData = {
    name: string;
    email: string;
    password: string;
    is_active: boolean;
    phone: string;
    is_super_admin: boolean;
}

type UserLoginData = {
    email: string;
    password: string;
}

export type {
    UserData,
    UserLoginData
}