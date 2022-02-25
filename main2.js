var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title,list,body){
    return `
        <!doctype html>
        <html>
        <head>
            <title>${title}</title>
            <meta charset="utf8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${body}
        </body>
        </html>
        `;
}

function templateList(filelist){

    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i = i + 1;
    }
    list = list + '</ul>';
    return list;
}

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

                var list = templateList(filelist);
                var template = templateHTML(title,list,`<h2>${title}</h2>${description}`);

                response.writeHead(200);
                response.end(template);
                console.log('pathname: ' + pathname);
            });
        } else {
            fs.readFile(`data/${queryData.id}`,"utf8",function(err, file_content){
                response.writeHead(200);
                response.end(`there is pathname, there is queryData.id: ${queryData.id}\n` + file_content);
            });
        }
    } else{
        response.writeHead(404);
        response.end(`no pathname: \nnot found`);
    }

});
app.listen(3000);
