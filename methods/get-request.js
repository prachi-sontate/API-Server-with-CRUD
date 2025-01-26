module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+ 1);
    console.log(baseUrl);
    let name = req.url.split("/")[3];
    const regexV4 = new RegExp(
        /^[0-9A-f]{8}-[0-9A-f]{4}-4[0-9A-f]{3}-[89AB][0-9A]{3}-[0-9A-F]{12}$/i
    );
    //console.log(name);
    if(req.url === "/api/movies"){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies));
        res.end();
    }else if(!regexV4.test(name)){
        res.writeHead(400, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Validation Failed",
            message: "UUID is not valid"})
        );
    }else if(baseUrl === "api/movies/" && regexV4.test(name)){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        let filteredMovie = req.movies.filter((movie) => {
            return movie.name === name;
        });

        if(filteredMovie.lenghth >0 ){
            res.statusCode = 200;
            res.write(JSON.stringify(filteredMovie));
            res.end();
        }else {
            res.statusCode = 404;
            res.write(JSON.stringify({ title: "Not Found",
                message: "Movie not found"}));
            res.end();
        }
        
    }
    else{
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Not Found",
            message: "Route not found"})
    );
    }
};
