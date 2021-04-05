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
        for (let i = 0; i<this.data.length; i++){
            if (this.data[i].email === email && this.data[i].password === password){
                return true
            }
        return false
        }
    }

    getByEmail(email) {
        return this.data.find(objs => objs.email === email) || null
    }

    getByMatricNumber(matricNumber) {
        return this.data.find(objs => objs.matricNumber === matricNumber) || null  
    }

    validate(obj) {
        var zeroth = true
        var first = true
        var second = true
        var third = true
        for (let key in obj){
            if (obj[key] == ''){
                zeroth = false
            }
        }
        
        if (this.data.filter(objs => objs.email === obj.email).length >= 1) {
                first = false
        }

        if (this.data.filter(objs => objs.matricNumber === obj.matricNumber).length >= 1) {
            second = false
    }

        if (obj.password.length < 7) {
            var third = false
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