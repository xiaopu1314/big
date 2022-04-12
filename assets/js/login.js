// http://ajax.frontend.itheima.net



$(function(){
    $("#link_reg").on("click",function() {
        $(".reg-box").show();
        $(".login-box").hide()
    });
    $("#link_login").on("click",function() {
        $(".reg-box").hide();
        $(".login-box").show();
    })


//layui的校验方法
    var form = layui.form
    var layer = layui.layer

    form.verify({
        // 密码6-12位，且不能有空格
        pwd:[/^[\S]{6,12}$/,'密码6-12位，且不能有空格'],
        // 校验两次密码是否相同
        repwd:function(value){
         var pwd = $(".reg-box [name=password]").val()
         console.log(pwd);
           if(pwd!==value){
               return "两次的密码不一样"
           }
        }
    })

    $("#form_reg").on("submit",function(e){
        var data = {username:$("#form_reg [name=username]").val(),password:$("#form_reg [name=password]").val(),repassword:$("#form_reg [name=repassword]").val()};
        e.preventDefault();
        $.post("/api/reg", data,
            function (res) {
                if(res.code !=0){
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录');

                $("#link_login").click()
            }
        );

    });
    $("#form_login").submit(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            //快速获取表单的数据
            data: $(this).serialize(),
            success: function (res) {
                if(res.code != 0)
                {
                   return layer.msg(res.message);
                }
                layer.msg(res.message)
                localStorage.setItem("token",res.token)
                location.href = "/index.html"
            }
        });
        
    });


})