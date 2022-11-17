import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts, PostDocument } from './posts.schema';

const ObjectId = require('mongodb').ObjectId;

@Injectable()
export class PostService {
  constructor(@InjectModel(Posts.name) private pModel: Model<PostDocument>) {}

  getPosts(): Promise<Posts[]> {
    return this.pModel.find().exec();
  }
  createPost(post: any) {
    const savedPost = new this.pModel(post);
    return savedPost.save();
  }
  deletePost(id: string) {
    return this.pModel.deleteOne({ _id: id });
  }
  updatePost(id: string, post: any) {
    return this.pModel.updateOne({ _id: id }, post);
  }
}
