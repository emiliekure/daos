import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Profile } from 'src/profiles/profiles.schema';

export type EnsembleDocument = Ensemble & Document;

@Schema()
export class Ensemble {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Profile.name }],
  })
  creator: Profile;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Profile.name }],
  })
  members: Profile[];
}

export const EnsembleSchema = SchemaFactory.createForClass(Ensemble);
