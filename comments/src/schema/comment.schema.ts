import {getModelForClass, modelOptions, mongoose, prop, Severity} from "@typegoose/typegoose";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
})

class Comments extends TimeStamps {

    @prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    public postId?: string;

    @prop({ required: true, type: mongoose.Schema.Types.Mixed })
    public user?: {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
    }

    @prop({ required: true, type: String })
    public message?: string;

}

const CommentsModel = getModelForClass(Comments);
export default CommentsModel;
