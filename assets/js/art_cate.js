$(function(){

    var layer = layui.layer
    var form = layui.form
    initArtCateList()
    // 获取文章数据
    function initArtCateList(){
        $.ajax({
            type: "GET",
            url: "/my/cate/list",  
            success: function (res) {
                var htmlStr = template("tel_table",res)
                $("tbody").html(htmlStr)
            }
        });
    }
    var indexAdd = null;
    $("#btnAddCate").on("click",function(){
        indexAdd = layer.open({
            type:1,
            area:["500px","250px"],
            title: '添加文章分类'
            ,content: $("#dialog_add").html()
        });
    })

    // 利用代理事件
    $("body").on("submit","#form-add",function(e){
       e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/cate/add",
            data: $(this).serialize(),
            success: function (res) {
                if(res.code !== 0) {
                    layer.masg("新增分类失败！")
                } 
                initArtCateList()
                layer.msg("新增分类成功")
                layer.close(indexAdd)
            }
        });
    })

    var indexEdit = null
    //编辑
    $("tbody").on("click","#btn-edit",function(){
        indexEdit = layer.open({
            type:1,
            area:["500px","250px"],
            title: '修改文章分类'
            ,content: $("#dialog_edit").html()
        });
        var Id = $(this).attr("data-id")
        $.ajax({
            type: "GET",
            url: "/my/cate/info",
            data: {id:Id},
            success: function (res) {
               console.log(res.data);
               form.val("form-edit",res.data)
            }
        });
    })
    // 编辑数据提交
    $("body").on("submit","#form-edit",function (e) { 
        e.preventDefault()
        $.ajax({
            type: "PUT",
            url: "/my/cate/info",
            data: $(this).serialize(),
            success: function (res) {
                if(res.code !== 0 ){
                    layer.msg("更新出错")
                }
                layer.close(indexEdit)
                layer.msg("更新分类成功")
                initArtCateList()    
            }
        });

     })
     //删除数据
     $("tbody").on("click",".btn-delete",function(e){

        var Id = $(this).attr("data-id")
        layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                type: "DELETE",
                url: "/my/cate/del?id="+Id,
                data: {id:Id},
                success: function (res) {
                    if(res.code !== 0){
                      layer.msg("删除失败！")  
                    }
                    layer.msg("成功删除！");
                    layer.close(index);
                    initArtCateList()
                }
            });
            
            
          });
     })

})