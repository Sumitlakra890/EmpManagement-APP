const EmployeeModels = require('../Models/EmployeeModels')
const createEmployee = async (req, res) => {
    try {
        const body = req.body;
        const profileImage = req?.file ? req?.file?.path : null;
        console.log(body);
        body.profileImage = profileImage;
        const emp = new EmployeeModels(body);

        await emp.save();
        res.status(201)
            .json({
                message: 'Employee Created',
                success: true
            });
    } catch (err) {
        console.log('Error ', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}
    // console.log(req.body);
    // res.send("got it");
    const getAllEmployees = async (req, res) => {
        try {

            let {page,limit, search} = req.query;
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 5;

            const skip = (page-1) * limit;
            let searchCriteria = {};
            if(search){
                searchCriteria = {
                    name: {
                        $regex : search,
                        $options : 'i' 
                    }
                }
            }
            const totalEmployees =await EmployeeModels.countDocuments(searchCriteria);

            const emps = await EmployeeModels.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({updatedAt: -1});

            const totalPages = Math.ceil(totalEmployees / limit);

            res.status(200)
                .json({
                    message: 'All Employees',
                    success: true,
                    data: {
                        employees: emps,
                        pagination: {
                            totalEmployees,
                            currentPage: page,
                            totalPages,
                            pageSize: limit
                        }
                    }
                });
        } catch (err) {
            console.log('Error ', err);
            res.status(500).json({
                message: 'Internal Server Error',
                success: false,
                error: err
            })
        }
}

const getEmployeeById = async (req, res) => {
    try {
        const {id} = req.params;
        const emp = await EmployeeModels.findOne({_id: id});
        res.status(200)
            .json({
                message: 'All Employees',
                success: true,
                data: emp
            });
    } catch (err) {
        console.log('Error ', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const deleteEmployeeById = async (req, res) => {
    try {
        const {id} = req.params;
        const emp = await EmployeeModels.findByIdAndDelete({_id: id});
        res.status(200)
            .json({
                message: 'Employees Deleted',
                success: true,
                data: emp
            });
    } catch (err) {
        console.log('Error ', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const updateEmployeeById = async (req, res) => {
    try {
        const { name , phone,email,salary,department } = req.body;
        const {id} = req.params;
        // const profileImage = req?.file ? req?.file?.path : null;
        // console.log(body);
        // body.profileImage = profileImage;

        let updateData = {
             name , phone,email,salary,department,updateAt: new Date()
        }
       
        if(req.file)
        {
            updateData.profileImage = req.file.path;
        }

        const updateEmployee = await EmployeeModels.findByIdAndUpdate(
            id,
            updateData,
            { new: true}
        )
        
        if(!updateEmployee)
        {
            return res.status(404).json({ message: "Employee Not Found"});
        }
        
        res.status(200)
            .json({
                message: 'Employee updated',
                success: true,
                data: updateEmployee
            });
    } catch (err) {
        console.log('Error ', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}


module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployeeById,
    updateEmployeeById
}

