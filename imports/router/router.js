Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('home');
});

Router.route('/rooms/:_id', function() {
  this.render('game', {
    data: function() {
      return {_id:this.params._id};
    }
  });
});