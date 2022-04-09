import bcrypt from 'bcryptjs'

const users = [
    {
       name:'Admin User', 
       email:'admin@examble.com',
       password: bcrypt.hashSync('1234',10),
       isAdmin: true
    },
    {
       name:'Karthik', 
       email:'karthik@examble.com',
       password: bcrypt.hashSync('1234',10),
     
    },
    {
       name:'Adharsh', 
       email:'adharsh@examble.com',
       password: bcrypt.hashSync('1234',10),
  
    },

    {
    name:"karthik",
       email : "karthik@exaple.com",
       
       password: "1234"
      }

   
]

export default users