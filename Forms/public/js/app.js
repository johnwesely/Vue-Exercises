class Errors {
    constructor() {
        this.errors = {};
    }

    // gets the error for given field
    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    // records errors to this
    record(errors) {
        this.errors = errors['errors'];
    }

    // clears single fields errors if given or all errors
    clear(field) {
        if (field) {
            delete this.errors[field];
        } else {
            this.errors = {};
        }
    }

    // returns true if given field has an error
    has(field) {
        return this.errors.hasOwnProperty(field);
    }

    // returns true if any errors exist
    any() {
        return Object.keys(this.errors).length > 0;
    }
}

class Form {
    constructor(data) {
        this.originalData = data;     // save original data for ability to dynamically access field

        for (let field in data) {
            this[field] = data[field];
        }

        this.errors = new Errors()
    }

    // reset form
    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }

        this.errors.clear();
    }

    // fetch relevant object for form
    data() {
        let data = Object.assign({}, this);

        delete data.originalData;
        delete data.errors;

        return data;
    }

    // submmit data with requestType to url returns promise for handling by Vue instance
    submit(requestType, url) {
        return new Promise((resolve, reject) => {
            axios[requestType](url, this.data())
                .then(response => {
                    this.onSuccess(response.data);
                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.response.data);
                    reject(error.response.data);
                })
        });
    }

    onSuccess(data) {
        alert(data.message);
        this.reset();
    }

    onFail(errors) {
        this.errors.record(errors);
    }
}

new Vue({
    el: '#app',

    data: {
        form: new Form({
            name: '',
            description: ''
        })
    },

    methods: {
        onSubmit() {
            this.form.submit('post', '/store')      //form.submit returns promise for handling
                .then(data => console.log(data))
                .catch(error=> console.log(error));
        }
    }
});