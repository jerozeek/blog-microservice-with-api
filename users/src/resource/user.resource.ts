import { IUser } from "../entity/user.entity";
import { UserFacade } from "../facade/user.facade";


export class UserResource {


    private static userService = UserFacade.Service();

    public static single(user: IUser) {
        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }

    public static async author(userId: string) {
        const user = await this.userService.getUser(userId);
        return {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        }
    }


}