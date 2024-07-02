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
    //userRepoFetch();
    eventHandler();
    const top3SelectorChange = document.querySelector("#top3Select");
    top3SelectorChange.selectedIndex = 0
}



/*const testArray = [1,2,3,1,3,2,2,1,3,2,3,1,3,1,2,3,2,1]


for (let bla = 0; bla < testArray.length-1; bla += 3) {
    console.log(testArray[bla],testArray[bla+1],testArray[bla+2]);
    test(testArray[bla],testArray[bla+1],testArray[bla+2])
}


function test (a,b,c) {
    let selectedValue = [a,b,c]
    if (selectedValue[0] <= selectedValue[1]) {
        selectedValue.splice(0,0,selectedValue[1]);
        selectedValue.splice(2,1);
        console.log(selectedValue);
        if (selectedValue[0] <= selectedValue[2]) {
            selectedValue.splice(0,0,selectedValue[2]);
            selectedValue.pop();
            console.log(selectedValue);
        } else if (selectedValue[1] <= selectedValue[2]) {
            selectedValue.splice(1,0,selectedValue[2]);
            selectedValue.pop();
            console.log(selectedValue);
        }
    } else if (selectedValue[0] <= selectedValue[2]) {
        selectedValue.splice(0,0,selectedValue[2]);
        selectedValue.pop();
        console.log(selectedValue);
    } else if (selectedValue[1] <= selectedValue[2]) {
        selectedValue.splice(1,0,selectedValue[2]);
        selectedValue.pop();
        console.log(selectedValue);
    }


    //console.log(selectedValue);
}*/

/*-----------------------Template---------------------------------------

async function top3Template (repos) {
    let selectedValue = [];
    for(let x of repos) {
        selectedValue.push(x)
        if (selectedValue.length === 3) {
            if (selectedValue[0]."change_this" <= selectedValue[1]."change_this") {
                selectedValue.splice(0,0,selectedValue[1]);
                selectedValue.splice(2,1);
                if (selectedValue[0]."change_this" <= selectedValue[2]."change_this") {
                    selectedValue.splice(0,0,selectedValue[2]);
                    selectedValue.pop();
                } else if (selectedValue[1]."change_this" <= selectedValue[2]."change_this") {
                    selectedValue.splice(1,0,selectedValue[2]);
                    selectedValue.pop();
                }
            } else if (selectedValue[0]."change_this" <= selectedValue[2]."change_this") {
                selectedValue.splice(0,0,selectedValue[2]);
                selectedValue.pop();
            } else if (selectedValue[1]."change_this" <= selectedValue[2]."change_this") {
                selectedValue.splice(1,0,selectedValue[2]);
                selectedValue.pop();
            }
        } else if (selectedValue.length > 3) {
            if (selectedValue[2]."change_this" <= selectedValue[3]."change_this") {
                if (selectedValue[1]."change_this" <= selectedValue[3]."change_this") {
                    if (selectedValue[0]."change_this" <= selectedValue[3]."change_this") {
                        selectedValue.splice(0,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                    } else {
                        selectedValue.splice(1,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                    }
                } else {
                    selectedValue.splice(2,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                }
                
            } else {
                selectedValue.pop();
            }
        }
    }
    console.log(selectedValue);
    const divinator = document.querySelector("#top3Repos");
    const spanContainer = document.createElement("span");
    divinator.appendChild(spanContainer);
    //spanContainer.hidden = true;
    spanContainer.id = "watchersSpan";
    for(let x of selectedValue) {
        const repoDiv = document.createElement("div");
        spanContainer.appendChild(repoDiv);
        const repoPName = document.createElement("p");
        repoPName.innerText = "Name: " + x.name;
        const repoPID = document.createElement("p");
        repoPID.innerText = "ID: " + x.id;
        const repoPselectedValue = document.createElement("p");
        repoPselectedValue.innerText = "Watchers: " + x.watchers_count;
        repoDiv.appendChild(repoPName);
        repoDiv.appendChild(repoPID);
        repoDiv.appendChild(repoPselectedValue);
    }
}

    */

