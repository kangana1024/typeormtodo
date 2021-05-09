import { NextApiRequest, NextApiResponse } from "next"
import "reflect-metadata"
import { Todos } from "../../../src/entity/todo"
import { Database } from "../../../src/utils/db"
const create = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {

    const db = new Database()
    const conn = await db.getConnection("default")
    try {
      const todoRepo = conn.getRepository(Todos)
      const { title, detail } = req.body

      const todo = await todoRepo.insert({
        title,
        detail
      })

      res.send({
        codo: 200,
        data: todo
      })

    } catch (error) {
      throw new Error("Server Error.")
    }
  } else {
    throw new Error("Server Error.")
  }
}

export default create