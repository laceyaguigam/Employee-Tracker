
//connects to mysql database
const  inquirer = require("inquirer");
const mysql = require(`mysql2`);

//connect the application to the MySQL database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,  (put your user name)
      user: 'root',
      // Your MySQL password  (put your password)
      password: 'password',
      database: 'employee_db'
    },
    console.log('Connected to the election database.')
  );
db.connect((err)=> {
  if (err) throw err;
  else {
    start()
  }
})
// GIVEN a command-line application that accepts user input
function start(){
inquirer.prompt([
  {
    message: "What would you like to do?",type: "list", name: "whattodo", choices:["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "I'm done"]
  }
]).then(answer => {
  if(answer.whattodo === "view all departments") {
 db.query(`SELECT * FROM department`, (err, result) => {
      console.table(result)
      start()
    })

  } 
  else if (answer.whattodo === "view all roles") {
    console.log(answer.whattodo)
    db.query(`SELECT * FROM role`, (err, result) => {
      console.table(result)
      start()
    })
  }
  else if (answer.whattodo === "view all employees") {
    console.log(answer.whattodo)
    db.query(`SELECT * FROM employee`, (err, result) => {
      console.table(result)
      start()
    })
    
  }
  else if (answer.whattodo === "add a department") {
    console.log(answer.whattodo)
    inquirer.prompt({
      type: 'input',
      name: 'newDepartment',
      message: 'What is the name of the new department?'
    }).then((answer)=>{
      db.query(`INSERT INTO department (name) VALUES ('${answer.newDepartment}')`, (err)=>{
        if (err) throw err;
        start();
      })
    })
  }
  else if (answer.whattodo === "add a role") {
    console.log(answer.whattodo)
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of the new role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the new role?'
      },
      {
        type: 'input',
        name: 'newRoleDepartmentId',
        message: 'What is the name of the departmentId of the new role?'
      },
    ]).then((answer)=>{
      db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', ${answer.salary}, ${answer.newRoleDepartmentId})`, (err)=>{
        if (err) throw err;
        start();
      })
    })
  }
  else if (answer.whattodo === "add an employee") {
    console.log(answer.whattodo)
    inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "What is the employee's first name?"
      },
      {
        type: 'input',
        name: 'last_name',
        message: "What is the employee's last name?"
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'What is the role_id of the new employee?'
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'What is the manager_id of this employee?'
      },
    ]).then(answer => {
      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.first_name}', '${answer.last_name}', ${answer.role_id}, ${answer.manager_id})`, (err)=>{
        if (err) throw err;
        start();
      })
    })
  }
  else if (answer.whattodo === "update an employee role") {
    inquirer.prompt([
      {
        type: "input",
        message: "which id is the employee id you want to update?",
        name: "newEmployeeRoleId"
      },
      {
        type: "input",
        message: "what role_id would you like the employee to have?",
        name: "newRoleId"
      }
    ])
    .then(answer => {
      console.log(answer.whattodo)
      db.query(`UPDATE employee SET role_id = ${answer.newRoleId} WHERE employee.id = ${answer.newEmployeeRoleId}`, (err)=>{
        if (err) throw err;
        start()
      })
      
    })
  } else {
    process.exit()
  }
})
}

