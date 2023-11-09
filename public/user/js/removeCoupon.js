$(document).ready(function() {
    $('#couponRemove').click(function (event){
        event.preventDefault()



        $.ajax({
            url:'/removeCoupon',
            type:'GET',
            success:function(response){
                console.log(response)
                if(response.success){
                    location.reload()
                }
            }
        })
    })
})