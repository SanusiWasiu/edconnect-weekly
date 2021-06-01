const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.matricNumber = matricNumber;
        this.program = program;
        this.graduationYear = graduationYear;
    }

    getFullName() {
        return `${this.firstname} ${this.lastname}`
    }
}

class Users extends DataModel {
    /*constructor(){
        super()
    }*/
    authenticate(email, password) {
        let auth = false
        for (let elem of this.data){
            if (elem.email === email && elem.password === password){
                auth = true
            }
        }
        return auth
        /*let auth = this.data.filter(elem => (elem.email === email && elem.password === password))
       if (auth.length > 0) {
           return true
       }
       return false*/
    }

    getByEmail(email) {
        return this.data.find(objs => objs.email === email) || null
    }

    getByMatricNumber(matricNumber) {
        return this.data.find(objs => objs.matricNumber === matricNumber) || null  
    }

    validate(obj) {
        this.errors = []
        var zeroth = true
        var first = true
        var second = true
        var third = true
        for (let key in obj){
            if (obj[key] == ''){
                zeroth = false
                this.errors.push(`${key}` + " should not be empty")
            }
        }
        
        if (this.data.filter(objs => objs.email === obj.email).length >= 1) {
                first = false
                this.errors.push("A user with specified email address already exists")
        }

        if (this.data.filter(objs => objs.matricNumber === obj.matricNumber).length >= 1) {
            second = false
            this.errors.push("A user with specified matric number already exists")
    }

        if (obj.password.length < 7) {
            var third = false
            this.errors.push("Password should have at least 7 characters")
        }
        if (zeroth === true && first === true && second === true && third === true) {
            return true
        }else{
            return false
        }
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};