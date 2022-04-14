$.ajaxPrefilter(function(options){
    console.log("调用我了");
    // return "http://www.liulongbin.top:3008"+options;
    options.url = "http://www.liulongbin.top:3008"+options.url;
    console.log(options.url);

    if(options.url.indexOf("/my") !== -1){
        options.headers = {Authorization:localStorage.getItem("token") || ""}

    }
    options.complete = function(res) {
        // console.log("执行了complete");
        console.log(res);

        if(res.responseJSON.code ===1 && res.responseJSON.message === "身份认证失败！"){
                localStorage.removeItem("token");
                location.href="/login.html"
        }
    }

   
   
})