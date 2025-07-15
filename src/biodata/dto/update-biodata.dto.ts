import { PartialType } from '@nestjs/mapped-types';
import { createbiodataDto } from './create-biodata.dto';

export class updateBiodataDto extends PartialType(createbiodataDto) { }
