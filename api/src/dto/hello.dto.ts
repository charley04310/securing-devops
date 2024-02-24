import { IsString, IsNotEmpty, IsEmpty } from 'class-validator';
import { UUID } from 'crypto';
import { HelloEntity } from 'src/app.entity';

export class HelloDto implements HelloEntity {
  @IsEmpty()
  readonly id: UUID;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
