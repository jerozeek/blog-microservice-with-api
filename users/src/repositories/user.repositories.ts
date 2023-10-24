import { IUser, IUserDto, IUserRepository} from "../entity/user.entity";
import UserModel from "../schema/user.schema";

let instance: UserRepository;

class UserRepository implements IUserRepository {

    constructor() {
        if (instance) {
            throw new Error("Cannot instantiate UserRepository more than once.");
        }

        instance = this;
    }

    public getInstance(): UserRepository {
        return instance;
    }


    public async findUserByEmail(email: string): Promise<IUser> {
        return await UserModel.findOne({email}) as IUser;
    }

    public async findUserById(id: string): Promise<IUser> {
        return await UserModel.findById(id) as IUser;
    }

    public async create(data: IUserDto): Promise<IUser> {
        return await UserModel.create(data) as unknown as IUser;
    }

    public async update(id: string, data: Partial<IUserDto>): Promise<IUser> {
        return UserModel.findByIdAndUpdate(id, data, {new: true}) as unknown as IUser;
    }

}


const userRepository = new UserRepository();
export default userRepository.getInstance();