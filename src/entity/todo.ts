import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm'

@Index("todos_pkey", ["id"], { unique: true })
@Entity("todos", { schema: "public" })
export class Todos {

  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number

  @Column("character varying", { name: "title", length: 255 })
  title: string

  @Column("character varying", { name: "detail", length: 255 })
  detail: string

  @Column("timestamp with local time zone", {
    name: "createAt",
    default: () => "CURRENT_TIMESTAMP"
  })
  createAt: Date

  @Column("timestamp with local time zone", {
    name: "updatedAt",
    default: () => "CURRENT_TIMESTAMP"
  })
  updatedAt: Date
}