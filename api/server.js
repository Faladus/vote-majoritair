var express = require('express');
const cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var app = express();


const SurveyStatus = {
  Creer: 'Créer',
  Publier: 'Publier',
  Terminer: 'Terminer'
}

const options = {
  origin: true,
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": true,
  "Access-Control-Allow-Headers": true,
  "Access-Control-Expose-Headers": true
};

app.use(express.json({
  limit: '50mb'
}));
app.use(cors(options));

var url = "mongodb://happy-gfi-survey:TCJTYGIRpggpGwsroS8jaRxJvf4bmoBHVpROyfaLOFOYfjPG9jjRUNhoJFqSoFgD39S9Yg8BDgM6LxOAdkSp7g%3D%3D@happy-gfi-survey.documents.azure.com:10255/?ssl=true";



/*#region SURVEY */
/*#region GET all Survey in Creation*/
app.get('/listSurveysCreation', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    db = client.db("happygfisurvey");

    db.collection("surveys").find({
      Status: SurveyStatus.Creer
    }).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      client.close();
    });
  });
})
/*#endregion*/

/*#region GET all open Survey*/
app.get('/listSurveysOpen', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    db = client.db("happygfisurvey");

    db.collection("surveys").find({
      Status: SurveyStatus.Publier
    }).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      client.close();
    });
  });
})
/*#endregion*/

/*#region GET all closed Survey*/
app.get('/listSurveysClosed', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    db = client.db("happygfisurvey");

    db.collection("surveys").find({
      Status: SurveyStatus.Terminer
    }).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      client.close();
    });
  });
})
/*#endregion*/

/*#region GET Survey by id*/
app.get('/survey', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    // Get ID
    let id = req.query.id.length == 24 ? ObjectID(req.query.id) : "";

    db = client.db("happygfisurvey");

    db.collection("surveys").findOne({
      _id: id
    }, function (err, result) {
      if (err) throw err;
      res.json(result);
      client.close();
    });
  });
})
/*#endregion*/

/*#region CREATE Survey*/
app.post('/createSurvey', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    db = client.db("happygfisurvey");

    // document to be inserted
    var doc = req.body;

    // insert document to 'users' collection using insertOne
    db.collection("surveys").insertOne(doc, function (err, result) {
      if (err) throw err;
      console.log("Survey created");

      res.end();
      // close the connection to db when you are done with it
      client.close();
    });
  });
})
/*#endregion */

/*#region PUBLISH Survey by id*/
app.post('/publishSurvey', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    // Get ID
    let id = req.query.id.length == 24 ? ObjectID(req.query.id) : "";

    db = client.db("happygfisurvey");

    db.collection('surveys').updateOne({
      _id: id
    }, {
      $set: {
        Status: SurveyStatus.Publier
      }
    }, function (err, result) {
      if (err) throw err;
      console.log("Survey Updated");

      res.end();
      // close the connection to db when you are done with it
      client.close();
    });
  });
})
/*#endregion */

/*#region CLOSE Survey by id*/
app.post('/closeSurvey', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    // Get ID
    let id = req.query.id.length == 24 ? ObjectID(req.query.id) : "";

    db = client.db("happygfisurvey");

    db.collection('surveys').updateOne({
      _id: id
    }, {
      $set: {
        Status: SurveyStatus.Terminer
      }
    }, function (err, result) {
      if (err) throw err;
      console.log("Survey Updated");

      res.end();
      // close the connection to db when you are done with it
      client.close();
    });
  });
})
/*#endregion */

/*#region DELETE Survey by id*/
app.delete('/deleteSurvey', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    // Get ID
    let id = req.query.id.length == 24 ? ObjectID(req.query.id) : "";
    
    db = client.db("happygfisurvey");

    db.collection('surveys').deleteOne({
      _id: id
    }, function (err, result) {
      if (err) throw err;
      console.log("Survey deleted");

      db.collection('answers').deleteMany({
        idTemplate: req.query.id
      }, function (err, result) {
        console.log("Answers deleted");
        res.end();
        // close the connection to db when you are done with it
        client.close();
      });
    });
  });
})
/*#endregion */

