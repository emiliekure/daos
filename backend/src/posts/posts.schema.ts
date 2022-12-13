import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Posts & Document;

@Schema()
export class Posts {
  @Prop({ required: true })
  title: string;

  @Prop()
  author: string;

  @Prop()
  authorId: string;

  @Prop({ required: true })
  instrument: string;

  @Prop()
  searchType: string;

  @Prop()
  location: string;

  @Prop()
  description: string;

  @Prop()
  dateOfCreation: Date;
}

export const PostSchema = SchemaFactory.createForClass(Posts);
