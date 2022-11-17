import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesController } from './profiles.controller';
import { Profile, ProfileSchema } from './profiles.schema';
import { ProfileService } from './profiles.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  controllers: [ProfilesController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