/*#region UPDATE Survey*/
app.post('/updateSurvey', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    db = client.db("happygfisurvey");

    // document to be inserted
    var doc = req.body;

    // Get ID
    let id = doc._id.length == 24 ? ObjectID(doc._id) : "";

    //On supprime l'id car on ne peut pas l'override
    delete doc._id;

    db.collection('surveys').updateOne({
      _id: id
    }, {
      $set: doc
    }, false, function (err, result) {
      if (err) throw err;
      console.log("Survey updated");

      res.end();
      // close the connection to db when you are done with it
      client.close();
    });
  });
})
/*#endregion */

/*#region liste la somme des Survey par status */
app.get('/countSurveys', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    db = client.db("happygfisurvey");

    db.collection("surveys").aggregate([{
      $group: {
        _id: null,
        //Count where Status = 0
        statusInProgress: {
          $sum: {
            $cond: [{
              $eq: ["$Status", SurveyStatus.Creer]
            }, 1, 0]
          }
        },
        //Count where Status = 1
        surveysRemaining: {
          $sum: {
            $cond: [{
              $eq: ["$Status", SurveyStatus.Publier]
            }, 1, 0]
          }
        },
        //Count where Status = 2
        surveysEnded: {
          $sum: {
            $cond: [{
              $eq: ["$Status", SurveyStatus.Terminer]
            }, 1, 0]
          }
        }
      }
    }]).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      res.end();
      client.close();
    });

  })
})
/*#endregion */
/*#endregion*/

/*#region ANSWER */
/*#region SEND Answer */
app.post('/sendAnswer', function (req, res) {

  MongoClient.connect(url, function (err, client) {
    if (err) throw err;

    db = client.db("happygfisurvey");

    // document to be inserted
    var doc = req.body;

    // insert document to 'users' collection using insertOne
    db.collection("answers").insertOne(doc, function (err, result) {
      if (err) throw err;
      console.log("Answer created");

      res.end();
      // close the connection to db when you are done with it
      client.close();
    });
  });
})
/*#endregion */

/*#region GET Answers by Survey ID*/
app.get('/answers', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    // Get ID
    let id = req.query.id.length == 24 ? ObjectID(req.query.id) : "";

    db = client.db("happygfisurvey");

    //Get survey generale Info
    db.collection("surveys").findOne({
      _id: id
    }, {
      projection: {
        _id: 1,
        Title: 1,
        Status: SurveyStatus.C
      }
    }, function (err, Infos) {
      if (err) throw err;

      //Get total the total number of answers
      db.collection("answers").find({
        idTemplate: req.query.survey
      }).count(function (err, NbAnswer) {
        if (err) throw err;

        //Get all the Answers
        db.collection("answers").find({
          idTemplate: req.query.survey
        }, {
          projection: {
            _id: 0,
            QuestionList: 1
          }
        }).toArray(function (err, data) {
          if (err) throw err;

          //Tableau de réponse par question
          var ResponseTab = [];

          for (var element of data) {
            for (var question of element.QuestionList) {

              //La question existe déjà → on ajoute une nouvelle réponse
              if (ResponseTab.length >= question.Numero) {

                ResponseTab = addResonseToQuestion(question, ResponseTab);
              }
              //La question n'existe pas → on ajoute la question et la réponse
              else if (ResponseTab.length < question.Numero) {

                ResponseTab = addQuestionWithAnswer(question, ResponseTab);
              }
            }
          }
          var _id = Infos._id;
          var Title = Infos.Title;
          var Status = Infos.Status;
          res.json({
            _id,
            Title,
            Status,
            NbAnswer,
            ResponseTab
          });
          client.close();
        });
      });
    });
  });
})
/*#endregion*/
/*#endregion */

/*#region EVENEMENT */
/*#region Créer un nouvel Evenement */
app.post('/createEvenement', function (req, res) {
  if (req.body.Image == null || req.body.Image.Size < 5000000) {
    MongoClient.connect(url, {
      useNewUrlParser: true
    }, function (err, client) {
      if (err) throw err;

      db = client.db("happygfisurvey");

      //Insert evenement to "evenements" collection
      db.collection("events").insertOne(req.body, function (err, result) {
        if (err) throw err;
        console.log("Evenement created");

        res.end();
        client.close();
      });
    });
  } else {
    res.status(500).send('Image size is to high');
  }
});
/*#endregion*/

