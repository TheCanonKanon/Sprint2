"use strict";


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
}


//find the top 3 "best" public repos of user
async function top3Repos (repos) {
    
}


//get the productive days from all commits a user did
async function repoCommitsFetch (repos, userName, userID) {
    //sunday to saturday
    const productiveDates = [0,0,0,0,0,0,0]
    for (let x of repos) {
        const commits = await fetch (x.commits_url.replace("{/sha}",""), {
            method: "GET",
            headers: {
                "Authorization": githubAPI,
            }
        });
        const commitsJSON = await commits.json();
        for (let y of commitsJSON) {
            if (y.author != null) {
                if (y.author.login === userName || y.author.id === userID) {
                    const date = new Date(y.commit.author.date);
                    productiveDates[date.getDay()]++;
                } else if (y.committer != null) {
                    if (y.committer.login === userName || y.committer.id === userID) {
                        const date = new Date(y.commit.committer.date);
                        productiveDates[date.getDay()]++;
                    }
                }
            } else if (y.committer != null) {
                if (y.committer.login === userName || y.committer.id === userID) {
                    const date = new Date(y.commit.committer.date);
                    productiveDates[date.getDay()]++;
                }
            }
        }
    }
    console.log(...productiveDates);
}

async function userRepoFetch () {
    const userName = document.querySelector("#username-search").value;

    try {
        const githubUserID = await fetch (`https://api.github.com/users/${userName}`, {
            method: "GET",
            headers: {
                "Authorization": githubAPI,
            }
        })
        if (githubUserID.ok !== true){return};
        const githubUserIDJSON = await githubUserID.json();
        const githubName = githubUserIDJSON.login;
        const githubID = githubUserIDJSON.id;
    
        const response = await fetch (`https://api.github.com/users/${userName}/repos`, {
            method: "GET",
            headers: {
                "Authorization": githubAPI,
            }
        })
        const responseJSON = await response.json()
        await repoCommitsFetch (responseJSON, githubName, githubID)

    } catch (error) {
        console.log(error)
    }
    }




function errorHandling (errorObject) {
    return;
};