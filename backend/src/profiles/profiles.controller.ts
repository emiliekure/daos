import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ProfileService } from './profiles.service';
import { Request } from 'express';
import { Profile } from './profiles.schema';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly prService: ProfileService) {}

  @Get()
  async getProfiles(@Req() request: Request): Promise<Profile[]> {
    console.log(request);
    const result: Profile[] = await this.prService.getProfiles();
    console.log(result);

    return result;
  }

  @Post()
  createProfile(@Body() body) {
    return this.prService.createProfile(body);
  }
  @Delete('/deletProfile/:id')
  deleteProfile(@Param('id') id: string) {
    return this.prService.deleteProfile(id);
  }
  @Put('/updateProfile/:id')
  updateProfile(@Param('id') id: string, @Body() body) {
    return this.prService.updateProfile(id, body);
  }
  @Post('auth/login')
  async loginUser(@Req() request: Request, @Body() body): Promise<Profile> {
    console.log(request);
    const result: Profile = await this.prService.loginUser(body.email);
    console.log(result);

    return result;
  }
}
