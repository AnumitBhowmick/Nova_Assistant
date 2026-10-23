import express from 'express'
import { agent_call } from './agent.js'
import { mdToText } from './mdToText.js'
const app = express()
const port = 3000 //port
 

app.use(express.json())

let output


// function for asking query at "/query" 
app.get('/query', async (req, res) => {
  if (req.query.query) { // check if the query string of the get request has a variable named query

    
    res.type("text/plain")//response type is plain text

    try{

      output = await agent_call(req.query.query)
      res.send(mdToText(output)) // the query first goes to agent then gets converts to text then send as response  

    }
    catch( err){//catches error in the api call
    res.type("text/plain") //response type is plain text
    res.status(500).send("Internal Server Error") //responds with internal server error  

    }
    

  }
  else { // if query is not availabe error is passed

    res.type("text/plain") //response type is plain text
    res.status(400).send("Bad Request") //bad request(query not found)
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});