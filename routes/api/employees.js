const express = require('express')
const router = express.Router()
const verifyRoles = require("../../middleware/verifyRoles")
const ROLES_LIST = require('../../config/roles_list')

const { 
    getAllEmployees, 
    createNewEmployee,
    updateEmployee, 
    deleteEmployee, 
    getEmployee 
} = require('../../controllers/employeesController')


router.route('/api/employees')
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee)

// single employee
router.route('/api/employee/:id')
    .get(getEmployee)

module.exports = router