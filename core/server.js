import express from 'express'
import { agent_call } from './agent.js'
import { mdToText } from './mdToText.js'
const app = express()
const port = 3000 //port
 

app.use(express.json())

// function for asking query at "/query" 
app.get('/query', async (req, res) => {
  if (req.query.query) { // check if the query string of the get request has a variable named query

    
    res.type("text/plain") //response type is plain text
    res.send(mdToText(await agent_call(req.query.query))) // the query first goes to agent then gets converts to text then send as respond

  }
  else { // if query is not availabe error is passed

    res.send({ "response": "400" })
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});