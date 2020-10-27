
const cors = require("cors");
const express = require('express')
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const users = [];

function CheckId(request, response, next) {
  const { id } = request.params

  if (!isUuid(id)) {
    return response.status(401).json({ message: 'Need a validated ID' })
  }
 
  next()
}

app.get('/users', (request, response) => {
  const { name } = request.query

  const findName = name ? users.filter(user => user.name.includes(name)) : users;

  return response.json(findName)

});

app.post('/users', (request, response) => {
  const { name, email } = request.body

  const user = { id: uuid(), name, email }

  users.push(user)

  return response.json(user)

})

app.put('/users/:id', CheckId, (request, response) => {
  const { id } = request.params
  const { name, email } = request.body

  const usersIndex = users.findIndex(user => user.id === id);

  const user = {
    id,
    name,
    email
  }

  users[usersIndex] = user

  return response.status(200).json(user);
})

app.delete('/users/:id', CheckId, (request, response) => {
  const { id } = request.params

  const usersIndex = users.findIndex(user => user.id === id);

  users.splice(usersIndex, 1)

  return response.status(200).json()
})



app.listen(3333, () => {
  console.log("Server Worker 🚀🚀🚀");
})

module.exports = app;
