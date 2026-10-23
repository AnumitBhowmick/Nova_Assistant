import dotenv from "dotenv"
dotenv.config()

import { Groq } from 'groq-sdk';

const groq = new Groq();
let response = ""

//function to call groq api
export async function agent_call(query) {

  response = "" //resets response after every call

  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": " Explain: " + query + "briefly" // query + prompt
      }
    ],
    "model": "openai/gpt-oss-120b",
    "temperature": 1,
    "max_completion_tokens": 2048,
    "top_p": 1,
    "stream": true,
    "reasoning_effort": "medium",
    "stop": null,
    "tools": [
      {
        "type": "browser_search"
      },
            {
        "type": "code_interpreter"
      }
    ]
  });

  //waits for the incomming stream and adds them
  for await (const chunk of chatCompletion) {
    response += (chunk.choices[0]?.delta?.content || '');
  }


  return response;
}
