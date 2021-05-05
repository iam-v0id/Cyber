module.exports.validateRegisterInput = (
    username,
    password,
    confirmpassword,
    email
)=>{
    const errors = {}
    if(username.trim()==''){
        errors.username = 'Username should not be empty'
    }
    if(email.trim()==''){
        errors.email = 'email should not be empty'
    }
    if(password===''){
        errors.password = 'Password must not be empty'
    }
    else if(password!==confirmpassword){
        errors.confirmpassword = 'passwords must match'
    }
    return{
        errors,
        valid: Object.keys(errors).length<1
    }
}

module.exports.validateLogin=(
    username,
    password
)=>{
    const errors = {}
    if(username.trim()===''){
        errors.username = 'Username should not be empty'
    }
    if(password.trim()===''){
        errors.password='Password should not be empty'
    }
    return{
        errors,
        valid: Object.keys(errors).length<1
    }
}