/*----------------------------------------------Top3 Fetch and Sort----------------------------------------*/

function top3SelectorHasChanged(selectedName) {
    const top3ForkEvent = document.querySelector("#forkSpan")
    const top3SizeEvent = document.querySelector("#sizeSpan")
    const top3IssueEvent = document.querySelector("#issueSpan")
    const top3WatcherEvent = document.querySelector("#watchersSpan")
    const top3Select = document.querySelector("#" + selectedName + "Span")
    top3ForkEvent.hidden = true;
    top3IssueEvent.hidden = true;
    top3SizeEvent.hidden = true;
    top3WatcherEvent.hidden = true;
    top3Select.hidden = false;
}

async function top3Size (repos) {
    let selectedValue = [];
    for(let x of repos) {
        selectedValue.push(x)
        if (selectedValue.length === 3) {
            if (selectedValue[0].size <= selectedValue[1].size) {
                selectedValue.splice(0,0,selectedValue[1]);
                selectedValue.splice(2,1);
                if (selectedValue[0].size <= selectedValue[2].size) {
                    selectedValue.splice(0,0,selectedValue[2]);
                    selectedValue.pop();
                } else if (selectedValue[1].size <= selectedValue[2].size) {
                    selectedValue.splice(1,0,selectedValue[2]);
                    selectedValue.pop();
                }
            } else if (selectedValue[0].size <= selectedValue[2].size) {
                selectedValue.splice(0,0,selectedValue[2]);
                selectedValue.pop();
            } else if (selectedValue[1].size <= selectedValue[2].size) {
                selectedValue.splice(1,0,selectedValue[2]);
                selectedValue.pop();
            }
        } else if (selectedValue.length > 3) {
            if (selectedValue[2].size <= selectedValue[3].size) {
                if (selectedValue[1].size <= selectedValue[3].size) {
                    if (selectedValue[0].size <= selectedValue[3].size) {
                        selectedValue.splice(0,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                    } else {
                        selectedValue.splice(1,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                    }
                } else {
                    selectedValue.splice(2,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                }
                
            } else {
                selectedValue.pop();
            }
        }
    }
    console.log(selectedValue);
    const divinator = document.querySelector("#top3Repos");
    const spanContainer = document.createElement("span");
    divinator.appendChild(spanContainer);
    spanContainer.hidden = true;
    spanContainer.id = "sizeSpan";
    for(let x of selectedValue) {
        const repoDiv = document.createElement("div");
        spanContainer.appendChild(repoDiv);
        const repoPName = document.createElement("p");
        repoPName.innerText = "Name: " + x.name;
        const repoPID = document.createElement("p");
        repoPID.innerText = "ID: " + x.id;
        const repoPselectedValue = document.createElement("p");
        repoPselectedValue.innerText = "Size: " + x.size;
        repoDiv.appendChild(repoPName);
        repoDiv.appendChild(repoPID);
        repoDiv.appendChild(repoPselectedValue);
    }
}


async function top3Issue (repos) {
    let selectedValue = [];
    for(let x of repos) {
        selectedValue.push(x)
        if (selectedValue.length === 3) {
            if (selectedValue[0].open_issues_count <= selectedValue[1].open_issues_count) {
                selectedValue.splice(0,0,selectedValue[1]);
                selectedValue.splice(2,1);
                if (selectedValue[0].open_issues_count <= selectedValue[2].open_issues_count) {
                    selectedValue.splice(0,0,selectedValue[2]);
                    selectedValue.pop();
                } else if (selectedValue[1].open_issues_count <= selectedValue[2].open_issues_count) {
                    selectedValue.splice(1,0,selectedValue[2]);
                    selectedValue.pop();
                }
            } else if (selectedValue[0].open_issues_count <= selectedValue[2].open_issues_count) {
                selectedValue.splice(0,0,selectedValue[2]);
                selectedValue.pop();
            } else if (selectedValue[1].open_issues_count <= selectedValue[2].open_issues_count) {
                selectedValue.splice(1,0,selectedValue[2]);
                selectedValue.pop();
            }
        } else if (selectedValue.length > 3) {
            if (selectedValue[2].open_issues_count <= selectedValue[3].open_issues_count) {
                if (selectedValue[1].open_issues_count <= selectedValue[3].open_issues_count) {
                    if (selectedValue[0].open_issues_count <= selectedValue[3].open_issues_count) {
                        selectedValue.splice(0,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                    } else {
                        selectedValue.splice(1,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                    }
                } else {
                    selectedValue.splice(2,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                }
                
            } else {
                selectedValue.pop();
            }
        }
    }
    console.log(selectedValue);
    const divinator = document.querySelector("#top3Repos");
    const spanContainer = document.createElement("span");
    divinator.appendChild(spanContainer);
    spanContainer.hidden = true;
    spanContainer.id = "issueSpan";
    for(let x of selectedValue) {
        const repoDiv = document.createElement("div");
        spanContainer.appendChild(repoDiv);
        const repoPName = document.createElement("p");
        repoPName.innerText = "Name: " + x.name;
        const repoPID = document.createElement("p");
        repoPID.innerText = "ID: " + x.id;
        const repoPselectedValue = document.createElement("p");
        repoPselectedValue.innerText = "Open Issues: " + x.open_issues_count;
        repoDiv.appendChild(repoPName);
        repoDiv.appendChild(repoPID);
        repoDiv.appendChild(repoPselectedValue);
    }
}

async function top3Forks (repos) {
    let selectedValue = [];
    for(let x of repos) {
        selectedValue.push(x)
        if (selectedValue.length === 3) {
            if (selectedValue[0].forks_count <= selectedValue[1].forks_count) {
                selectedValue.splice(0,0,selectedValue[1]);
                selectedValue.splice(2,1);
                if (selectedValue[0].forks_count <= selectedValue[2].forks_count) {
                    selectedValue.splice(0,0,selectedValue[2]);
                    selectedValue.pop();
                } else if (selectedValue[1].forks_count <= selectedValue[2].forks_count) {
                    selectedValue.splice(1,0,selectedValue[2]);
                    selectedValue.pop();
                }
            } else if (selectedValue[0].forks_count <= selectedValue[2].forks_count) {
                selectedValue.splice(0,0,selectedValue[2]);
                selectedValue.pop();
            } else if (selectedValue[1].forks_count <= selectedValue[2].forks_count) {
                selectedValue.splice(1,0,selectedValue[2]);
                selectedValue.pop();
            }
        } else if (selectedValue.length > 3) {
            if (selectedValue[2].forks_count <= selectedValue[3].forks_count) {
                if (selectedValue[1].forks_count <= selectedValue[3].forks_count) {
                    if (selectedValue[0].forks_count <= selectedValue[3].forks_count) {
                        selectedValue.splice(0,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                    } else {
                        selectedValue.splice(1,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                    }
                } else {
                    selectedValue.splice(2,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                }
                
            } else {
                selectedValue.pop();
            }
        }
    }
    const divinator = document.querySelector("#top3Repos");
    const spanContainer = document.createElement("span");
    divinator.appendChild(spanContainer);
    spanContainer.hidden = true;
    spanContainer.id = "forkSpan";
    for(let x of selectedValue) {
        const repoDiv = document.createElement("div");
        spanContainer.appendChild(repoDiv);
        const repoPName = document.createElement("p");
        repoPName.innerText = "Name: " + x.name;
        const repoPID = document.createElement("p");
        repoPID.innerText = "ID: " + x.id;
        const repoPselectedValue = document.createElement("p");
        repoPselectedValue.innerText = "Forks: " + x.forks_count;
        repoDiv.appendChild(repoPName);
        repoDiv.appendChild(repoPID);
        repoDiv.appendChild(repoPselectedValue);
    }
}

//find the top 3 "best" public repos of user
async function top3watchers (repos) {
    let selectedValue = [];
    for(let x of repos) {
        selectedValue.push(x)
        if (selectedValue.length === 3) {
            if (selectedValue[0].watchers_count <= selectedValue[1].watchers_count) {
                selectedValue.splice(0,0,selectedValue[1]);
                selectedValue.splice(2,1);
                if (selectedValue[0].watchers_count <= selectedValue[2].watchers_count) {
                    selectedValue.splice(0,0,selectedValue[2]);
                    selectedValue.pop();
                } else if (selectedValue[1].watchers_count <= selectedValue[2].watchers_count) {
                    selectedValue.splice(1,0,selectedValue[2]);
                    selectedValue.pop();
                }
            } else if (selectedValue[0].watchers_count <= selectedValue[2].watchers_count) {
                selectedValue.splice(0,0,selectedValue[2]);
                selectedValue.pop();
            } else if (selectedValue[1].watchers_count <= selectedValue[2].watchers_count) {
                selectedValue.splice(1,0,selectedValue[2]);
                selectedValue.pop();
            }
        } else if (selectedValue.length > 3) {
            if (selectedValue[2].watchers_count <= selectedValue[3].watchers_count) {
                if (selectedValue[1].watchers_count <= selectedValue[3].watchers_count) {
                    if (selectedValue[0].watchers_count <= selectedValue[3].watchers_count) {
                        selectedValue.splice(0,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                    } else {
                        selectedValue.splice(1,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                    }
                } else {
                    selectedValue.splice(2,0,selectedValue[3]);
                        selectedValue.pop();
                        selectedValue.pop();
                }
                
            } else {
                selectedValue.pop();
            }
        }
    }
    console.log(selectedValue);
    const divinator = document.querySelector("#top3Repos");
    const spanContainer = document.createElement("span");
    divinator.appendChild(spanContainer);
    spanContainer.hidden = false;
    spanContainer.id = "watchersSpan";
    for(let x of selectedValue) {
        const repoDiv = document.createElement("div");
        spanContainer.appendChild(repoDiv);
        const repoPName = document.createElement("p");
        repoPName.innerText = "Name: " + x.name;
        const repoPID = document.createElement("p");
        repoPID.innerText = "ID: " + x.id;
        const repoPselectedValue = document.createElement("p");
        repoPselectedValue.innerText = "Watchers: " + x.watchers_count;
        repoDiv.appendChild(repoPName);
        repoDiv.appendChild(repoPID);
        repoDiv.appendChild(repoPselectedValue);
    }
}



/*----------------------------------------------Commits Fetching----------------------------------------*/


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


/*-----------------------------------Repos Fetching and Starting Point----------------------------------------*/

async function userCheck(userName) {
    const userNameCheck = await fetch (`https://api.github.com/users/${userName}`, {
        method: "HEAD",
        headers: mainHeader
    })
    console.log(userNameCheck);
}

async function userRepoFetch (userName) {
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

        await top3watchers(responseJSON);
        top3Forks(responseJSON);
        top3Size(responseJSON);
        top3Issue(responseJSON);

    } catch (error) {
        console.log(error)
    }
    }

/*---------------------------------------Events and Error Handling----------------------------------------*/

function eventHandler() {
    const top3SelectorChange = document.querySelector("#top3Select");
    top3SelectorChange.addEventListener("change", () => top3SelectorHasChanged(top3SelectorChange.selectedOptions[0].id))
    const usernameSearch = document.querySelector("#username-search");
    usernameSearch.addEventListener("change", () => userCheck(usernameSearch.value));
}

function errorHandling (errorObject) {
    return;
};