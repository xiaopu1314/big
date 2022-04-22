$(function(){
    var layer = layui.layer
    var $image = $("#image")
    const options = {
        aspectRatio:1,
        preview:'.img-preview'
    }
    $image.cropper(options)
    $("#btnChooseImage").on("click",function(){
        $("#file").click()
    })

    $("#file").on("change",function(e){
        var filelist = e.target.files
        console.log(filelist.length);
        if(filelist.length === 0){
           return layer.msg("请选择照片！")
        }
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image.cropper("destroy").attr('src',newImgURL).cropper(options)
    })
    $("#btnUpload").on("click",function(){
            var dataURL = $image.cropper("getCroppedCanvas",{
                width:100,
                height:100
            }).toDataURL("image/png")

        $.ajax({
            type: "PATCH",
            url: "/my/update/avatar",
            data: {
                avatar:dataURL
            },
            success: function (res) {
                if(res.code !== 0){
                   return layer.mag("更换头像失败")
                }
                layer.msg("更换头像成功")
                window.parent.getUserInfo()
            }
        });

    })

})