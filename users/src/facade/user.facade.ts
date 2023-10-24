import UserRepository from "../repositories/user.repositories";
import { UserServices } from "../services/user.services";


export class UserFacade {

    public static Repository = UserRepository;

    public static Service = () => new UserServices(UserFacade.Repository);

}