const express = require('express');
const app = express();
const port = 5000;
var pool = require('./routes/pool')



function write(tog,temp, req,res){
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate())
  console.log(date)
  
  // pool.query("DELETE FROM Toggle",(err, result)=>{

  // })

  // pool.query(`INSERT INTO Toggle(id,toggle,date,temperature)
  // VALUES(${1}, ${0},"${date}", ${56})`,(error,result) =>{
  //          if(error){
  //              res.send(error)
  //          }else{
  //           res.send("hui")
  //          }
  // })

  pool.query(`UPDATE Toggle SET id=1, toggle=${tog},  date="${date}", temperature=${temp} WHERE id = 1`,(error,result) =>{
    if(error){
      res.send(error);
    }else{
      res.send("Sucess, state is changed")
    }
  })
}

app.get('/write/:tog/:temp', (req,res) =>{
  write(req.params.tog, req.params.temp, req, res)
})

app.get('/set_state/:top', (req, res) =>{
  write(req.params.top, 0, req, res)
})


app.get('/get', (req, res) => {
  // res.send('Hello World!');
  pool.query('SELECT * FROM Toggle',(error,result) =>{
    if(error){
        res.send(error);
    }else{
        res.send(result)
    }
})
})


app.listen(process.env.port || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
