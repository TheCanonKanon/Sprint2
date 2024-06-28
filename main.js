"use strict";

//global Variable for testing only
let loopCounter = 0;

const mainHeader = new Headers ({
    "Authorization": "token " + githubAPI,
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
})

//getting all public repos from user
//we can probably sort them by some metrics
//https://api.github.com/users/TheCanonKanon/repos

//find the repos and look thru all of em to find the weekdays on which the most commits happen?
//Is that a bit much requests?
//https://api.github.com/users/TheCanonKanon/repos
//https://api.github.com/repos/TheCanonKanon/CodeAcademyBerlin_Module1_Project1/commits

//get all public repos and then find the 3 best?
//that might take a while to process
//https://api.github.com/repositories

window.onload = () => {
    userRepoFetch();
    //test();
}

/*const testArray = [1,2,3,1,3,2,2,1,3,2,3,1,3,1,2,3,2,1]


for (let bla = 0; bla < testArray.length-1; bla += 3) {
    console.log(testArray[bla],testArray[bla+1],testArray[bla+2]);
    test(testArray[bla],testArray[bla+1],testArray[bla+2])
}


function test (a,b,c) {
    let watchers = [a,b,c]
    if (watchers[0] <= watchers[1]) {
        watchers.splice(0,0,watchers[1]);
        watchers.splice(2,1);
        console.log(watchers);
        if (watchers[0] <= watchers[2]) {
            watchers.splice(0,0,watchers[2]);
            watchers.pop();
            console.log(watchers);
        } else if (watchers[1] <= watchers[2]) {
            watchers.splice(1,0,watchers[2]);
            watchers.pop();
            console.log(watchers);
        }
    } else if (watchers[0] <= watchers[2]) {
        watchers.splice(0,0,watchers[2]);
        watchers.pop();
        console.log(watchers);
    } else if (watchers[1] <= watchers[2]) {
        watchers.splice(1,0,watchers[2]);
        watchers.pop();
        console.log(watchers);
    }


    //console.log(watchers);
}*/


//find the top 3 "best" public repos of user
async function top3Repos (repos) {
    let watchers = [];
    let stargazer = [];
    let forks = [];
    let size = [];
    for(let x of repos) {
        if (watchers.length < 3) {
            watchers.push(x)
        } else if (watchers[watchers.length-1].watchers_count < x.watchers_count) {
            watchers.pop();
            watchers.push(x);
            if (watchers[0].watchers_count <= watchers[1].watchers_count) {
                watchers.splice(0,0,watchers[1]);
                watchers.splice(2,1);
                if (watchers[0].watchers_count <= watchers[2].watchers_count) {
                    watchers.splice(0,0,watchers[2]);
                    watchers.pop();
                } else if (watchers[1].watchers_count <= watchers[2].watchers_count) {
                    watchers.splice(1,0,watchers[2]);
                    watchers.pop();
                }
            } else if (watchers[0].watchers_count <= watchers[2].watchers_count) {
                watchers.splice(0,0,watchers[2]);
                watchers.pop();
            } else if (watchers[1].watchers_count <= watchers[2].watchers_count) {
                watchers.splice(1,0,watchers[2]);
                watchers.pop();
            }
        }
        //but ugly sort
    }
    console.log(watchers);
}

//auslagerung in async function um multiple aufrufe zu starten und die geschwindigkeit von mehrere Sekunden auf wenige zu senken.
async function commitFetchAndSort(commits,repo,currentPage,pageNumber, userName, userID) {
    if (currentPage !== 0) {
        commits = await fetch (repo.commits_url.replace("{/sha}","?per_page=100&page=" + currentPage), {
            headers: mainHeader
        });
    }

    //going over the commits and putting them directly into the table
    const commitsJSON = await commits.json();
    for (let y of commitsJSON) {
        if (y.author != null) {
            if (y.author.login === userName || y.author.id === userID) {
                const date = new Date(y.commit.author.date);
                const commitField = document.getElementById("commit" + date.getDay())
                commitField.innerText++
                //productiveDates[date.getDay()]++;
            } else if (y.committer != null) {
                if (y.committer.login === userName || y.committer.id === userID) {
                    const date = new Date(y.commit.committer.date);
                    const commitField = document.getElementById("commit" + date.getDay())
                    commitField.innerText++
                    //productiveDates[date.getDay()]++;
                }
            }
        } else if (y.committer != null) {
            if (y.committer.login === userName || y.committer.id === userID) {
                const date = new Date(y.commit.committer.date);
                const commitField = document.getElementById("commit" + date.getDay())
                commitField.innerText++
                //productiveDates[date.getDay()]++;
            }
        }
    }
}

//get the productive days from all commits a user did
async function repoCommitsFetch (repo, userName, userID) {

    let pageNumber = 0;
    let currentPage = 0;

    //fetch the first page
    const commits = await fetch (repo.commits_url.replace("{/sha}","?per_page=100"), {
        headers: mainHeader
    });

    

    if (commits.headers.has("link")) {
        //getting the number of the last page, probably the hard way
        const linkArray = commits.headers.get("link").split(",")
        for (let y of linkArray) {
        if(y.includes("rel=\"last\"")) {
            pageNumber = y.slice(y.indexOf("commits?per_page=100&page=")+26,y.indexOf(">; rel=\"last\""));
            break;
        }
        }
    }

    do {
        commitFetchAndSort(commits,repo,currentPage,pageNumber, userName, userID)        
        currentPage++
    } while (currentPage <= pageNumber)
    
    loopCounter--;
}

async function userRepoFetch () {
    const userName = document.querySelector("#username-search").value;

    try {
        const githubUserID = await fetch (`https://api.github.com/users/${userName}`, {
            method: "GET",
            headers: mainHeader
        })
        if (githubUserID.ok !== true){return};
        const githubUserIDJSON = await githubUserID.json();
        const githubName = githubUserIDJSON.login;
        const githubID = githubUserIDJSON.id;
    
        const response = await fetch (`https://api.github.com/users/${userName}/repos`, {
            method: "GET",
            headers: mainHeader
        })
        const responseJSON = await response.json()


        //loop starting the commit count
        /*for (let x of responseJSON) {
            if (loopCounter < 50) {
                loopCounter++
                repoCommitsFetch (x, githubName, githubID)
            } else if(loopCounter < 80) {
                loopCounter++
                setTimeout(repoCommitsFetch, 200, x, githubName, githubID);
            } else {
                loopCounter++
                setTimeout(repoCommitsFetch, 1000, x, githubName, githubID);
            }
        }*/

        top3Repos(responseJSON);

    } catch (error) {
        console.log(error)
    }
    }



function errorHandling (errorObject) {
    return;
};