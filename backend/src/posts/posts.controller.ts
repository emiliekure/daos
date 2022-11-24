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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    return this.pService.deletePost(id);
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  createPost(@Body() body) {
    return this.pService.createPost(body);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() body) {
    return this.pService.updatePost(id, body);
  }
}
