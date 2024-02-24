
import {
  IsString,
  IsNotEmpty,
  IsEmpty,
} from 'class-validator';
import { UUID } from 'crypto';

export class HelloDto { 

  @IsEmpty()
  readonly id: UUID;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
  
}
