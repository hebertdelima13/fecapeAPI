import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Result } from "./Result";

@Entity("championships")
export class Championship {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true })
  name: string;

  @Column({ type: "int" })
  registered: number;

  @Column({ type: "text" })
  typeOfChamp: string;

  @Column({ type: "text" })
  category: string;

  @Column({ type: "text" })
  stage: string;

  @OneToMany(() => Result, (result) => result.championship, {
    cascade: ["remove"],
  })
  results: Result[];
}
