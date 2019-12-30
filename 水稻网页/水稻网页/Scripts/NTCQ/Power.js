        $('#table').bootstrapTable({

            url: '/NTCQ/getPower',
            method: 'get',
            dataType: "json",
            singleSelect: true,
            striped: true,
            toolbar: '#toolbar',
            clickToSelect: true,
            pagination: true,
            cache: false,
            pageNumber: 1,//如果设置了分页，首页页码
            pageSize: 20,//如果设置了分页，页面数据条数
            pageList: [10, 15, 20, 40],	//如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。
            paginationPreText: '‹',//指定分页条中上一页按钮的图标或文字,这里是<
            paginationNextText: '›',//指定分页条中下一页按钮的图标或文字,这里是>
            singleSelect: true,//设置True 将禁止多选
            search: true, //显示搜索框
            data_local: "zh-US",//表格汉化
            sidePagination: "client", //服务端处理分页
            uniqueId: "UserName",//指定主键列
            columns: [{
                checkbox: true,
            }, {
                field: 'UserName',
                title: '用户名'
            }, {
                field: 'Name',
                title: '姓名'
            }, {
                field: 'Tel',
                title: '联系方式',

            }],

        });

        function refreshTable() {
            $('#table').bootstrapTable('refresh', {
                url: '/NTCQ/getPower',
                silent: true,
            });
        }

        $("#btn_Add").click(function () {
            document.getElementById("InsertUserName").value = "";
            $("#AddModal").modal('show');
        });

        $("#doSubmitAdd").click(function () {

            if ($("#InsertUserName").val() == null || $("#InsertUserName").val() == "") {
                alert("用户名不能为空");
                return;
            }

            if (!confirm('确定添加该管理员？')) {
                return;
            }

            var UserName = $("#InsertUserName").val();

            $.ajax({
                url: '/NTCQ/addPower?UserName=' + UserName,
                type: 'post',
                cache: false,
                success: function (data, stutas, xhr) {
                    var res = JSON.parse(data);
                    if (res.errCode == "0") {
                        alert("添加成功");
                        window.location = '/NTCQ/Power'
                    }
                    else
                        alert(res.errMsg);
                },
                error: function (xhr, textStatus, data) {
                    alert("Server Error");
                },
                complete: function (xhr, textStatus) {
                },
            });
        });

        $('#AddModal').on('hidden.bs.modal', function () {
            document.getElementById("InsertUserName").value = "";
            $("#AddBody").empty();
        })

$("#btn_Del").click(function () {
    var row = $('#table').bootstrapTable('getSelections', function (row) {
        return row;
    });
    var userName = row[0].UserName;
    if (!confirm('确定删除管理员：' + userName+'？')) {
        return;
    }
    $.ajax({
        url: '/NTCQ/delPower?UserName=' + userName,
        type: 'post',
        cache: false,
        success: function (data, stutas, xhr) {
            var res = JSON.parse(data);
            if (res.errCode == "0") {
                alert("删除成功");
                window.location = '/NTCQ/Power'
            }
            else
                alert(res.errMsg);
        },
        error: function (xhr, textStatus, data) {
            alert("Server Error");
        },
        complete: function (xhr, textStatus) {
        },
    });
});

        