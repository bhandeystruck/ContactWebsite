var MongoClient = require('mongodb').MongoClient;
//mongodb module
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb+srv://abhanda1:Bh@ndari199@cluster0.2eicv.mongodb.net/Cluster0?retryWrites=true&w=majority";

const mongoOptions ={ useUnifiedTopology: true }


exports.build = function(){
    MongoClient.connect(url,mongoOptions ,function(err, db){
        if (err){
            console.error(err);
            return;
        }
        console.log("Established connection to the database");

        database = db.db("contacts");
      
        //database.createCollection('contacts');
      
    })
}

exports.addContact = function(contact){
    database.collection('contacts').insertOne({
        FirstName: contact['firstname'],
        LastName: contact['lastname'],
        Prefix: contact['prefix'],
        Street: contact['street'],
        City: contact['city'],
        State: contact['state'],
        Zip: contact['zip'],
        Phone: contact['phone'],
        Email: contact['email'],
        ContactbyMail: contact['contactbymail'],
        ContactbyEmail: contact['contactbyemail'],
        ContactbyPhone: contact['contactbyphone'],
        Longitude: contact['longitude'],
        Latitude: contact['latitude']
    }, function(err, result){
        console.log('ID returned: '+ result.insertedId);
    })
}

exports.displayContacts = function(query, callback){
    database.collection('contacts').find().toArray(function(err, result){
        var dataset = [];
        if(err){
            console.log(err);
            callback(err, null);
        } else if (result.length > 0){
            console.log("returned result length: " + result.length);
            for (each of result){
                //console.log('pushing');
                dataset.push(each);
            }
            callback(null, dataset);
        } else {
            console.log("Empty Database!");
            callback(null, null);
        }
    });
}

exports.updateContact = function (contact, callback){
    console.log(contact);

    database.collection('contacts').updateOne({"_id" : ObjectID(contact.id)}, {
        $set : {
            FirstName: contact['firstname'],
            LastName: contact['lastname'],
            Prefix: contact['prefix'],
            Street: contact['street'],
            City: contact['city'],
            State: contact['state'],
            Zip: contact['zip'],
            Phone: contact['phone'],
            Email: contact['email'],
            ContactbyMail: contact['contactbymail'],
            ContactbyEmail: contact['contactbyemail'],
            ContactbyPhone: contact['contactbyphone'],
            Longitude: contact['longitude'],
            Latitude: contact['latitude']
        }
    }, function(err, result){
        callback(err, result);
    });
}

exports.deleteContact = function(contact, callback){
    database.collection('contacts').deleteOne({"_id": ObjectID(contact)}, 
        function (err, result) {
            //console.log("in d b" + result);
            callback(err,result);
        }
    )
};



