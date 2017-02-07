var users = [
  { name: 'TJ', email: 'tj@vision-media.ca' },
  { name: 'Tobi', email: 'tobi@vision-media.ca' },
  { name: 'Tandrew', email: 'tobi@vision-media.ca' },
  { name: 'Tom', email: 'tobi@vision-media.ca' },
  { name: 'Stranger', email: 'tobi@vision-media.ca' }
];

exports.list = function(req, res){
  res.json(users)
 };

exports.view = function(req, res){
  res.json(users[req.params.id] || { error: 'Cannot find user' });
};

exports.update = function(req, res){
  var id = req.params.id;
  req.user = users[id];
  if (req.user) {
    req.user = users[req.params.id]
    req.user.name = req.query.name;
    req.user.email = req.query.email;
    res.json(req.user)
  }
  else {
    res.status(404).json({ error: 'cannot find user ' + id });
  }

};

exports.delete = function(req, res){

  var deletedIds = req.query.id

  for (i in deletedIds) {
      req.user = users[i]
      console.log(req.user);
      if(req.user){
        users.splice(i, 1);
      }
  }

  res.status(200).json(users);
};

//Private method to load all users internally before users/ api
exports.load = function(req, res, next){
  var id = req.params.id;
  req.user = users[id];
  if (req.user) {
    next();
  }
  else {
    // var err = new Error('cannot find user ' + id);
    res.status(404).json({ error: 'cannot find user ' + id });
    // next(err);
  }
};
