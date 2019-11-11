const Mongoose= require ("mongoose");

const StudentSchema = Mongoose.Schema({
    carnet: String,
    schedule: String,
    isLate: Boolean,
    datetime: Date,
});

module.exports = Mongoose.model("Student", StudentSchema);