This is table on native JS with the ability to add, remove, edit fields, with validation.

Having trouble implementing SPA in native javascript
If want to try, you need to open the index.html document in the browser.
To start the SPA, you must complete the following steps:

1. In the router.js file, replace the routes object with:
```
const routes = {
  404: "/pages/404.html",
  "/": "/pages/index.html",
  "/about": "/pages/about.html",
};
```
2. Uncomment html in pages/index.html file

3. In the index.js file, delete the contents of the container:
```
<div id="main-page">...</div>
```

4. Comment out lines 1 and 188 in the createTable.js file.

5. to install the server you need to run:
```
sudo npm install -g http-server
```

6. To start, you need to do:
```
http-server -c-1
```
