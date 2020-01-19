const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient, ObjectID } = require('mongodb')
const assert = require('assert')

const app = express()
app.use(bodyParser.json())

const MongoUrl = "mongodb://localhost:27017"
const dataBase = "contactList"

MongoClient.connect(MongoUrl,  { useUnifiedTopology: true }, (err, client) => {
    assert.equal(err, null, "dataBase connexion failed")
    const db = client.db(dataBase)

    app.post('/add-contact', (req, res) => {
        let newContact = req.body
        db.collection('contactList').insertOne(newContact, (err,data) => {
            if (err) res.send('can not add new contact')
            else res.send("contact added")
        })
    })

    app.get('/contacts', (req, res) => {
        db.collection('contactList').find().toArray( (err,data) => {
            if (err) res.send('can not get contacts')
            else res.send(data)
        })
    })

    app.get('/contacts/:id', (req, res) => {
        let contactId = ObjectID(req.params.id)
        db.collection('contactList').findOne({ _id: contactId }, (err, data) => {
            if (err) res.send('can not get a contact')
            else res.send(data)
        })
    })

    app.put("/edit-contact/:id", (req, res) => {
        let contactId = ObjectID(req.params.id)
        let updatedContact = req.body
        db.collection("contactList").findOneAndUpdate({ _id: contactId },
            { $set: { ...updatedContact } }, (err, data) => {            
                if (err) res.send('can not update contact')
                else res.send(data)
            })
    })

    app.delete('/delete-contact/:id', (req, res) => {
        let removeContact = ObjectID(req.params.id)
        db.collection('contactList').findOneAndDelete({ _id: removeContact }, (err, data) => {
            if (err) res.send('can not delete contact')
            else res.send('contact was deleted')
        })
    })
})
app.listen(3007, (err, data) => {
    if (err) console.log('server error')
    else console.log('server is running on port 3007')
})