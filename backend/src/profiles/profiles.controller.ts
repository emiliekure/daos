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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getProfile(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<Profile> {
    console.log(request);
    const result: Profile = await this.prService.getSpecificProfile(id);
    console.log(result);

    return result;
  }

  @Post()
  createProfile(@Body() body) {
    return this.prService.validateProfile(body);
  }
  @Post('/validate')
  checkEmailExist(@Body() email: string): Promise<any> {
    return this.prService.findEmail(email);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/deletProfile/:id')
  deleteProfile(@Param('id') id: string) {
    return this.prService.deleteProfile(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/updateProfile/:id')
  updateProfile(@Param('id') id: string, @Body() body) {
    return this.prService.updateProfile(id, body);
  }
}
