var Student = require('../models/student');
const StudentManager = {};

StudentManager.getAll = (req, res, next) =>{
    Student.find({}, (error, students)=>{
        if(error) return res.status(500).json({success: false, message:"Error interno del servidor"});

        if(students)
        {
            return res.status(200).json({success: true, message:"Peticion de registros realizada con exito", students});
        }
        else
        {
            return res.status(404).json({success: false, message:"No se encontraron registros"});
        }
    });
};

StudentManager.getStudentById = (req, res, next) =>{
    Student.findById(req.params.id, (error, student)=>{
        if(error) return res.status(500).json({success: false, message:"Error interno del servidor"});

        if(student)
        {
            return res.status(200).json({success: true, message:"Registro encontrado", student});
        }
        else
        {
            return res.status(404).json({success: false, message:"No se encontro registro"});
        }
    });
};


StudentManager.create = (req, res, next) =>{

    let student = new Student();
    student.carnet = req.body.carnet;
    student.schedule = req.body.schedule;
    student.isLate = req.body.isLate;
    student.datetime = req.body.datetime;

    student.save((error, student)=>{
        if(error) return res.status(500).json({success: false, message:"Error interno del servidor"});

        if(student)
        {
            return res.status(200).json({success: true, message:"Registro guardado correctamente en el sistema", student});
        }
        else
        {
            return res.status(404).json({success: false, message:"Error al guardar el nuevo registro", student});
        }
    });
};


StudentManager.update = (req, res, next) =>{

    var id = req.body.id;

    req.body.id = undefined;

    Student.findByIdAndUpdate(id, req.body, {new:true}, (error, student)=>{
        if(error) return res.status(500).json({success: false, message:"Error interno del servidor"});

        if(student)
        {
            return res.status(200).json({success: true, message:"Registro actualizado con exito en el sistema", student});
        }
        else
        {
            return res.status(404).json({success: false, message:"Error al actualizar registro"});
        }
    });
};

StudentManager.delete = (req, res, next) =>{

    var id = req.body.id;

    Student.findByIdAndDelete(id, (error, student)=>{
        if(error) return res.status(500).json({success: false, message:"Error interno del servidor"});

        if(student)
        {
            return res.status(200).json({success: true, message:"Registro eliminado con exito del sistema", student});
        }
        else
        {
            return res.status(404).json({success: false, message:"Error al eliminar registro"});
        }
    });
};


module.exports = StudentManager;
