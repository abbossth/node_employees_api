const Employee = require('../model/Employee');

const getAllEmployees = async (req,res) => {
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ msg: 'No employees found!' })
    res.json(employees);
}

const createNewEmployee = async (req,res) => {
    if (!req.body.name || !req.body.age) {
        return await res.status(400).json({msg: "Name and age are required!"})
    }
    try {
        const result = await Employee.create({
            name: req.body.name,
            age: req.body.age
        });
        return res.status(201).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }

}

const updateEmployee = async (req,res) => {
    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(400).json({ msg: `Employee ID8 ${req.body.id} is not found` })
    } 
    if (req.body?.name) employee.name=req.body?.name
    if (req.body?.age) employee.age=req.body?.age

    try {
        const result = await employee.save();
        return res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }

}

const deleteEmployee = async (req,res) => {
    if (!req.body?.id) return res.status(400).json({ msg: 'ID is required' });
    
    try {
        const employee = await Employee.findOne({ _id: req.body?.id });
        if (!employee) {
            return res.status(400).json({ msg: `Employee ID ${req.body.id} is not found` })
        } 

        const result = await Employee.deleteOne({ _id: req.body?.id });
        res.json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getEmployee = async (req,res) => {
    if (!req.params.id) return res.status(400).json({ msg: `No matches found with Employee ID ${ req.params.id }`});
    try {
        const employee = await Employee.findOne({ _id: req.params.id });
        return res.json(employee);
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = { 
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee, 
    getEmployee, 
}