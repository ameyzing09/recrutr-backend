import express, { Request, Response} from 'express'
import cors from 'cors'
import http from 'http'
const app = express()

app.use(cors())
app.use(express.json())

http.createServer(app)

app.listen(8080, () => console.log(`Server started at port 80`))

app.get('/', (req: Request, res: Response) => {
    res.send("hello world");
})