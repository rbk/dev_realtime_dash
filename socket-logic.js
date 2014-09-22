var mongoose = require('mongoose');
var Message = mongoose.model( 'Message' );

module.exports = function(io){
    io.on('connection', function(socket){

        socket.emit('your socket id', socket.id);

        Message.find({}).sort('date').limit(10).exec(function (err, messages) {
            if (err) return console.error(err);
            socket.emit('connected', messages);
        });

    }); // end io connect
}