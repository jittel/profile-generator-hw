const inquirer = require("inquirer");
var fs = require('fs');
var gs = require('github-scraper');
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
//     convertFactory = require('electron-html-to');
// var conversion = convertFactory({
//     converterPath: convertFactory.converters.PDF
// });
// conversion({ html: '<h1>Hello World</h1>' }, function (err, result) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log(result.numberOfPages);
//     console.log(result.logs);
//     result.stream.pipe(fs.createWriteStream('/path/to/anywhere.pdf'));
//     conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
// });
// const questions = [
//     //
// ];
// function writeToFile(fileName, data) {
//     //
// }
// function init() {
//     //
//     init();
// }
async function getStuff() {
    try {
        var stuff = await inquirer.prompt([
            // {
            //     type: "input",
            //     name: "color",
            //     message: "What is your favorite color?"
            // },
            {
                type: "input",
                name: "username",
                message: "what is your github username?"
            }
        ]);
        var username = stuff.username;
        gs(username, function (err, data) {
            // console.log(data); // or what ever you want to do with the data
            console.log("got the stuff ;)")
            let gitName = data.name;
            let gitUsername = data.username;
            let gitLocation = data.location;
            let gitURL = "github.com" + data.url;
            let gitImg = data.avatar;
            let gitBio = data.bio;
            let gitRepos = data.repos;
            let gitStars = data.stars;
            let gitFollowers = data.followers;
            let gitFollowing = data.following;
            console.log(gitURL)
            const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <p>my name is ${gitName}</p>
    <p>my name is ${gitUsername}</p>
    <p>i am from ${gitLocation}</p>
    <p>go here to look: <a href="${gitURL}"></p>
    <p>it me! <a href="${gitImg}"></a></p>
    <p>bio: ${gitBio}</p>
    <p>i have ${gitRepos} repos</p>
    <p>i have ${gitStars} stars</p>
    <p>i have ${gitFollowers} followers</p>
    <p>i am following ${gitFollowing}</p>
</body>
</html>`
            writeFileAsync("index.html", html, "utf8")
        });
    } catch (err) {
        console.log(err)
    }
}
getStuff();
// GOOGLE MAPS API KEY : AIzaSyDQ2xTySocravjJVR1qYmdTRfiyVKeLhtc