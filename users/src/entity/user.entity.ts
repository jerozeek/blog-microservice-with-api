
export type IUserStatus = "pending" | "active" | "suspended";

export interface IUserDto extends IUserLogindto {
    firstname: string;
    lastname: string;
}

export interface IUser extends IUserDto {
    id: string;
    status: IUserStatus;
    createdAt: string;
    updatedAt: string;
}

export interface IUserLogindto {
    email: string;
    password: string;
}

export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser>;
    findUserById(id: string): Promise<IUser>;
    create(data: IUserDto): Promise<IUser>;
    update(id: string, data: Partial<IUserDto>): Promise<IUser>;
}


export interface IUserService {
    getUser(credential: string): Promise<IUser>;
    createUser(data: IUserDto): Promise<IUser>;
    loginUser(user: IUser, password: string): Promise<IUser>;
    updateUser(id: string, data: Partial<IUserDto>): Promise<IUser>;
    generateAccessToken(user: IUser): Promise<string>;
}