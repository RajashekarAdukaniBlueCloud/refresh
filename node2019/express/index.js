const Joi = require("joi");
const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    {id:1, name:'course 1'},
    {id:2, name:'course 2'}
]

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("given id not found");
    res.send(course);
});
app.post("/api/courses", (req, res) => {
    const { error } = validationCourse(req.body);
    if(error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const course = {  id: courses.length + 1, name: req.body.name }
    courses.push(course);
    res.send(course)
});
app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params  .id));
    if(!course) res.status(404).send("id was not found");
    const { error } = validationCourse(req.body);
    if(error) {
        res.status(400).send(error.details[0].message)
        return
    }
    course.name = req.body.name;
    res.send(course);
});
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(400).send("given id not in the list");
     const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course)
})

function validationCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));