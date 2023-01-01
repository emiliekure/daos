import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'src/profiles/profiles.schema';
import { Ensemble, EnsembleDocument } from './ensembles.schema';

@Injectable()
export class EnsembleService {
  constructor(
    @InjectModel(Ensemble.name) private enModel: Model<EnsembleDocument>,
  ) {}

  async findAll(): Promise<Ensemble[]> {
    return this.enModel.find().populate('creator').populate('members');
  }

  async validateEnsemble(body: any): Promise<any> {
    const ensemble: Ensemble = await this.enModel.findOne({ name: body.name });

    if (ensemble) {
      console.log('validate ensemble', ensemble);
      throw new HttpException('This ensemble already exists!', 403);
    }
    return this.createEnsemble(body);
  }

  createEnsemble(ensemble: any): Promise<Ensemble> {
    const createdEnsemble = new this.enModel(ensemble);
    return createdEnsemble.save();
  }
  async addEnsembleMember(id: string, member: any) {
    const updatedEnsemble = await this.enModel.findById(id);
    const searchedMember = updatedEnsemble.members.find((profile: any) => {
      console.log('this is the id', profile.toString());
      if (profile.toString() === member._id) {
        return profile;
      }
    });
    if (searchedMember) {
      console.log('validate member', searchedMember);
      throw new HttpException('You are already a part of this ensemble!', 403);
    } else {
      console.log(searchedMember);
      updatedEnsemble.members.push(member);
      return updatedEnsemble.save();
    }
  }
  async deleteEnsembleMember(id: string, memberId: string) {
    const filteredEnsemble = await this.enModel.findById(id);

    const filteredMembers = filteredEnsemble.members.filter((profile: any) => {
      return profile.toString() !== memberId;
    });
    filteredEnsemble.members = filteredMembers;

    return filteredEnsemble.save();
  }
  async findEnsemble(ensemble: any) {
    const searchedEnsemble = await this.enModel.findOne({
      name: ensemble.name,
    });

    if (searchedEnsemble) {
      throw new HttpException('Name unavailable', 200);
    }
    throw new HttpException('Name available', 200);
  }
  deleteEnsemble(id: string) {
    return this.enModel.deleteOne({ _id: id });
  }
}
