import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Profile } from './../profiles/profiles.schema';
import { ProfileService } from './../profiles/profiles.service';

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
  @UseGuards(LocalAuthGuard)
  @Delete('/deletProfile/:id')
  deleteProfile(@Param('id') id: string) {
    return this.prService.deleteProfile(id);
  }
  @UseGuards(LocalAuthGuard)
  @Put('/updateProfile/:id')
  updateProfile(@Param('id') id: string, @Body() body) {
    return this.prService.updateProfile(id, body);
  }
}
