# REACT REDDIT CLIENT
A simple reddit client created using react js. 
Retrieves post from reddit and display contents.

## Installation
to install just run the command in terminal

    npm install

## Configuration
insert your token and client id in the configuration file found in
    
    ROOT/src/config/config.dev.js


Example:

    const config = {

        snoowrap: {
            accessToken: '217002660480-w_I1YsCAlz4o5i6Xqx596PGQ6gg',
            clientId: '8YK8af_wSDcI4g'
        },
        default: {
            subreddit: 'photography'
        }
    }

you can also assign a default subreddit in the configuration file.

## Running
to start application enter the following command in terminal

    npm start

## Access
you can access the application using any browser by going to the address below after running the start command
    
    http://localhost:3000/

if you dont specify a subreddit you will be redirect to the default subreddit, sample below

    http://localhost:3000/r/photography

where photography is the default subreddit specified in the config file

you can also enter any sub reddit in the browser

    http://localhost:3000/r/node
    http://localhost:3000/r/Carpentry/


## Opening in IE
since the application is using modern javascript code, you need to transpile the code using babel first before the application an be ran.

install serve module first, if you dont have yet

    npm install -g serve

enter the following command in terminal to build and run 

    npm run build
    serve -s build



## ENJOY!
Author: Dan Joseph Bustarde