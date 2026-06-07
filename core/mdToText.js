import { convert } from 'html-to-text'
import markdownit from 'markdown-it'


//converts markdown to text
export function mdToText(input) {


  const md = markdownit()
  const result = md.render(input); //converts markdown to html

  const options = { wordwrap: null, }; //options for "html-text"
  const html = result;
  const text = convert(html, options);//converts html to text
  return text;
}
