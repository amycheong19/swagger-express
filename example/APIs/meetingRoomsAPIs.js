 /**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *   Error:
 *     type: object
 *     properties:
 *       code:
 *         type: integer
 *         format: int32
 *       message:
 *         type: string
 *       fields:
 *         type: string
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
   *   /users:
   *     get:
   *       description: GET `User` objects.
   *       tags:
   *         - User
   *       responses:
   *         '200':
   *           description: Return list of user's data
   *           schema:
   *             type: array
   *             items:
   *               $ref: '#/definitions/User'
   *         default:
   *           description: Unexpected error
   *           schema:
   *             $ref: '#/definitions/Error'
   */
exports.list = function(req, res){
  res.json(users)
 };

/**
  * @swagger
  *   /users/{id}:
  *     get:
  *       description: |
  *         Gets `User` object with specific id.
  *       tags:
  *         - User
  *       parameters:
  *         - in: path
  *           name: id
  *           description: GET user with specific id
  *           required: true
  *           type: integer
  *           format: int64
  *       responses:
  *         "404":
  *           description: User not found
  *         "200":
  *           description: Return user(specific id)'s data
  *           schema:
  *             $ref: "#/definitions/User"
  *         default:
  *           description: Unexpected error
  *           schema:
  *             $ref: '#/definitions/Error'
  */
exports.view = function(req, res){
  res.json(users[req.params.id] || { error: 'Cannot find user' });
};

/**
* @swagger
*  /users:
*     post:
*       description: |
*         Create a `User` object.
*       tags:
*         - User
*       parameters:
*         - name: users
*           in: body
*           description: User desc
*           required: true
*           schema:
*             properties:
*               users:
*                 type: array
*                 items:
*                   $ref: '#/definitions/User'
*       responses:
*         '200':
*           description: Profile information for a user
*           schema:
*             type: array
*             items:
*               $ref: '#/definitions/User'
*         default:
*           description: Unexpected error
*           schema:
*             $ref: '#/definitions/Error'
**/
exports.create = function(req, res){
  var newUser = { name: req.query.name, email: req.query.email }
  users.push(newUser)
  res.status(200).json(newUser)
};

/**
*   @swagger
*   /users/{id}:
*     put:
*       description: |
*         Update `User` object with specific id.
*       tags:
*         - User
*       parameters:
*         - in: path
*           name: id
*           description: UPDATE user with specific id
*           required: true
*           type: integer
*           format: int64
*         - in: query
*           name: name
*           description: User's new name
*           required: false
*           type: string
*         - in: query
*           name: email
*           description: User's new email
*           required: false
*           type: string
*       responses:
*         "404":
*           description: User not found
*         "200":
*           description: Return updated user's data
*           schema:
*             $ref: "#/definitions/User"
*         default:
*           description: Unexpected error
*           schema:
*             $ref: '#/definitions/Error'
*/
exports.update = function(req, res){
  var id = req.params.id;
  req.user = users[id];
  if (req.user) {
    req.user = users[req.params.id]
    req.user.name = req.query.name;
    req.user.email = req.query.email;
    res.status(200).json(req.user)
  }
  else {
    res.status(404).json({ error: 'cannot find user ' + id });
  }

};

/**
  *   @swagger
  *   /users:
  *     delete:
  *       description: |
  *         Delete `User` objects based on array of userIDs
  *       tags:
  *         - User
  *       parameters:
  *         - name: users
  *           in: query
  *           description: User desc
  *           required: true
  *           type: array
  *           items:
  *             type: integer
  *       responses:
  *         '200':
  *           description: Return remaining users objects
  *           schema:
  *             type: array
  *             items:
  *               $ref: '#/definitions/User'
  *         default:
  *           description: Unexpected error
  *           schema:
  *             $ref: '#/definitions/Error'
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
