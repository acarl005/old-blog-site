(function(){
  var app = angular.module('andySite', ['ui.router']);

  app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    var pages = ['home', 'about-me', 'blog', 'education', 'portfolio', 'contact'];

    for (var i = 0; i < pages.length; i++) {
      var obj = {
        name: pages[i],
        url: '/'+pages[i],
        templateUrl: 'partials/'+pages[i]+'.html'
      };
      $stateProvider.state(obj);
    };

    var blogs = ['s1-teixobactin', 's2-prop-65', 't1-git-blog', 't2-css-design', 't3-arrays-hashes', 't4-enumerable-methods', 't5-ruby-classes', 't6-array-proc', 'c1-chefs-kitchen', 'c3-thinking-style', 'c4-tech-issues', 'c5-feedback', 'c6-stereotype-threat'];

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