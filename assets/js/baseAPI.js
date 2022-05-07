$.ajaxPrefilter(function(options){
    // return "http://www.liulongbin.top:3008"+options;
    options.url = "http://www.liulongbin.top:3008"+options.url;

    if(options.url.indexOf("/my") !== -1){
        options.headers = {Authorization:localStorage.getItem("token") || ""}

    }
    //不论成功失败都会调用该函数 ajax
    options.complete = function(res) {
        if(res.responseJSON.code ===1 && res.responseJSON.message === "身份认证失败！"){
                localStorage.removeItem("token");
                location.href="/login.html"
        }
    }

   
   
})