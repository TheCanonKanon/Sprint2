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

function getInformations (reposObject) {
    
}

function repoCommitsFetch (urlCommits) {
    fetch (urlCommits)
        .then (resp => resp.json())
        .then (result => {return(result);})
}

async function userRepoFetch () {
    let userName = document.querySelector("#username-search").value;
    const response = await fetch (`https://api.github.com/users/${userName}/repos`)
    console.log("test");
    const responseJSON = await response.json()
    console.log(responseJSON)
    return responseJSON;
    }

    console.log("test");
console.log(userRepoFetch());
console.log("test2");


