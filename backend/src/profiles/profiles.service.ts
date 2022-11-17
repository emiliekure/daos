import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './profiles.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private prModel: Model<ProfileDocument>,
  ) {}

  getProfiles(): Promise<Profile[]> {
    return this.prModel.find().exec();
  }
  createProfile(profile: any) {
    const savedPost = new this.prModel(profile);
    return savedPost.save();
  }
  deleteProfile(id: string) {
    return this.prModel.deleteOne({ _id: id });
  }
  updateProfile(id: string, profile: any) {
    return this.prModel.updateOne({ _id: id }, profile);
  }
  loginUser(username: string) {
    return this.prModel.findOne({ email: username });
  }
}
