window.app = angular.module('mean', ['ngCookies', 'ngRoute', 'ngResource', 'ui.bootstrap', 'ui.router', 'ui.select2', 'ui.date','angularFileUpload',  'mean.system', 'mean.articles', 'mean.contacts','dialog.controllers', 'dialog.services', 'dialogs']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.contacts', []);
angular.module('dialog.controllers', []);
angular.module('dialog.services', []);
angular.module('dialogs', []);
