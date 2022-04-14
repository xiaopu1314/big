$(function(){
    getUserInfo();
    var layer = layui.layer;
    $("#btnLogout").on("click",function () {
        //提示用户是否退出
        layer.confirm('确认退出登录？', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem("token");
            location.href = "/login.html"
            layer.close(index);
          });
    })
})

function getUserInfo(){
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers:{
        //     Authorization:localStorage.getItem("token") || ""
        // },
        success: function (res) {
          if(res.code !==0){
            return layui.layer.msg(res.message)
          }
          //调用来渲染用户头像
          console.log(res);
          renderAvatar(res.data)
        },
        //不论成功失败都会调用该函数 
        // complete:function(res) {
        //     // console.log("执行了complete");
        //     console.log(res);

        //     if(res.responseJSON.code ===1 && res.responseJSON.message === "身份认证失败！"){
        //             localStorage.removeItem("token");
        //             location.href="/login.html"
        //     }
        // }
    });
}

function renderAvatar(user){
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp&nbsp"+name)
    if(user.user_pic !== null){
        $(".layui-nav-img").attr("src",user.user_pic).show();
        $(".text-avatar").hide();
    }else{
        $(".layui-nav-img").hide();
        var frist = name[0].toUpperCase();
        $(".text-avatar").html(frist);
}
}