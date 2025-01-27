const express = require('express');
const cors = require('cors');
const DB = require('./db');
const app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.json());



app.get('/data', (req, res) => {
  DB.get(getFromDB => {
    console.log('CALL BACK FROM SERVER');
    res.json(getFromDB);
  });
});




app.post('/addNewTask', (req, res) => {
  let box = req.body;
  console.log('BOX:', box);
  DB.insert(insertIntoDB => {
    console.log('CALL BACK FROM SERVER');
    res.json(insertIntoDB);
  }, box);
});



app.delete('/delete/:id', (req, res) => {
  DB.remove(result => {
    res.json(result);
  }, req.params.id );


});


app.put('/edit/:id', (req, res) => {
  DB.edit(result => {
    res.json(result);
  }, req.params.id );


});
 
const PORT = 9000;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));
