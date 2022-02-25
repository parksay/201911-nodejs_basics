var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var template = require("./main_parts/parts_template.js");

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url,true).pathname;

    if(pathname === '/'){
        if(queryData.id === undefined){

            fs.readdir('./data',function(error, filelist){
                console.log("1. filelist: ");
                console.log(filelist);

                var title = 'Welcome';
                var description = 'there is path, but no query that name of "id": \nHello, Node JS';

                var list = template.list(filelist);
                var html = template.html(title,list,description);

                response.writeHead(200);
                response.end(html);
                //console.log both of '',"" are available in () as a string type
                console.log("2. pathname: ");
                console.log(pathname);
            });
        } else {
            fs.readdir('./data',function(error, filelist){
                console.log("3. there is pathname, there is queryData.id:")
                console.log(queryData.id);

                var title = `you got the ${queryData.id} file`;
                var description = `content:
                    <a href = "/create">write</a>
                    <a href = "/update?id=${queryData.id}"> udpate</a>
                    <form action = "/response_delete" method = "post">
                      <input type = "hidden" name = "id" value = "${queryData.id}">
                      <input type = "submit" value ="delete">
                    </form>
                `;

                var list = template.list(filelist);
                var html = template.html(title,list,`${description}`);

                fs.readFile(`data/${queryData.id}`,"utf8",function(err, file_content){
                  response.writeHead(200);
                  response.end(html + file_content);
                });
                console.log("4. pathname: ");
                console.log(pathname);
            });
        }
    } else if(pathname === '/create'){
      fs.readdir('./data',function(error, filelist){
          console.log("5. filelist:  ");
          console.log(filelist);

          var title = 'Welcome';
          var description = `
            input form: \n
                  <form action ="http://localhost:3000/response_create" method = "post">
                    <p>
                      <input type = "text" name = "title" placeholder = "title">
                    </p>
                    <p>
                      <textarea name = "description"  placeholder = "description"></textarea>
                    </p>
                    <p>
                      <input type = "submit">
                    </p>
                  </form>
              `;

          var list = template.list(filelist);
          var title = 'Welcome';
          var html= template.html(title,list,`${description}`);

          response.writeHead(200);
          response.end(html);
          console.log("6. pathname: ")
          console.log(pathname);
      });
    } else if (pathname === '/response_create') {
        //getting the data from client
        var body = ``;

        //server recieve the content data by data
        request.on('data',function(data){
            body = body + data;
            console.log("8. body of data from client: ");
            console.log(body);

            //if the data is too much to handle, cut the cunnection for the safety
            if(body.length > 1e6){ request.connection.destroy(); }
        });

        //writing file by the data from client
        request.on('end',function(){
            var post = qs.parse(body);
            console.log("9. post: ");
            console.log(post);
            var title = post.title;
            var content = post.description;
            fs.writeFile(`data/${title}`, content,'utf8', function(err){
                console.log("10. file write success");
                //301 is to change an address for good from now on,
                //302 is redirect an address for just this time
                response.writeHead(302, {Location: `/?id=${title}`});
                //the page that recieves the redirect will show the template.
                //you don't need to show template here
                response.end();
            });
        });



    }else if (pathname ==='/update') {
        var html;
        fs.readdir('./data',function(error, filelist){
            console.log("11. update enter. queryData.id:");
            console.log(queryData.id);

            var title = `you got the ${queryData.id} file`;
            var description = `content: `;

            var list = template.list(filelist);
            html = template.html(title,list,description);

        });
        fs.readFile(`data/${queryData.id}`,"utf8",function(err, file_content){
            var body = `
                <form action ="response_update" method = "post">
                  <p>
                    <!-- if the client revise the title of file, the server can not find the name of file from directory.
                    and that is why we need to send the original name of file like below and get it back when the user send the post --!>
                    <input type = "hidden" name = "id" value = "${queryData.id}">
                    <input type = "text" name = "title" placeholder = "title" value = "${queryData.id}">
                  </p>
                  <p>
                    <textarea name = "description"  placeholder = "description">${file_content}</textarea>
                  </p>
                  <p>
                    <input type = "submit">
                  </p>
                </form>`;

              html = html + body;
              response.writeHead(200);
              response.end(html);
          });
    } else if(pathname === "/response_update") {
        var body = ``;
        request.on('data',function(data){
            body = body + data;
            console.log("12. body of data from client: ");
            console.log(body);

            if(body.length > 1e6){ request.connection.destroy(); }
        });

        request.on('end',function(){
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var content = post.description;

            fs.rename(`data/${id}`,`data/${title}`,function(error){
                fs.writeFile(`data/${title}`,content,"utf8",function(err){
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                });
            });
        });

    } else if(pathname === "/response_delete") {
        var body = ``;
        request.on('data',function(data){
            body = body + data;
            console.log("13. delete response: ");
            console.log(body);

            if(body.length > 1e6){ request.connection.destroy(); }
        });

        request.on('end',function(){
            var post = qs.parse(body);
            var id = post.id;

            fs.unlink(`data/${id}`,function(err){
              response.writeHead(302, {Location: `/`});
              response.end();
            });
        });

    } else{
        response.writeHead(404);
        response.end(`no pathname: \nnot found`);
    }
});
app.listen(3000);
