import { NextApiRequest, NextApiResponse } from "next"
import { Todos } from "../../../../src/entity/todo"
import { Database } from "../../../../src/utils/db"

const updateStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const db = new Database()
    const conn = await db.getConnection("default")

    try {

      const todoRepo = conn.getRepository(Todos)
      const { status } = req.body
      const { id } = req.query

      let myTodo = await todoRepo.findOne(parseInt(JSON.stringify(id)))
      myTodo.status = status

      await todoRepo.save(myTodo)
      res.send({
        code: 200,
        data: myTodo
      })
    } catch (error) {
      throw new Error(error)
    }
  } else {
    throw new Error("Server Internal Error.")
  }
}
export default updateStatus