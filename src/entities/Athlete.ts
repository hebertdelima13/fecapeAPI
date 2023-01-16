import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Club } from "./Club";
import { Result } from "./Result";

@Entity("athletes")
export class Athlete {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true })
  name: string;

  @ManyToOne(() => Club, (club) => club.athletes, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "club_id" })
  club: Club;

  @OneToMany(() => Result, (result) => result.athlete)
  results: Result[];
}
