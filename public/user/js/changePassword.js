

const formId = document.getElementById('formId')
const currentPasswordInput = document.getElementById('currentpassword')
const newPasswordInput = document.getElementById('newpassword')
const confirmPasswordInput = document.getElementById('confirmpassword')
const errorMessage = document.getElementById('errorMessage')

formId.addEventListener("submit",(event)=>{
    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    if(currentPassword.length==0){
        event.preventDefault()
        errorMessage.textContent="Enter the current password"
    }
    else if (newPassword.length == 0) {
        event.preventDefault(); // Prevent form submission
        errorMessage.textContent = "Enter the new password";
    }
    
    else if (confirmPassword.length == 0 || newPassword!==confirmPassword) {
      
        event.preventDefault(); // Prevent form submission
        errorMessage.textContent = "passwords are not matching";
    }
 
})