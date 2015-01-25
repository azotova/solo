// YOUR CODE HERE:

var app;
$(function() {
  app = {
    server: 'http://localhost:3000/words',
    message: "",

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
          // Trigger a fetch to update the messages
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
          app.populateMessages(data);
          app.makeBold(app.message);          
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

    addMessage: function(data, i) {
        var $abstract = $('<div class="abstract"/>');
        $abstract.text(data[0]);
        $abstract.append('<br>');
        var j = i+1;
        var numDiv = '<span>'+j+'. </span>';
        var source = '<span class = "source"> '+data[1]+' </span>';
        $abstract.prepend(numDiv);
        $abstract.append(source);
        app.$abstracts.append($abstract);      
    },

    makeBold: function(word) {
      var html = $('#abstracts').html();
      var re = new RegExp (word, "g");
      console.log("bolding", word);
      $('#abstracts').html(html.replace(re, '<strong>$&</strong>'));
    },

    handleSubmit: function(evt) {
      app.message = app.$word.val();
      app.send(app.message);
      // Stop the form from submitting
      evt.preventDefault();
    },   
    
  };
}());
