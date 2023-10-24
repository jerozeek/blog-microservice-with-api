import {getModelForClass, modelOptions, prop, Severity} from "@typegoose/typegoose";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {IUserStatus} from "../entity/user.entity";

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
})


class User extends TimeStamps {

    @prop({ required: true, type: String })
    public firstname?: string;

    @prop({ required: true, type: String })
    public lastname?: string;

    @prop({ required: true, lowercase: true, unique: true, type: String })
    public email?: string;

    @prop({ required: true, type: String })
    public password?: string;

    @prop({ required: false, type: String, default: "pending" })
    public status?: IUserStatus;

}


const UserModel = getModelForClass(User);
export default UserModel;
