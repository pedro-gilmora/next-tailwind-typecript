import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({ name: "books" })
export class Book {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;
}
