import express from "express"
import db from "./database"
const app = express()

app.use(express.json())
app.use("/", express.static('../cadastro/dist'))

app.get("/api", (req, res) => {
  res.json({ message: "juuj" })
});

app.get('/api/users' ,(req, res) => {
  const sql = "SELECT * FROM user";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err?.message })
      return
    }

    res.json({
      "message": "success",
      "data": rows
    })
  }
  )
})

app.get('/api/user/:id' ,(req, res) => {
  const sql = "SELECT id, name FROM user WHERE id = ?"
  const params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ "error": err?.message })
      return
    }

    res.json({
      "message": "success",
      "data": row
    })
  })
})

app.post('/api/user/', (req, res) => {
  const errors = []
  if (!req.body.password) {
    errors.push("No password specified")
  }
  if (!req.body.email) {
    errors.push("No email specified")
  }
  if(!req.body.name) {
    errors.push("No name specified")
  }

  const { name, email, password } = req.body

  let sql = `INSERT INTO user (name, email, password) VALUES (?,?,?)`
  let params = [name, email, password]
  db.run(sql, params, function (this: any, err: any, result: any) {
    if (err) {
      res.status(400).json({ "error": err?.message })
      return
    }
    res.json({
      "message": "success",
      "data": {name, email, password},
      "id": this.lastID
    })
  }
  )
})
