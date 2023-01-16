import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Athlete } from "./Athlete";
import { Championship } from "./Championship";

@Entity("results")
export class Result {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  board: string;

  @Column({ type: "text" })
  sort: string;

  @Column({ type: "boolean", default: false })
  scores: boolean;

  @Column({ type: "int", default: 0 })
  quantity: number;

  @Column({ type: "decimal", default: 0 })
  totalWeight: number;

  @Column({ type: "decimal", default: 0 })
  greaterWeight: number;

  @Column({ type: "int", default: 0 })
  points: number;

  @Column({ type: "int", default: 0 })
  lostPoints: number;

  @ManyToOne(() => Championship, (championship) => championship.results, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "championship_id" })
  championship: Championship;

  @ManyToOne(() => Athlete, (athlete) => athlete.club, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "athlete_id" })
  athlete: Athlete;
}
