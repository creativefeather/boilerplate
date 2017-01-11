var MongoClient = require('mongodb').MongoClient,
    ObjectID    = require('mongodb').ObjectID,
    assert      = require('assert');

module.exports = function(app) {
  // Index
  app.get('/todos/index', function(req, res, next) {
    let uri = app.get('db.uri');

    MongoClient.connect(uri, function(error, db) {
      assert.equal(null, error);

      db.collection('todos').find().toArray(
      function(error, docs) {
        assert.equal(null, error);

        db.close();
        res.render('todos/todos', {
          todos: docs
        });
      });
    }); // End MongoClient.connect()
  }); // End Index

  // Create
  app.post('/todos', function(req, res, next) {
    let uri = app.get('db.uri');

    MongoClient.connect(uri, function(error, db) {
      assert.equal(null, error);
      
      db.collection('todos')
      .insert(req.body, function(error, result) {
        assert.equal(null, error);

        db.close();
        res.json(result.ops[0]);
      });
    }); // End MongoClient.connect()
  }); // End Create

  // Read
  app.get('/todos', function(req, res, next) {
    let uri = app.get('db.uri');

    MongoClient.connect(uri, function(error, db) {
      assert.equal(null, error);
      
      db.collection('todos').find().toArray(
      function(error, docs) {
        assert.equal(null, error);

        db.close();
        res.json(docs);
      });
    }); // End MongoClient.connect()
  }); // End Read

  // Update
  app.patch('/todos', function(req, res, next) {
    let uri = app.get('db.uri');
  });

  // Delete
  app.delete('/todos', function(req, res, next) {
    let uri = app.get('db.uri');

    MongoClient.connect(uri, function(error, db) {
      assert.equal(null, error);
      let _id = req.body._id;
      
      db.collection('todos').deleteOne({ _id: ObjectID(_id) }, 
      function(error, result) {
        assert.equal(null, error);

        db.close();
        res.json({
          _id: result.result.n > 0 ? _id : null,
          ok: result.result.ok,
          n: result.result.n
        });
      });      
    }); // End MongoClient.connect()
  }); // End Delete
}