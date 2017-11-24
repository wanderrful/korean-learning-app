## Korean-Learning-App

This is a proof of concept for a TypeScript and React-based web app that tests your Korean vocabulary knowledge through a sequence of challenge prompts.

Here's a simple video demosntration:  https://www.youtube.com/watch?v=sHXQMWSky9U



## How to Test

To test this web app, simply clone the master branch of this repo to your hard drive and run _npm start_.  It will automatically open the web app at _localhost:3000_ for you.  Enjoy!

Use the _DATABASE\_URL_ environment variable for your PostgreSQL database server!



## How It Works

There are three components that communicate via State and Props:  _App_, _Parent\_C_, and _Child\_C_.  The _App_ passes the challenge prompt contents via props into the _Parent\_C_ component, which in turn handles user input events that occur in the _Child\_C_ component through a combination of props and bound callback functions!



## Further Improvement Ideas

Further refactoring and improvements can include introducing a Redux store as well as wrapping the entire web app itself into a larger project that manages and runs this entire project as one of its sub-components, passing fresh challenge content via the _App_ component itself!
