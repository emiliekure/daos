import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnsembleController } from './ensembles.controller';
import { Ensemble, EnsembleSchema } from './ensembles.schema';
import { EnsembleService } from './ensembles.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ensemble.name, schema: EnsembleSchema },
    ]),
  ],
  providers: [EnsembleService],
  controllers: [EnsembleController],
})
export class EnsembleModule {}
