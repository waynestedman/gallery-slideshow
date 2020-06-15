const fs = require('fs');
const path = require('path');

/* create _assets folder */
fs.mkdir('_assets', (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Directory created successfully!');
});

/* Transform png into jpg & Copy file into _assets dir */
fs.copyFile('./src/cat.png', './_assets/cat.jpg', (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('File copy complete!');
});