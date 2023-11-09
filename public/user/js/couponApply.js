$(document).ready(function () {
    $('#couponApply').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the coupon code from the input field
        const coupon = $('input[name="coupon"]').val();

        // Send an AJAX request to your /getCoupon endpoint
        $.ajax({
            type: 'POST', // You can change the HTTP method if needed
            url: '/applyCoupon', // Replace with your actual endpoint
            data: { coupon: coupon },
            success: function (response) {
                // Handle the response from the server
                if (response.message === 'Coupon applied') {
                    // Coupon applied successfully
                    alert('Coupon applied successfully!');
                    // You can also update the UI with the maxDiscount and totalAmount
                    $('#maxDiscount').text(response.maxDiscount);
                    $('#totalAmount').text(response.totalAmount);
                } else {
                    // Handle other response messages accordingly
                    alert(response.message);
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