import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { Posts, PostSchema } from './posts.schema';
import { PostService } from './posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostService],
  exports: [PostService],
})
export class PostsModule {}
