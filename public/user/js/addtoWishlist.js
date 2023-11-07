$(document).ready(function () {
    $('.toWishlist').click(function (e) {
        e.preventDefault(); // Prevent the default behavior of following the link

        var productId = $(this).data('item-id');
        console.log(productId)

        $.ajax({
            url: `/addToWishlist?productId=${productId}`, // Replace with the actual URL for adding to the wishlist
            type: 'GET', // Use GET or POST as per your server's requirements
            // data: { productId: productId }, // Send the product ID to the server
            success: function (res) {
                if(res.success){
                    location.reload()
                }else{
                    window.location = '/login'
                }
            },
            error: function (xhr, status, error) {
                // Handle errors here
                console.log('Error: ' + error);
            }
        });
    });
});