/*#region liste la somme des evenements par status */
app.get('/countEvenements', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    var date = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(date.getDate() + 1);

    db = client.db("happygfisurvey");

    db.collection("events").aggregate([{
      $group: {
        _id: null,
        //Count where (DateDebut > now || (DateFin != null && DateFin > now))
        evenementsComing: {
          $sum: {
            $cond: [{
              $gt: ["$DateDebut", date.toISOString()]
            }, 1, 0]
          }
        },
        //Count where ((DateDebut > now && DateDebut < tomorrow) || (DateDebut < now && DateFin != null && DateFin > now))
        evenementsInProgress: {
          $sum: {
            $cond: [{
              $or: [{
                $and: [{
                  $lt: ["$DateDebut", date.toISOString()]
                }, {
                  $gt: ["$DateDebut", tomorrow.toISOString()]
                }]
              }, {
                $and: [{
                  $lt: ["$DateDebut", date.toISOString()]
                }, {
                  $not: {
                    $eq: ["$DateFin", null]
                  }
                }, {
                  $gt: ["$DateFin", date.toISOString()]
                }]
              }]
            }, 1, 0]
          }
        },
        //Count where (DateDebut < now && (DateFin == null || DateFin < now))
        evenementsEnded: {
          $sum: {
            $cond: [{
              $and: [{
                $lt: ["$DateDebut", date.toISOString()]
              }, {
                $or: [{
                  $eq: ["$DateFin", null]
                }, {
                  $lt: ["$DateFin", date.toISOString()]
                }]
              }]
            }, 1, 0]
          }
        },
      }
    }]).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      res.end();
      client.close();
    });

  })
})
/*#endregion*/

/*#region Récupère un nombre (tous si nb == null) donné d'évenements*/
app.post('/getEvenements', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    var date = new Date();

    db = client.db("happygfisurvey");

    db.collection("events").find({
      $and: [{
          $or: [{
              DateDebut: {
                $gt: date.toISOString()
              }
            },
            {
              $and: [{
                  DateFin: {
                    $exists: true
                  }
                },
                {
                  DateFin: {
                    $gt: date.toISOString()
                  }
                }
              ]
            }
          ]
        },
        {
          Image: {
            $exists: true
          }
        }
      ]
    }).sort({
      "DateDebut": 1
    }).limit(req.body.nbEvenements != null ? req.body.nbEvenements : 0).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      client.close();
    });
  })
})

/*#endregion*/

/*#region GET all open Evenements*/
app.get('/listEvenementsCreation', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    var date = new Date();

    db = client.db("happygfisurvey");

    db.collection("events").find({
      DateDebut: {
        $gt: date.toISOString()
      }
    }).sort({
      "DateDebut": 1
    }).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      client.close();
    });
  });
})
/*#endregion*/

/*#region GET all published Evenements*/
app.get('/listEvenementsOpen', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    var date = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(date.getDate() + 1);

    db = client.db("happygfisurvey");

    db.collection("events").find({
      $or: [{
          $and: [{
            DateDebut: {
              $lt: date.toISOString()
            }
          }, {
            DateDebut: {
              $gt: tomorrow.toISOString()
            }
          }]
        },
        {
          $and: [{
            DateDebut: {
              $lt: date.toISOString()
            }
          }, {
            DateFin: {
              $exists: true
            }
          }, {
            DateFin: {
              $gt: date.toISOString()
            }
          }]
        }
      ]
    }).sort({
      "DateDebut": 1
    }).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      client.close();
    });
  });
})
/*#endregion*/

/*#region GET all closed Evenements*/
app.get('/listEvenementsClosed', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    var date = new Date();

    db = client.db("happygfisurvey");
    db.collection("events").find({
      $and: [{
        DateDebut: {
          $lt: date.toISOString()
        }
      }, {
        $or: [{
          DateFin: {
            $exists: false
          }
        }, {
          DateFin: {
            $lt: date.toISOString()
          }
        }]
      }]
    }).sort({
      "DateDebut": 1
    }).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      client.close();
    });
  });
})
/*#endregion*/

/*#region Ajouter participants à un évenement*/
app.post('/addEvenementParticipants', function (req, res) {
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    db = client.db("happygfisurvey");

    //Id de l'evenement
    var id = new ObjectID(req.body.id);

    //Participants à ajouter
    var participants = req.body.participants;

    db.collection('events').updateOne({
      _id: id
    }, {
      $push: {
        Participants: {
          $each: participants
        }
      }
    }, false, function (err, result) {
      if (err) throw err;
      console.log("Evenement updated");

      res.end();
      // close the connection to db when you are done with it
      client.close();
    });
  });
})
/*#endregion*/

