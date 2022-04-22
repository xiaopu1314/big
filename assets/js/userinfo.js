$(function () {
    var form = layui.form
    var layer = layui.layer
    var id =null;
    form.verify({
        nikename  :function(value){
           if(value.length > 6) {
               return "昵称必须在0~6个字符之间"
           }
        }

    })
    initUserInfo()
    function initUserInfo(){
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if(res.code !==0){
                    return layer.msg("获取用户信息失败")
                }
                // 调用form.val快速和表单赋值
                // console.log(res.data);
                id = res.data.id
                form.val("formUserInfo",res.data);
                
            }
        });
    }

    $("#btnReset").on("click",function(e){
        e.preventDefault();
        initUserInfo()
    })
    $(".layui-form").on("submit",function(e){
        e.preventDefault();
        var data = "id="+id+"&"+$(this).serialize();
        console.log(data);
        $.ajax({
            type: "PUT",
            url: "/my/userinfo",
            data: data,
            success: function (res) {
                if(res.code !==0)
                {
                    layer.msg("修改失败")
                }
                layer.msg(res.message)
                //调用父页面的方法
                window.parent.getUserInfo()

            }
        });


    })


})