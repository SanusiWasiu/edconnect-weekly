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

    //This will update an object within the data array
    update(obj, id) {
        /*for (let i = 0; i<this.data.length; i++){
            if (this.data[i].id === id){
                this.data[i] = {...this.data[i], ...obj}
                return true
            }else{
                return false
            }
        }*/
        let index = this.data.findIndex((e) => e.id === id)
        if (index !== -1) {
            let found = this.data[index]
         for (let i in obj) {
             found[i] = obj[i]
         }
         this.data[index] = found

          return true

        }else {
            return false
        }
    }
    //This will delete an object within the array
    delete(id) {
        let omo = this.data.find(objs => objs.id == id)
        if (this.data.includes(omo)){
            this.data.splice(this.data.indexOf(omo), 1)
            return true
        }
        return false
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;