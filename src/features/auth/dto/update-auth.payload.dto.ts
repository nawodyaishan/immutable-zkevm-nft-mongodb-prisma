import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthPayloadDto } from './create-auth.payload.dto';

export class UpdateAuthPayloadDto extends PartialType(CreateAuthPayloadDto) {}
