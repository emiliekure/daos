import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ required: true })
  name: string;

  @Prop()
  surname: string;

  @Prop({ required: true })
  expertise: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
