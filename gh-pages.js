var ghpages = require('gh-pages');

ghpages.publish(
  'public',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/deepak-parmar/todo-svelte.git', // Update to point to your repository  
    user: {
      name: 'Deepak Parmar',
      email: 'dgparmar1999@rediffmail.com'
    }
},
  () => {console.log('Deploy Complete!')}
)