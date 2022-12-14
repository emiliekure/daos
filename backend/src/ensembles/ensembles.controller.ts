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
import { Ensemble } from './ensembles.schema';
import { EnsembleService } from './ensembles.service';

@Controller('ensambles')
export class EnsembleController {
  constructor(private enService: EnsembleService) {}

  @Get()
  getEnsembles(): Promise<Ensemble[]> {
    return this.enService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createEnsemble(@Body() body): Promise<Ensemble> {
    return this.enService.validateEnsemble(body);
  }
  @Post('/validate')
  checkEnsembleExist(@Body() name: string): Promise<any> {
    return this.enService.findEnsemble(name);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/members')
  addEnsembleMember(
    @Param('id') id: string,
    @Body() profile,
  ): Promise<Ensemble> {
    return this.enService.addEnsembleMember(id, profile);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id/members/:memberId')
  deleteEnsembleMember(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
  ): Promise<Ensemble> {
    console.log('member', memberId);
    console.log('ensemble id', id);
    return this.enService.deleteEnsembleMember(id, memberId);
  }
}
