import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '.';

enum Rating {
  LIVRE = 'Livre para todos os públicos',
  MAIS10 = 'Não recomendado para menores de 10 anos',
  MAIS12 = 'Não recomendado para menores de 12 anos',
  MAIS14 = 'Não recomendado para menores de 14 anos',
  MAIS16 = 'Não recomendado para menores de 16 anos',
  MAIS18 = 'Não recomendado para menores de 18 anos',
}

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  organizer: string;

  @Column()
  date: Date;

  @Column({ default: Rating.LIVRE, type: 'enum', enum: Rating })
  rating: string;

  @ManyToOne(() => User, (User) => User.events)
  @JoinColumn({ name: 'user_id' })
  User: User;

  @Column()
  user_id: number;

  @ManyToMany(() => User, (users) => users.user_events)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
