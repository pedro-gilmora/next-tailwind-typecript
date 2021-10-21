import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";


@Entity({ name: "people" })
export class Client {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public age: number;
}
