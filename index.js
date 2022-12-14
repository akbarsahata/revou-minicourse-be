import express from 'express'
import bodyParser from 'body-parser'
import { DataTypes, Sequelize } from 'sequelize'

const server = express()

const sequelize = new Sequelize({
    dialect: 'sqlite'
})

const UserModel = sequelize.define('User', {
    name: DataTypes.STRING,
    age: DataTypes.NUMBER
})

sequelize.sync([UserModel])

const port = 8000

server.use(bodyParser.urlencoded({
    extended: true
}))

server.get('/', (request, response) => {
    response.send('hello world!')
})

server.get('/users', async (request, response) => {
    const users = await UserModel.findAll()

    response.send(users)
})

server.post('/users', async (request, response) => {
    const newUser = await UserModel.create(request.body)

    response.send(newUser)
})

server.listen(port, () => {
    console.log('server is listening at http://localhost:' + port);
})