/*#region DELETE evenement by id*/
app.delete('/deleteEvenement', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    db = client.db("happygfisurvey");

    //id de l'evenment à supprimer
    var id = new ObjectID(req.query.id);

    db.collection('events').deleteOne({
      _id: id
    }, function (err, result) {
      if (err) throw err;
      console.log("Evenement deleted");

      res.end();
      // close the connection to db when you are done with it
      client.close();
    });
  });
})
/*#endregion*/

/*#region GET event by id*/
app.get('/getEvenement', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    // Get ID
    let id = req.query.id.length == 24 ? ObjectID(req.query.id) : "";

    db = client.db("happygfisurvey");

    db.collection("events").findOne({
      _id: id
    }, function (err, result) {
      if (err) throw err;
      res.json(result);
      client.close();
    });
  });
})
/*#endregion*/

/*#region UPDATE Evenement*/
app.post('/updateEvenement', function (req, res) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) throw err;

    db = client.db("happygfisurvey");

    // req.queryument to be inserted
    var doc = req.body;

    // Get ID
    let id = doc._id.length == 24 ? ObjectID(doc._id) : "";

    //On supprime l'id car on ne peut pas l'override
    delete doc._id;

    db.collection('events').updateOne({
      _id: id
    }, {
      $set: doc
    }, false, function (err, result) {
      if (err) throw err;
      console.log("Event updated");

      res.end();
      // close the connection to db when you are done with it
      client.close();
    });
  });
})
/*#endregion*/

/*#endregion*/

var portNumber = 3000;

app.listen(portNumber, () => {
  console.log("/*****************************************************/");
  console.log("/*                                                   */");
  console.log("/*            HAPPY GFI SURVEY API                   */");
  console.log("/*                                                   */");
  console.log("/*****************************************************/\n");

  console.log("Server running on port " + portNumber);
});

/*#region METHODS */
function addResonseToQuestion(question, ResponseTab) {
  switch (question.Type) {

    //Checkbox
    case 1:
      var checkbox = question.CheckboxTab.find(function (checkbox) {
        return checkbox.IsChecked;
      })

      ResponseTab[question.Numero - 1].Answers[checkbox.Numero - 1] = {
        "Number": ResponseTab[question.Numero - 1].Answers[checkbox.Numero - 1].Number + 1,
        "Description": checkbox.Description
      };
      break;

      //Text
    case 2:
      ResponseTab[question.Numero - 1].Answers.push({
        "TextAnswer": question.TextAnswer
      });
      break;

      //Rate
    case 3:
      ResponseTab[question.Numero - 1].Answers[question.RateAnswer - 1] = {
        "Number": ResponseTab[question.Numero - 1].Answers[question.RateAnswer - 1].Number + 1,
        "RateAnswer": question.RateAnswer
      };
      break;
  }
  return ResponseTab;
}

function addQuestionWithAnswer(question, ResponseTab) {
  var answerArray = [];
  switch (question.Type) {

    //Checkbox
    case 1:

      //on ajoute toute les options
      question.CheckboxTab.forEach(checkbox => {

        if (checkbox.IsChecked) {
          answerArray.push({
            "Number": 1,
            "Description": checkbox.Description
          });
        } else {
          answerArray.push({
            "Number": 0,
            "Description": checkbox.Description
          });
        }
      });

      ResponseTab.push({
        "Numero": question.Numero,
        "Title": question.Title,
        "Type": question.Type,
        "Answers": answerArray
      });

      break;

      //Text
    case 2:
      ResponseTab.push({
        "Numero": question.Numero,
        "Title": question.Title,
        "Type": question.Type,
        "Answers": [{
          "TextAnswer": question.TextAnswer
        }]
      });
      break;

      //Rate
    case 3:

      for (var i = 1; i < 6; i++) {
        if (i == question.RateAnswer) {
          answerArray.push({
            "Number": 1,
            "RateAnswer": i
          });
        } else {
          answerArray.push({
            "Number": 0,
            "RateAnswer": i
          });
        }
      }

      ResponseTab.push({
        "Numero": question.Numero,
        "Title": question.Title,
        "Type": question.Type,
        "Answers": answerArray
      });
      break;
  }

  return ResponseTab;
}
/*#endregion*/