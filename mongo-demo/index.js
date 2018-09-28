
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.log('Could not connect', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'React Course',
        author: 'Natalie',
        tags: ['react', 'frontend'],
        isPublished: false
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course
        .find({ author: 'Damien', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

async function deleteCourse(id) {
    const result = await Course.findByIdAndDelete(id)
        .then(console.log('All done', result))
        .catch((error) => console.log('Something went wrong', error));
}

// deleteCourse('5badc4ad0babf0210c3f79f2');
createCourse();