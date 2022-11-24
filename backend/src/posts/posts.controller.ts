import {
  Body,
  Controller,
  Delete,
  Put,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { Request } from 'express';
import { Posts } from './posts.schema';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

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
  @UseGuards(LocalAuthGuard)
  @Delete('/deltePost/:id')
  deletePost(@Param('id') id: string) {
    return this.pService.deletePost(id);
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  createPost(@Body() body) {
    return this.pService.createPost(body);
  }
  @UseGuards(LocalAuthGuard)
  @Put('/updatePost/:id')
  updatePost(@Param('id') id: string, @Body() body) {
    return this.pService.updatePost(id, body);
  }
}
