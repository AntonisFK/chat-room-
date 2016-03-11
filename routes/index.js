module.exports = function Route (app, server){
   
//create variables for users and message 
  var users = [];
  var messages = []; 

// create a function to check if username has been taking 
  var is_user = function(user){
    var users_count = users.length;

    for(var i=0; i< users_count; i++){
      if(user == users[i]){
        return true;
      }
    }
    return false; 
  }
// route and render template also pass session id 
  app.get('/', function(req, res){
     var sid = req.sessionID;
    res.render('index', {sessionid:sid })
    // change code to use session id
  })

  // open socket 
  var io = require('socket.io').listen(server)

   io.sockets.on('connection', function (socket){
      // grab user name and check if has been taken 
      socket.on("page_load", function (data){
        if(is_user(data.user) === true ){
          // if taking send message that is has been taken 
          socket.emit("existing_user", {error: "This user alreay exits"})
        } else {
          // add user to the users object and send user and message 
          users.push(data.user);
          socket.emit("load_messages", {current_user: data.user, messages: messages})
        }

      })
      // recives the new message and adds them to messages object
      socket.on("new_message", function(data){
        messages.push({name: data.user, message: data.message});
        // send to all users a new message with new data 
        io.emit("post_new_message", {new_message: data.message, user: data.user});
      })

  });
}