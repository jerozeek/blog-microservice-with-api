import {
    IUser,
    IUserDto,
    IUserRepository,
    IUserService
} from "../entity/user.entity";
import jwt from "jsonwebtoken";
import env from "../Core/utils/env";

export class UserServices implements IUserService {

    constructor(private userRepository: IUserRepository) {}

    loginUser(user: IUser, password: string): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                const isMatch = (password === user.password);
                if (!isMatch) return reject("Invalid credentials");

                return resolve(user);
            }
            catch (error) {
                reject(error);
            }
        })
    }

    public async getUser(credential: string): Promise<IUser> {
       return new Promise(async (resolve, reject) => {
           try {
               const user = await this.userRepository.findUserById(credential);
               return resolve(user);
           } catch (error) {
               reject(error);
           }
       })
    }

    public async createUser(data: IUserDto): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.userRepository.create(data);
                return resolve(user);
            } catch (error) {
                reject(error);
            }
        })
    }

    public async updateUser(id: string, data: Partial<IUserDto>): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.userRepository.update(id, data);
                return resolve(user);
            } catch (error) {
                reject(error);
            }
        })
    }


    public async generateAccessToken(user: IUser): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname
                }, env.ACCESS_TOKEN_SECRET, {
                    expiresIn: env.ACCESS_TOKEN_EXPIRY
                });
                return resolve(token);
            } catch (error) {
                reject(error);
            }
        })
    }


    async subscribeEvents(payload: any): Promise<any> {
        const { event, data } = payload;
        switch (event) {
            case "TEST_EVENT":
                console.log("==================================== USERS EVENT  ====================================");
                break;
            default:
                break;
        }
    }


}
