import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./UserEntity";
import { Board } from "../types";

@Entity()
export default class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("json")
  board: Board[];

  @Column()
  finished: boolean;

  @Column("simple-array")
  players: number[];

  @OneToMany((type) => User, (user: User) => user.game)
  users: User[];
}
