Technologies used;
NodeJS
HTML 5
CSS 3

NodeJS is used for a serve which loads the JSON file in to memory every 15 minutes. This means the file can be externally edited without the server needing to be restarted. It also has the advantage of being able to serve requests much faster, as the file is not being loaded over and over.

A GET request is used to retrieve the information from the server, which is then parsed and rendered to the DOM using Javascript. Polyfills for the .contains() method, JSON, and XMLHTTP are used to ensure a consistent experience between IE7 - IE11, Google Chrome, Opera, Firefox and Safari. In addition, lazy loading is used on the images to ensure a quick load time.

Sorting and searching are carried out by a client-side held copy of the information which is then iterated over and selected where necessary, writing these to the DOM. The Dom rendering method also saves a copy of the object that is being rendered to the screen. It is important to note that the searching searches the whole retrieved database, whereas filtering only references the most recent object written to the DOM.

If there are any questions, please feel free to email alexandermichaelroche@googlemail.com