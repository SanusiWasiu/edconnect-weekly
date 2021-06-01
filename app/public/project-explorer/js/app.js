let path = window.location.href;
window.onload = function(){
    if(path.includes('register.html')){
        callRegister()
    }
    if(path.includes('index.html')){
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
