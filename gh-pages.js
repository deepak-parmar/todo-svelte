var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/deepak-parmar/todo-svelte.git', // Update to point to your repository  
        user: {
            name: 'Deepak Parmar', // update to use your name
            email: 'dgparmar1999@rediffmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)