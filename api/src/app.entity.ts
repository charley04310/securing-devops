import { UUID } from 'crypto';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hello' })
export class HelloEntity {
  @PrimaryColumn({ type: 'uuid'})
  id: UUID;

  @Column({ type: 'text' })
  name: string;

}
