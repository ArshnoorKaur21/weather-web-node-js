const http=require("http")
const fs=require("fs")
var requests=require('requests')
const homefile=fs.readFileSync("home.html","utf-8")
//here open npm.ors.js for serching anyy module
const replaceval=(tempval,orgval)=>{
    let temperature=tempval.r
    eplace(`{%tempval%}`,orgval.main.temp-273.15 );
    temperature=temperature.replace("{%tempmin%}",orgval.main.temp_min-273.15 );
    temperature=temperature.replace("{%tempmax%}",orgval.main.temp_max-273.15 );
    temperature=temperature.replace("{%location%}",orgval.name);
    temperature=temperature.replace("{%country%}",orgval.sys.country);
    temperature=temperature.replace("{%tempstatus%}",orgval.weather[0].main)
    return temperature;
}
const server=http.createServer((req,res)=>{
    if(req.url=="/")
    {
        //go to npm requests
        var requests=require("requests")
        //here ? k baad jo bhi likha usee query string kete
        //req.query.name
        requests('https://api.openweathermap.org/data/2.5/weather?q=Ludhiana&appid=275d1d310ba0c00ae7ff7c853a2d556b')
        .on('data', (chunk) => {
            //here datawe get as json to convert into object
            const objdata=JSON.parse(chunk)
            const arrdata=[objdata];
            console.log(arrdata);//now it is array of object
            // console.log(arrdata[0].main.temp) i want to replace {%tempval%} with arrdata[0].main.temp

            //val,ind,arr,this
            const realtimedata=arrdata.map((val)=>replaceval(homefile,val)).join("")//here mujhe pele data arr min milra tha to convert in string use join method
                // console.log(val.main)
                res.write(realtimedata)
                console.log(realtimedata)
        })
        .on('end', (err) => {
        if (err) return console.log('connection closed due to errors', err);
        // console.log('end');
        res.end();
        });
    }
})
server.listen(8000,"127.0.0.1")

//go to npm js documentation and install requesta and go to its documentauion to see its implementaion