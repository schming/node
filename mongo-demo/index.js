
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

async function getCourse(id) {
    const course = await Course.findById(id).select({ name: 1, author: 1, isPublished: 1 });
    if(!course) return console.log('That course could not be found in the Db');

    console.log(course);
}

async function deleteCourse(id) {
    const result = await Course.findByIdAndDelete(id);
    if(!result) return console.log('An error has occurred, and the entry has not been deleted');

    console.log('All done', result);
}

async function updateCourse(id) {
    const result = await Course.findOneAndUpdate({ _id: id }, {
        author: 'Belter'
    }, { new: true });
    if(!result) return console.log('An error has occurred and the entry has not been updated');

    console.log(result);
}

getCourse('5bacfb7419008504882515e5');
// getCourses();
// updateCourse('5bacfb7419008504882515e5');
// deleteCourse('5bacfbd3f3990320709e16ff');
// createCourse();