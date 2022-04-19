const socket = io("http://localhost:3000");

function showMessage(message){
    $('.messages').append('<div class="message"><strong>'+ message.author +'</strong>: '+ message.message +'</div>');
 };
        
socket.on('messageLogs', function(messages){
    for(message of messages){
        showMessage(message);
    }
});

socket.on('receivedMessage', function(message){
    showMessage(message);
});

$('#chat').submit(function(event) {
    event.preventDefault();

    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if(author.length && message.length){
        var messageObject = {
             author: author,
            message: message,
         };

        showMessage(messageObject);
        socket.emit('sendMessage', messageObject);
        }
 });