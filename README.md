From the root of the project

npm install
npm install -g serve
npm install -g grunt-cli
** There may be some other global npm dependencies that I'm not thinking of **
grunt build
serve dist/

localhost:3000 (or whatever port you used if passing port param to serve)

Also note that the code is not optimized for a production app or particularly clean.  The point was to demostrate how to use flux to keep state updated in main controller app and pass it down as props to keep child components updated. Just starting to get into es6 at this point, so it is probably a little misused.

