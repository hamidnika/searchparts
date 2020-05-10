var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://hamidniakan:376718989h@devconnector-n7j4l.mongodb.net/test?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true, }
);
var Schema = mongoose.Schema;

var userDataSchema = new Schema(
  {
    title: { type: String, required: false },
    description: String,
    authors: Array
  },
  { collection: "bookks" }
);

userDataSchema.index({'$**': 'text'});

var UserData = mongoose.model("UserData", userDataSchema);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

router.get("/get-data", function(req, res, next) {
  UserData.find().then(function(doc) {
    res.render("index", { items: doc });
  });
});

router.post("/search-data", function(req, res, next) {
  const regex = new RegExp(escapeRegex(req.body.word), 'gi')
  UserData.find({ description: regex }).then(function(doc) {
    res.render("index", { itemss: doc });
  });
});
router.post("/search-dataa", function(req, res, next) {
  const regex = new RegExp(escapeRegex(req.body.wordc), 'gi')
  UserData.find({ title: regex }).then(function(doc) {
    res.render("index", { itemssc: doc });
  });
});


router.post("/insert", function(req, res, next) {
  var item = {
    title: req.body.title,
    description: req.body.description,
    authors: req.body.authors
  };

  var data = new UserData(item);
  data.save();

  res.redirect("/");
});

router.post("/update", function(req, res, next) {
  var id = req.body.id;

  UserData.findById(id, function(err, doc) {
    if (err) {
      console.error("error, no entry found");
    }
    doc.title = req.body.title;
    doc.description = req.body.description;
    doc.authors = req.body.authors;
    doc.save();
  });
  res.redirect("/");
});

router.post("/delete", function(req, res, next) {
  var id = req.body.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect("/");
});

function escapeRegex (text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};




var userDataSchemajob = new Schema(
  {
    title: { type: String, required: false },
    description: String,
    authors: Array
  },
  { collection: "bookksjob" }
);

userDataSchema.index({'$**': 'text'});

var UserDatajob = mongoose.model("UserDatajob", userDataSchemajob);


router.get("/jobdata", function(req, res, next) {
  res.render("indexx");
});

router.get("/jobdata/get-datajob", function(req, res, next) {
  UserDatajob.find().then(function(doc) {
    res.render("indexx", { itemssss: doc });
  });
});

router.post("/jobdata/search-datajob", function(req, res, next) {
  const regex = new RegExp(escapeRegex(req.body.wordd), 'gi')
  UserDatajob.find({ title: regex }).then(function(doc) {
    res.render("indexx", { itemsss: doc });
  });
});
router.post("/jobdata/search-datajobb", function(req, res, next) {
  const regex = new RegExp(escapeRegex(req.body.worddd), 'gi')
  UserDatajob.find({ description: regex }).then(function(doc) {
    res.render("indexx", { itemsssd: doc });
  });
});

router.post("/jobdata/insertjob", function(req, res, next) {
  var itemm = {
    title: req.body.title,
    description: req.body.description,
    authors: req.body.authors
  };

  var data = new UserDatajob(itemm);
  data.save();

  res.redirect("/jobdata");
});

module.exports = router;
