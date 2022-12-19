import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Profile } from 'src/profiles/profiles.schema';

export type PostDocument = Posts & Document;

@Schema()
export class Posts {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Profile.name }],
  })
  author: Profile;

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
