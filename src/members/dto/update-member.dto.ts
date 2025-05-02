import { CreateMemberDto } from './create-member.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {}
