$(document).ready(function () {
    $('#couponApply').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the coupon code from the input field
        const coupon = $('input[name="coupon"]').val();
        const errorMessage = document.getElementById('errorMessageCoupon')

        // Send an AJAX request to your /getCoupon endpoint
        $.ajax({
            type: 'POST', // You can change the HTTP method if needed
            url: '/applyCoupon', // Replace with your actual endpoint
            data: { coupon: coupon },
            success: function (response) {
                // Handle the response from the server
                console.log(response)
                if (response.success) {
                    location.reload()
                } else {
                    console.log(response.message,errorMessage)
                    errorMessage.textContent = response.message
                }
            },
            error: function (error) {
                // Handle AJAX errors
                console.error(error);
                alert('An error occurred while applying the coupon.');
            },
        });
    });
});


// $(document).ready(function(){
//     $('#couponApply').submit(function (event){
//         event.preventDefault();
//         console.log("log")
//         var couponName = $('#couponInput').val();
//         console.log(couponName);

//         $ajax({
//             url:'/applyCoupon',
//             type: "POST",
//             body:{couponName},
//             success:function(res){
//                 if(res.success){
//                     location.reload()
//                 }
//             }
//         })
//     })
// })