import { Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './schema/member.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(@InjectModel(Member.name) private memberModal: Model<Member>) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    return new this.memberModal(createMemberDto).save();
  }

  async findAll(): Promise<Member[]> {
    return this.memberModal.find().exec();
  }

  async findOne(id: string): Promise<Member> {
    const member = await this.memberModal.findById(id).exec();
    if (!member) {
      throw new NotFoundException('member not found');
    }
    return member;
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.memberModal.findByIdAndUpdate(id, updateMemberDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.memberModal.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('member not found');
    }
  }
}
