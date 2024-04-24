import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MongooseSchema } from "mongoose"
import { UserEntity, UserSchema } from "../../user/entities/user.entity"

export type MessageDocument = MessageEntity & Document

@Schema({
  toJSON: {
    getters: true,
    virtuals: true
  },
  timestamps: true
})
export class MessageEntity {
  @Prop({ type: String, ref: "UserEntity" })
  userId: string

  @Prop({ type: UserSchema })
  user: UserEntity

  @Prop()
  content: string

  @Prop({ default: new Date() })
  timestamp: Date
}

export const MessageSchema = SchemaFactory.createForClass(MessageEntity)
