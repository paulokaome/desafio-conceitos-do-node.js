const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (request, response) => {

  return response.json(repositories)

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const user = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(user);

  response.status(200).json(user);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (!isUuid(id)) {
    return response.status(400).json({ message: "Id not Found" })
  }

  const Changes = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoriesIndex].likes
  };

  repositories[repositoriesIndex] = Changes;

  response.json(Changes)


});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (!isUuid(id)) {
    return response.status(400).json({ message: "Id not Found" })
  }

  repositories.splice(repositoriesIndex, 1)

  return response.status(204).json()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (!isUuid(id)) {
    return response.status(400).json({ message: "Id not Found" })
  }

  const AddLike = {
    id,
    title: repositories[repositoriesIndex].title,
    url: repositories[repositoriesIndex].url,
    techs: repositories[repositoriesIndex].techs,
    likes: repositories[repositoriesIndex].likes + 1
  };

  repositories[repositoriesIndex] = AddLike;

  response.json(AddLike)

});

module.exports = app;
