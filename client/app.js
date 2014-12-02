// YOUR CODE HERE:

var app;
$(function() {
  app = {
//TODO: The current 'addFriend' function just adds the class 'friend'
//to all messages sent by the user
    server: 'http://127.0.0.1:8080/words',

    init: function() {     
      // Cache jQuery selectors
      app.$abstracts = $('#abstracts');
      app.$word = $('#word');
      app.$send = $('#send');

      app.$send.on('submit', app.handleSubmit);
    },
    send: function(data) {
      console.log("started sending");
      // POST the message to the server
      $.ajax({
        url: app.server,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
          console.log('writebetter: word sent');
          // Trigger a fetch to update the messages, pass true to animate
          app.fetch();
        },
        error: function (data) {
          console.error('writebetter: failed to send message');
          app.fetch();
        }
      });
    },
    fetch: function(animate) {
      $.ajax({
        url: app.server,
        type: 'GET',
        contentType: 'application/json',
//        data: { order: '-createdAt'},
        success: function(data) {
          console.log('writebetter: Messages fetched');
          console.log("data", data);
          // Don't bother if we have nothing to work with
//          if (!data.results || !data.results.length) { return; }
//          console.log("length", data.results[data.results.length-1]);
          // Get the last message
 //         var mostRecentMessage = data.results[data.results.length-1];
           
          // Only bother updating the DOM if we have a new message
        
            // Update the UI with the fetched messages
            app.populateMessages(data);
          
        },
        error: function(data) {
          console.error('writerbox: Failed to fetch messages');
        }
      });
    },
    clearMessages: function() {
      app.$abstracts.html('');
    },
    populateMessages: function(results) {
      // Clear existing messages
      app.clearMessages();
      if (Array.isArray(results)) {
        // Add all fetched messages
        results.forEach(app.addMessage);
      }
    },

    addMessage: function(data) {
        var $abstract = $('<div class="abstract"/>');
        $abstract.text(data);
        $abstract.append('<br />');
        app.$abstracts.append($abstract);      
    },

    handleSubmit: function(evt) {
      var message = app.$word.val();
      app.send(message);
      // Stop the form from submitting
      evt.preventDefault();
    },   
    
  };
}());
