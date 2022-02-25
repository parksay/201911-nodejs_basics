var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url,true).pathname;

    if(pathname === '/'){
        if(queryData.id === undefined){

            fs.readdir('./data',function(error, filelist){
                console.log("filelist: " + filelist);

                var title = 'Welcome';
                var description = 'there is path, but no query that name of "id": \nHello, Node JS';
                var template = `content template here: \n'${description}'`;

                var i = 0;
                var display_files = '';
                while(i < filelist.length){
                    display_files = display_files + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a><li>`;
                    i = i + 1;
                } //if you create a new file, it shows up in file list automatically, and you can visit the page by just having a click the file name on the list


                response.writeHead(200);
                response.end(template + "<ul>" + display_files + "</ul>");
                //if you send text on the page just like upper one, they are wrapped in a <pre> tag so that they don't appear as a page
                //if you send them with <!doctype html>~~~~~~tag, like lowwer one, it is accepted as a page. It seems that <!doctype> is upper class tham <pre> tag
                //response.end(`<!doctype html><html><body><div>${template}</div><div><ul>${display_files}</ul>`);

                //it is written with "while" sentence, because the data is list, but you can also use "if" sentence when you want to show different pages according to the query
                console.log('pathname: ' + pathname);
            });
        } else {
            fs.readFile(`data/${queryData.id}`,"utf8",function(err, description){
                response.writeHead(200);
                response.end(`there is pathname, there is queryData.id: ${queryData.id}\n` + description);
            });
        }
    } else{
        response.writeHead(404);
        response.end(`no pathname: \nnot found`);
    }

});
app.listen(3000);


    // if(_url == '/'){
    //   _url = '/index.html';
    // }
    // if(_url == '/favicon.ico'){
    //   return response.writeHead(404);
    // }

    //response.end(fs.readFileSync(__dirname + url));
