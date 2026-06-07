import dotenv from "dotenv"
dotenv.config()

import { Groq } from 'groq-sdk';

const groq = new Groq();
let response = ""

//funvtion to call groq api
export async function agent_call(query) {

  response = "" //resets response after every call

  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": " Explain: " + query + "briefly" // query + prompt
      }
    ],
    "model": "llama-3.1-8b-instant",
    "temperature": 1,
    "max_completion_tokens": 1024,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  //waits for the incomming stream
  for await (const chunk of chatCompletion) {
    response += (chunk.choices[0]?.delta?.content || '');
  }

  return response;
}

