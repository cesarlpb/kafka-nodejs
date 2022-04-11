# kafka-nodejs

A simple NodeJs project to publish and consume messages on Kafka using a custom schema and passing the number of messages with a route parameter for simplicity.

### Main files overview

**`app.js`** - Creates the Express server to provide a browser client to send the messages
**`kafka.js`** - Producer, finds the schema and connect to Kafka to publish the messages, groupId is *app-example*. Only uses value, no key.
**`user.kafka.js`** - Consumer, reads messages from a topic, set to *info-users* as an example and uses the version 1

## How to use it

1. Use `docker-compose up -d` to install the dependencies listed on **`docker-compose.yml`**
2. Use `npm install` to download the **`node_modules`**
3. With the cluster running, start the NodeJs project with `node app.js`

### Schema 

The sample schema for the messages can be found in the **`schemas\info-users\value.json`** file

Navigate to [http://localhost:9031](http://localhost:9031) to see the Control Center. **Note:** you can check status of cluster with `docker-compose ps` and restart the Control Center with `docker-compose restart control-center` if needed.

- Create a Topic
![Creating a topic](/img/topic-creation.PNG)
- Adding a new schema
![Adding new schema](/img/creating-schema.PNG)
- Sample schema
![Adding new schema](/img/sample-schema.PNG)

**Note:** you may need to add the topic and the schema if the console shows an error once the project is running. The schema used in this test is the following (in AVRO):
~~~
{
    "doc": "Sample schema to help you get started.",
    "fields": [
      {
        "doc": "User email",
        "name": "email",
        "type": "string"
      },
      {
        "doc": "Indicates if the user is new",
        "name": "isNew",
        "type": "boolean"
      },
      {
        "default": null,
        "doc": "Message from the user",
        "name": "message",
        "type": [
          "null",
          "string"
        ]
      }
    ],
    "name": "value_info_users",
    "namespace": "com.mycompany.mynamespace",
    "type": "record"
}

~~~

## Receiving Messages
With the cluster running and the NodeJs project in execution, sending messages is simple:

- Navigate to [http://localhost:3000/send-message](http://localhost:3000/send-message). Every time you refresh this page, the Control Center will show a message with id as -1:

![Message](/img/messages.PNG)
- To send several messages simply add /number to the route, for instance, [http://localhost:3000/send-message/10000](http://localhost:3000/send-message/10000):

![10k messages](/img/10k-msg.PNG)

**Note:** `app.js` handles the 10k messages in about 1-2 minutes but Kafka takes several minutes to process them from the local queue into the Control Center > Messages section; around 15-16 minutes but this may vary. 
