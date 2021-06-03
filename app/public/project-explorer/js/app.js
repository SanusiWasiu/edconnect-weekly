let path = window.location.href;
window.onload = function(){
    if(path.includes('register.html')){
        callRegister()
    }
    if(path.includes('index.html')|| path.includes("viewproject.html") || path.includes("createproject.html") || path.includes("editproject.html") || path.includes("profile.html") || path.includes("search.html")){
        callIndex()
    }
    if(path.includes('login.html')){
        callLoginHtml ()
    }
    if(path.includes('createproject.html')){
        createProject()
    }
    if(path.includes('viewproject.html')){
        viewProject()
    }
}

let program = document.querySelector("#Program");
let graduationYear = document.querySelector("#graduationYear");
let signup = document.querySelector("#signupForm")

var callRegister = function(){
    let asyncProgram = async function(){
        const response = await fetch("/api/programs", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            cache: 'default',
        })
        if (response.status === 200){
            return response.json()
        }else{
            throw new Error ("something went wrong")
        } 
    }
    asyncProgram().then(data => {
        data.forEach(item => program.innerHTML += `<option value="${item}">${item}</option>`)
    }).catch(error => console.log(error.message))

    let asyncYear = async function(){
        const response = await fetch("/api/graduationYears", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            cache: 'default',
        })
        if (response.status === 200){
            return response.json()
        }else{
            throw new Error ("something went wrong")
        }
    }
    asyncYear().then(data => {
        data.forEach(item => graduationYear.innerHTML += `<option value="${item}">${item}</option>`)
    }).catch(error => console.log(error.message))

    // the  signup button
    signup.addEventListener('submit', function(e){
        e.preventDefault();

        let postData = {
            firstname: signup.firstName.value,
            lastname: signup.lastName.value,
            email: signup.email.value,
            password: signup.password.value,
            matricNumber: signup.matricNumber.value,
            program: signup.program.value,
            graduationYear: signup.graduationYear.value
        }
        
        let asyncPost = async function(){
            const response = await fetch("/api/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            })
            return response.json()
        }
        asyncPost().then(uData => {
            if (uData.status === 'ok') {
                let key = "uid";
                let cookieAge = 60 * 60 * 24 * 7;
                let value = encodeURIComponent(uData.data.id);
                document.cookie = `${key}=${value}; max-age=${cookieAge}; path=/;`;
                window.location.href = "/project-explorer/index.html"
            } else {
                let alert = document.querySelector("#alert");
                while (alert.hasChildNodes()) {  
                    alert.removeChild(alert.firstChild);
                }
                uData.errors.forEach(validationError => {
                    let errorEl = document.createElement("p");
                    errorEl.textContent = validationError;
                    alert.append(errorEl);
                    alert.classList.remove("d-none")
                })
            }
        }).catch(err => console.log(err))

        // data = JSON.stringify(data);

        // asyncfunctionpost('/api/register', data)
        // .then(({errorsFromServer, serverData}) => {
        //     if(errorsFromServer){
        //         document.querySelector('#alertErrors').style.display = "block";
        //         serverData.errors.forEach(error => {
        //             document.querySelector('#alertErrors').innerHTML += `<div>${error}</div>`
        //         })
        //     }else{
        //         let name = "uid";
        //         let value = serverData.data.id;
        //         let maxAge = 60 * 60 * 24 * 100;

        //         document.cookie = `${name}=${value};path=/;max-age=${maxAge};`;
        //         window.location.href = "/project-explorer/index.html"
                
        //     }
        // })
        // .catch(err => console.log(err))

       

    })
}

let cookieValue = ""
const loggedOutNav = document.querySelector("#loggedout");
const loggedInNav = document.querySelector("#loggedin");

var callIndex = async function(){
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('uid='))
        .split('=')[1];
    // var emptyCookie = document.cookie.split(';')
    // emptyCookie.filter(item => 
    //     {if (item.trim().startsWith('uid')) 
    //     cookieValue = item.split('=')[1]
    // var cookieValue = document.cookie.split(';').forEach(item => item.trim().split('=')[1])
    //})
    if (cookieValue !== ""){
        let response = await fetch(`/api/users/${cookieValue}`)
        console.log(response)
        return response.json()

    }
    
    
}
callIndex().then(data=> {
    const usernameEl = document.querySelector("#username");
    const logOutEl = document.querySelector("#logout");

    const navLoggedIn = () => {
        usernameEl.innerHTML = `Hi, ${data.firstname}`;
        loggedOutNav.classList.add("d-none");
        loggedInNav.classList.remove("d-none");
    }
    navLoggedIn()


    logOutEl.addEventListener("click", (e) => {
        e.preventDefault()

        document.cookie = `uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        location.replace("index.html");
    })
}).catch(err => console.log(err.message))


let login = document.querySelector("#loginForm")

var callLoginHtml = function(){
    // the  login button
    login.addEventListener('submit', function(e){
        e.preventDefault();
        
        let loginData = {
            email: login.email.value,
            password: login.password.value,
        }
        
        let asyncPost = async function(){
            const response = await fetch("/api/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData)
            })
            return response.json()
        }
        asyncPost().then(uData => {
            if (uData.status === 'ok') {
                let key = "uid";
                let cookieAge = 60 * 60 * 24 * 7;
                let value = encodeURIComponent(uData.data.id);
                document.cookie = `${key}=${value}; max-age=${cookieAge}; path=/;`;
                window.location.href = "/project-explorer/index.html"
            } else {
                let loginalert = document.querySelector("#logalert");
                loginalert.classList.remove("d-none")
            }
        }).catch(err => console.log(err))
    })
}

var createProject = function(){
    
    let buttonEl = document.querySelector('#contBtn')
    let projectForm = document.querySelector('#createProjectForm')

    projectForm.addEventListener("submit", function(e){
        e.preventDefault()

        let projectData = {
            name: projectForm.name.value,
            abstract: projectForm.abstract.value,
            authors: projectForm.authors.value,
            tags: projectForm.tags.value,
           
        }

        let asyncProject = async function(){
            const response = await fetch("/api/projects", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(projectData)
            })
            return response.json()
        }
        asyncPost().then(uData => {
            if (uData.status === 'ok') {
                // let key = "uid";
                // let cookieAge = 60 * 60 * 24 * 7;
                // let value = encodeURIComponent(uData.data.id);
                // document.cookie = `${key}=${value}; max-age=${cookieAge}; path=/;`;
                window.location.href = "/project-explorer/index.html"
            } else {
                let projalert = document.querySelector("#projectAlert");
                while (projalert.hasChildNodes()) {  
                    projalert.removeChild(alert.firstChild);
                }
                uData.errors.forEach(validationError => {
                    let errorEl = document.createElement("p");
                    errorEl.textContent = validationError;
                    projalert.append(errorEl);
                    projalert.classList.remove("d-none")
                })
            }
        }).catch(err => console.log(err))
    })
    
}