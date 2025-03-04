const writeToFile = require("../util/write-to-file");
module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+ 1);
    console.log(baseUrl);
    let name = req.url.split("/")[3];
    const regexV4 = new RegExp(
        /^[0-9A-f]{8}-[0-9A-f]{4}-4[0-9A-f]{3}-[89AB][0-9A]{3}-[0-9A-F]{12}$/i
    );

    if(!regexV4.test(name)){
        res.writeHead(400, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Validation Failed",
            message: "UUID is not valid"
        })
        );
    }else if(baseUrl === "api/movies/" && regexV4.test(name)){
        const index = req.movies.findIndex((movie) => {
            return movie.name === name;

        });
        if(index === -1){
            res.statusCode = 404;
            res.write(JSON.stringify({ title: "Not Found",
                message: "Movie not found"}));
            res.end();
        } else {
            req.movies.splice(index , 1);
            writeToFile(req.movies);
            res.writeHead(204, { "content-Type": "application/json"});
        res.end(JSON.stringify(req.movies));       
    }
        }
};