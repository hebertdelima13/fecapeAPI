import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Athlete } from "./Athlete";

@Entity("clubs")
export class Club {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true })
  name: string;

  @OneToMany(() => Athlete, (athlete) => athlete.club, {
    cascade: ["remove"],
  })
  athletes: Athlete[];
}
