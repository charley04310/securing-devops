import { UUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hello' })
export class HelloEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'text' })
  name: string;
}
