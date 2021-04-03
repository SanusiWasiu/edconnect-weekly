/*class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        return this.data.find(objs => objs.id) || null
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        this.data[id] = obj
        if (this.data.find(objs => objs.id) !== undefined){
            return true
        }else{
            return false
        }
    }

    delete(id) {
        this.data.splice(indexOf(this.data[id]), 1)
        if (this.data.find(objs => objs.id) !== undefined){
            return true
        }else{
            return false
        }
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}
*/
// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course

class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        return this.data.find(objs => objs.id === id) || null
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        obj = {'id': id}
        this.data.push(obj)
        if (this.data.length > 0){
            return true
        }else{
            return false
        }
    }

    delete(id) {
        let omo = this.data.find(objs => objs.id == id)
        this.data.splice(this.data.indexOf(omo), 1)
        if (this.data.includes(omo)){
            return false
        }else{
            return true
        }
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;