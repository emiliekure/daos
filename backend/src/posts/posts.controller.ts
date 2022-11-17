import {
  Body,
  Controller,
  Delete,
  Put,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { Request } from 'express';
import { Posts } from './posts.schema';

@Controller('posts')
export class PostsController {
  constructor(private readonly pService: PostService) {}

  @Get()
  async getPosts(@Req() request: Request): Promise<Posts[]> {
    console.log(request);
    const result: Posts[] = await this.pService.getPosts();
    console.log(result);

    return result;
  }
  @Delete('/deltePost/:id')
  deletePost(@Param('id') id: string) {
    return this.pService.deletePost(id);
  }

  @Post()
  createPost(@Body() body) {
    return this.pService.createPost(body);
  }
  @Put('/updatePost/:id')
  updatePost(@Param('id') id: string, @Body() body) {
    return this.pService.updatePost(id, body);
  }
}
