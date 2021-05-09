import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm'

export enum TodoStatus {
  PENDING = 'pending',
  DONE = 'done',
  DELETE = 'delete'
}

@Index("todos_pkey", ["id"], { unique: true })
@Entity("todos", { schema: "public" })
export class Todos {

  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number

  @Column("character varying", { name: "title", length: 255 })
  title: string

  @Column("character varying", { name: "detail", length: 255 })
  detail: string

  @Column({
    name: "status",
    default: TodoStatus.PENDING,
    type: "enum",
    enum: TodoStatus
  })
  status: TodoStatus

  @Column("timestamptz", {
    name: "createAt",
    default: () => "CURRENT_TIMESTAMP"
  })
  createAt: Date

  @Column("timestamptz", {
    name: "updatedAt",
    default: () => "CURRENT_TIMESTAMP"
  })
  updatedAt: Date
}