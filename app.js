const express = require('express')
const { writeUserDataToKafka, readMessages } = require('./user.kafka')

const app = express()
const port = 3000


readMessages()


app.get('/send-message/:id?', async (req, res) => {
  var id = req.params.id;
  // Sending several messages to Kafka with loop
  if(id > 0){
    let i = 1;
    do{
      await writeUserDataToKafka({ email: `email${i}@domain.com`, isNew: false, message: `Random msg #${i}` });
      i++;
    } while (i <= id);
    
  } else {
    id = -1;  // parameter not received
    await writeUserDataToKafka({ email: `email${id}@domain.com`, isNew: false, message: `This is message #${id}` });
  }

  res.send(`Hello World! id: ${id}`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})