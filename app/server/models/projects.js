const e = require('express');
const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
        this.id = id;
        this.name = name;
        this.abstract = abstract;
        this.authors = authors;
        this.tags = tags;
        this.createdBy = createdBy;
    }
}

class Projects extends DataModel {
    validate(obj) {
        this.errors = []
        var former = true
        var latter = false
        var news = false
        for (let key in obj){
            if (obj[key] == ''){
                former = false
                this.errors.push(`${key}` + " should not be empty")
            }
        }
        if (Array.isArray(obj.authors)){
            news = true
        }else{
            this.errors.push("Authors should be an array")
        } 
        
        if (Array.isArray(obj.tags)){
            latter = true  
        }else{
            this.errors.push("Tags should be an array")
        }
        
        if(former === true && latter === true && news === true){
            return true
        }else{
            return false
        }
    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};