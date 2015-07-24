var app = angular.module('wwhApp', ['ngRoute', 'ngGrid']);

app.config(function($routeProvider){
	$routeProvider
	.when('/home', {
		controller: 'mainCtrl',
		templateUrl: 'mainCtrl/home.html'
	})
	.when('/about', {
		controller: 'aboutCtrl',
		templateUrl: 'aboutCtrl/about.html'
	})
	.when('/officers', {
		controller: 'officersCtrl',
		templateUrl: 'officersCtrl/officers.html'
	})
	.when('/bylaws', {
		controller: 'bylawsCtrl',
		templateUrl: 'bylawsCtrl/bylaw.html'
	})
	.when('/gbfaf', {
		controller: 'gbfafCtrl',
		templateUrl: 'gbfafCtrl/gbfaf.html'
	})
	.when('/library', {
		controller: 'libraryCtrl',
		templateUrl: 'libraryCtrl/library.html',
		resolve: { 
			booksRef: function(bookService){
				return bookService.getBooks();
			}
		}
	})
	.when('/maint', {
		controller: 'maintCtrl',
		templateUrl: 'maintCtrl/maint.html'
	})
	.when('/projects', {
		controller: 'projectsCtrl',
		templateUrl: 'projectsCtrl/projects.html'
	})
	.when('/guilds', {
		controller: 'guildsCtrl',
		templateUrl: 'guildsCtrl/guilds.html'
	})
	.when('/tech', {
		controller: 'techCtrl',
		templateUrl: 'techCtrl/tech.html'
	})
	.when('/retreat', {
		controller: 'retreatCtrl',
		templateUrl: 'retreatCtrl/retreat.html'
	})
	.when('/newsletter', {
		controller: 'newsletterCtrl',
		templateUrl: 'newsletterCtrl/newsletter.html'
	})
	.when('/pattern', {
		controller: 'patternCtrl',
		templateUrl: 'patternCtrl/pattern.html'
	})
	.when('/tt', {
		controller: 'thimbleCtrl',
		templateUrl: 'thimbleCtrl/thimble.html'
	})
	.when('/bookAdd',{
		controller: 'bookAddCtrl',
		templateUrl: 'bookAddCtrl/bookAdd.html'
	})
	.when('/bookDelete',{
		controller: 'bookDeleteCtrl',
		templateUrl: 'bookDeleteCtrl/bookDelete.html',
		resolve: { 
			booksRef: function(bookService){
				return bookService.getBooks();
			}
		}
	})
	.when('/bookUpdate',{
		controller: 'bookUpdateCtrl',
		templateUrl: 'bookUpdateCtrl/bookUpdate.html',
		resolve: { 
			booksRef: function(bookService){
				return bookService.getBooks();
			}
		}
	})
	.when('/calendar',{
		controller: 'calendarCtrl',
		templateUrl: 'calendarCtrl/calendar.html'
	})
	.when('/member',{
		controller: 'memberCtrl',
		templateUrl: 'memberCtrl/member.html'
	})
	.when('/contact', {
		controller: 'contactCtrl',
		templateUrl: 'contactCtrl/contact.html'
	})
	.otherwise('/home', {
		controller: 'mainCtrl',
		templateUrl: 'mainCtrl/home.html'
	});
});