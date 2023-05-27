import fs from 'fs';

const logger = (text: string) => {
  if (process.env.ENV === "test") {
    fs.appendFile('logs.txt', text + '\n', (err) => {
      if (err) throw err;
    })
  } else {
    console.log(text)
  };
}

export default logger