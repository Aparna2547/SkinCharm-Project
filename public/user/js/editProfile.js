

const formId = document.getElementById('editProfileId')
const nameInput = document.getElementById('name')
// const mobileInput = document.getElementById('mobile')
const emailInput = document.getElementById('email')
const errorMessage = document.getElementById('errorMessage')


formId.addEventListener("submit",(event)=>{
    const name = nameInput.value;
    // const mobile = mobileInput.value;
    const email  = emailInput.value;
    if(name.trim().length==0){
        event.preventDefault()
        errorMessage.textContent="Enter the name"
    }
    // else if(mobile.trim().length !==10){
    //     event.preventDefault();
    //     errorMessage.textContent = "Enter the valid phone number"
    // }

    else if(!validateEmail(email)){
        event.preventDefault();
        errorMessage.textContent = "Enter a valid email"
    }
    function validateEmail(email) {
        // Regular expression for a valid email address
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      
        // Test the email against the regex pattern
        return emailRegex.test(email);
    }
      

})
