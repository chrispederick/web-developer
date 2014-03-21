module.exports = function(grunt)
{
  // Configuration
  grunt.initConfig(
  {
    csslint:
    {
      src: ['source/**/*.css', '!source/common/style-sheets/common/bootstrap/*.css', '!source/common/style-sheets/common/codemirror/*.css'],
      options: { csslintrc: '.csslintrc' }
    },
    jshint:
    {
      files: ['source/**/*.js', '!source/chrome/javascript/common/jquery/*.js', '!source/common/javascript/common/bootstrap/*.js', '!source/common/javascript/common/codemirror/*.js', '!source/common/javascript/common/jquery/*.js', '!source/common/javascript/generated/beautify/*.js'],
      options:
      {
        force: true,
        jshintrc: '.jshintrc'
      }
    },
    jscs:
    {
      files: ['source/**/*.js', '!source/chrome/javascript/common/jquery/*.js', '!source/common/javascript/common/bootstrap/*.js', '!source/common/javascript/common/codemirror/*.js', '!source/common/javascript/common/jquery/*.js', '!source/common/javascript/generated/beautify/*.js'],
      options:
      {
        config: '.jscs.json',
        force: true
        //"validateQuoteMarks": "\""
      }
    },
  });

  require('load-grunt-tasks')(grunt);

  // Default tasks
  grunt.registerTask('default', ['newer:csslint', 'newer:jscs', 'newer:jshint']);
};
