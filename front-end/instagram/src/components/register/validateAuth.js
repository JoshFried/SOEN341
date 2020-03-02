const validationAuth = values => {
  let errors = {};
  // email errors
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  //password errors
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be atleast 6 characters";
  }
  //password re-entry errors
  if (!values.password2) {
    errors.password2 = "Password is required";
  } else if (values.password2.length < 6) {
    errors.password2 = "Password must be atleast 6 characters";
  } else if (values.password != values.password2){
    errors.password2 = "Your passwords do not match"
  }
  //username errors
  if(!values.username){
    errors.username = "Username is require"
  }
  //first name errors
  if(!values.firstName){
    errors.firstName = "First name is require"
  }
  //last name errors
  if(!values.lastName){
    errors.lastName = "Last name is require"
  }
  return errors;
};
export default validationAuth;
