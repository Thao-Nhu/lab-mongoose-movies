const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity'); 

const dbName = 'celebrity-project';
mongoose.connect(`mongodb://localhost/${dbName}`).catch(err=>console.error(err));

// the datas:
const celebrities = [
  {
    name: "Tom Cruise",
    occupation: "actor",
    catchPhrase: "TC",
  },
  {
    name: "Beyonce",
    occupation: "singer",
    catchPhrase: "BY",
  },
  {
    name: "Daffy Duck",
    occupation: "comedian",
    catchPhrase: "DD",
  }
]


Celebrity.create(celebrities, (err) => { // on n'utilise pas de promesse mais une fonction call back error first
  if (err) { throw(err) }
  console.log(`Created ${celebrities.length} celebrities`);
  // Once created, close the DB connection
  mongoose.connection.close();
});
