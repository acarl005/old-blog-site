(function(){
  var app = angular.module('andySite', ['ui.router']);

  app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider.state({
      name: 'home',
      url: '/',
      templateUrl: 'partials/home.html',
      data: 0
    });

    var pages = ['about-me', 'blog', 'education', 'portfolio', 'contact'];

    for (var i = 0; i < pages.length; i++) {
      var obj = {
        name: pages[i],
        url: '/'+pages[i],
        templateUrl: 'partials/'+pages[i]+'.html',
        data: i + 1
      };
      $stateProvider.state(obj);
    };

    var blogs = ['s1-teixobactin', 's2-prop-65', 's3-chemophobia', 't1-git-blog', 't2-css-design', 't3-arrays-hashes', 't4-enumerable-methods', 't5-ruby-classes', 't6-array-proc', 't7-javascript', 'c1-chefs-kitchen', 'c3-thinking-style', 'c4-tech-issues', 'c5-feedback', 'c6-stereotype-threat'];

    for (var i = 0; i < blogs.length; i++) {
      var obj = {
        name: blogs[i],
        url: '/blog/'+blogs[i],
        templateUrl: 'blog/'+blogs[i]+'.html'
      };
      $stateProvider.state(obj);
    };

  });

})();

function menu() {
  $('.menu').click(function() {
    $('nav a').slideToggle();
  });
}

$(document).ready(menu)