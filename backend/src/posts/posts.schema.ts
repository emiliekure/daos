import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Posts & Document;

@Schema()
export class Posts {
  @Prop({ required: true })
  title: string;

  @Prop()
  author: string;

  @Prop({ required: true })
  instruments: Array<string>;

  @Prop()
  offered: boolean;

  @Prop()
  location: string;

  @Prop()
  description: string;

  @Prop()
  dateOfCreation: Date;
}

export const PostSchema = SchemaFactory.createForClass(Posts);
