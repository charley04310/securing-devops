import { UUID } from 'crypto';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hello' })
export class HelloEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'text' })
  name: string;
}
