## Showing Specific Notifications

Sometimes you want to show messages like "Uglify complete" or "Project Deployed" - that's easy to do too.

{%= screenshot('Custom Message - Grunt', 'https://f.cloud.github.com/assets/51505/982678/48b6fa82-0814-11e3-890e-82518408084a.png') %}

{%= screenshot('Custom Message - Notification Center', 'https://f.cloud.github.com/assets/51505/982680/4b9df1ba-0814-11e3-88a4-0736f22dedf6.png') %}

{%= screenshot('Custom Message - Notify-Send', 'https://f.cloud.github.com/assets/51505/1030945/038e46dc-0ecb-11e3-9915-80c1838624a8.png') %}

```js
grunt.initConfig({
  notify: {
    task_name: {
      options: {
        // Task-specific options go here.
      }
    },
    watch: {
      options: {
        title: 'Task Complete',  // optional
        message: 'SASS and Uglify finished running', //required
      }
    },
    server: {
      options: {
        message: 'Server is ready!'
      }
    }
  }
});

grunt.loadNpmTasks('grunt-notify');

// simplified example
grunt.registerTask('server', [
  'uglify',
  'sass',
  'server',
  'notify:server'
  ]);
```

### Options
* `title` _optional_ Notification title
* `message` _required_ Notification message
