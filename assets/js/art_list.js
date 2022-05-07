$(function(){

    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;

    template.defaults.imports.dataFormat=function(date){
        const dt = new Date(date);

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth()+1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d +' '+hh+':'+mm+':'+ss
    }
    function padZero(n){
       return n>9?n:"0"+n
    }

    var q = {
        pagenum:1,//页码
        pagesize:2,//每页显示两调
        cate_id:'',
        state:''

    }
    //获取文章列表
    function initTable() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if(res.code !== 0){
                    return layer.msg("获取文章失败")
                }
                var htmlStr = template("tpl-table",res);
                $("tbody").html(htmlStr)
                //调用渲染分页的方法
                renderPage(res.total)
            }
        });
        
    }
    //初始化文章分类
    function initCate() {
        $.ajax({
            type: "GET",
            url: "/my/cate/list",
            success: function (res) {
                if(res.code !==0){
                    return layer.msg("获取分类失败")
                }
                var htmlStr = template("tpl-list",res)
              
                $("[name=cate_id]").html(htmlStr);
                form.render()
            }
        });
    }

    $("#form-search").on("submit",function(e){
           e.preventDefault() 
           var cate_id = $("[name=cate_id]").val()
           var state = $("[name=state]").val()
           q.cate_id = cate_id
           q.state = state
           initTable()
          
    });
    function renderPage(total) { 
       laypage.render({
           elem:'pageBox',//分页容器的id
           count:total,//总数据
           limit:q.pagesize,//每页显示几条
           curr:q.pagenum,
           layout:['count','limit', 'prev','page','next','skip'],
           limits:[2,3,5,10],
           
           //分页发生切换时，触发jump
           jump:function(obj,frist){
               console.log(frist)
               console.log("obj.limit"+obj.limit);

               q.pagenum = obj.curr
               q.pagesize= obj.limit
               if(!frist){
                   initTable()
               }
           }

       })
       
     }
     $("tbody").on("click",".btn-delete",function(){
        var len = $(".btn-delete").length
        console.log(len);
        var id = $(this).attr("data-id")
        console.log(id);
        layer.confirm("确认删除？",{icon:3,title:'提示'},function(index){
            $.ajax({
                type: "DELETE",
                url: "/my/article/info?id="+id,
                success: function (res) {
                    if(res.code!==0){
                        return layer.msg("删除文章失败")
                    }

                    if(len == 1){
                        q.pagenum = q.pagenum === 1?1:q.pagenum - 1
                    }
                    layer.close(index)
                    initTable()

                }
            });

         });
     })



    initTable()
    initCate()
})