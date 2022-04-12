$.ajaxPrefilter(function(options){
    return "http://www.liulongbin.top:3008"+options.url;
    // options.url =  "http://www.liulongbin.top:3008"+options.url;
    // console.log(options.url);
})