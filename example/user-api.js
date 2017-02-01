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
  { name: 'Tobi', email: 'tobi@vision-media.ca' }
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
  *          in: path
  *          description: User id
  *          paramType: query
  *          required: true
  *          dataType: integer
  */
exports.view = function(req, res){
  res.json(req.user)
};


exports.update = function(req, res){
  console.log(res);
  req.user.name = req.query.name;
  req.user.email = req.query.email;
  res.json(req.user)
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
