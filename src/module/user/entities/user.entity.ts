import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { v4 as uuid } from "uuid"
import { IsEmail } from "class-validator"
import { Exclude } from "class-transformer"
import { ProfileEntity, ProfileSchema } from "./profile.entity"

@Schema({
  toJSON: {
    getters: true,
    virtuals: true
  },
  timestamps: true
})
export class UserEntity {
  @Prop({
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid()
    }
  })
  userId: string

  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string

  @Prop({ required: true })
  @Exclude()
  password: string

  @Prop({ type: ProfileSchema })
  profile: ProfileEntity
}

export type UserDocument = UserEntity & Document
export const UserSchema = SchemaFactory.createForClass(UserEntity)
