/**
 * @swagger
 * resourcePath: /user-apiJs
 * description: All about User API. Get more details at http://swagger.io/specification/
 */

/**
 * @swagger
 * models:
 *   User:
 *     id: User
 *     properties:
 *       name:
 *         type: String
 *         required: true
 *       email:
 *         type: String
 *         required: true
 */
var users = [
  { name: 'TJ', email: 'tj@vision-media.ca' },
  { name: 'Tobi', email: 'tobi@vision-media.ca' },
  { name: 'Tandrew', email: 'tobi@vision-media.ca' },
  { name: 'Tom', email: 'tobi@vision-media.ca' },
  { name: 'Stranger', email: 'tobi@vision-media.ca' }
];

/**
 * @swagger
 * path: /users
 * operations:
 *   -  httpMethod: GET
 *      summary: Show all users
 *      notes: Returns user list
 *      responseClass: User
 *      nickname: user-list
 *      consumes:
 *        - text/html
 */
exports.list = function(req, res){
  res.json(users)
 };

 /**
  * @swagger
  * path: /user/{id}
  * operations:
  *   -  httpMethod: GET
  *      summary: Return a user with specific id
  *      notes: Returns a user based on id
  *      responseClass: User
  *      nickname: getUser
  *      produces:
  *       - application/json
  *      parameters:
  *        - name: id
  *          description: User id
  *          paramType: path
  *          required: true
  *          dataType: integer
  */
exports.view = function(req, res){
  res.json(users[req.params.id] || { error: 'Cannot find user' });
};

/**
 * @swagger
 * path: /user/{id}/edit
 * operations:
 *   -  httpMethod: PUT
 *      summary: Update user with specific id
 *      notes: Returns updated user based on id
 *      responseClass: User
 *      nickname: updateUser
 *      produces:
 *       - application/json
 *      parameters:
 *        - name: id
 *          description: User id
 *          paramType: path
 *          required: true
 *          dataType: integer
 *        - name: name
 *          description: User name
 *          paramType: query
 *          required: true
 *          dataType: string
 *        - name: email
 *          description: User email
 *          paramType: query
 *          required: true
 *          dataType: string
 */
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

/**
 * @swagger
 * path: /user/delete
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Delete user(s) with id array
 *      notes: Returns success or fail on deletion
 *      nickname: deleteUsers
 *      produces:
 *       - application/json
 *      parameters:
 *        - name: id
 *          description: User ids
 *          paramType: query
 *          required: true
 *          collectionFormat: multi
 *          dataType: array
 *          items:
 *             dataType: string
 */
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
