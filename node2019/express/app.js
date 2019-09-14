const Joi = require("joi");
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id:1, name:'course 1'},
    {id:2, name:'course 2'},
    {id:3, name:'course 3'},
    {id:4, name:'course 4'},
    {id:5, name:'course 5'},
    {id:6, name:'course 6'},
    {id:7, name:'course 7'},
    {id:8, name:'course 8'},
    {id:9, name:'course 9'},
    {id:10, name:'course 10'}
]

app.get('/', (req, res) => {
    res.send("Hello wrold");
});

app.get("/api/courses", (req, res) => {
    //res.send([1,2,3,4,5,6,7,8,9]);
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
   // res.send(req.params.id)
   const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("the course with given id not found");
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query)
});

app.post("/api/courses", (req, res) => {
    // const schema = {
    //     name: Joi.string().min(3).required()
    // }
    // const result = Joi.validate(req.body, schema);
    // if(result.error) {
    //     res.status(400).send(result.error.details[0].message);
    //     return
    // }
    //validate input always don't trust client input data 
    //400 bad request
    // if(!req.body.name || req,body.name.length < 3) {
    //     res.send(400).send("name is required more then 3 latters");
    //     return
    // }
    
    // object distractring {error}
    const { error } = validationCourse(req.body);
    if(error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const course = { 
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course)
});

app.put("/api/courses/:id", (req, res) => {
    // Look up at the course
    const course = courses.find(c => c.id === parseInt(req.params  .id));
    // if not existing, return 404
    if(!course) res.status(404).send("The course with id was not found")

    const { error } = validationCourse(req.body);
    if(error) {
        res.status(400).send(error.details[0].message)
        return
    }

    //update course
    course.name = req.body.name;
    //return the updated course
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(400).send("The given id was not in the list");
     const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course)
})

function validationCourse(course) {
    //Validate
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
    
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))