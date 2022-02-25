// var template = ~~~~~~~~
//module.exports = template;
//it can be shorten by below

module.exports = {
        html:
            function(title,list,body){
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
                        <h2>${title}</h2>
                        ${body}
                    </body>
                    </html>
                    `;
            },
        list:
            function(filelist){
                var list = '<ul>';
                var i = 0;
                while(i < filelist.length){
                    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i = i + 1;
                }
                list = list + '</ul>';
                return list;
            }
}
