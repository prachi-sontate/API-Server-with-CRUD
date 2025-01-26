module.exports = (request) =>{
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            request.on("data", (chucnk) => {
                body += chucnk;
            });
            request.on("end", () => {
                resolve(JSON.parse(body));
            });
        }catch{
            console.log(err);
            reject(err);
        }
    });
};