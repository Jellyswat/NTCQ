$('#table').bootstrapTable({
    url: '/NTCQ/getSection',
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
    search: true, //显示搜索框
    data_local: "zh-US",//表格汉化
    sidePagination: "client", //服务端处理分页
    columns: [{
        checkbox: true,
    },{
        field: 'Id',
        title: '地区号'
    }, {
        field: 'sectionName',
        title: '地区名'
    }],

});

function refreshTable() {
    $('#table').bootstrapTable('refresh', {
        url: '/NTCQ/getSection',
        silent: true,
    });
}

$("#btn_Add").click(function () {
    document.getElementById("InsertSection").value = "";
    $("#AddModal").modal('show');
});

$("#doSubmitAdd").click(function () {

    if ($("#InsertSection").val() == null || $("#InsertSection").val() == "") {
        alert("地区名不能为空");
        return;
    }

    if (!confirm('确定添加该地区？')) {
        return;
    }

    var sectionName = $("#InsertSection").val();

    $.ajax({
        url: '/NTCQ/addSection?sectionName=' + sectionName,
        type: 'post',
        cache: false,
        success: function (data, stutas, xhr) {
            var res = JSON.parse(data);
            if (res.errCode == "0") {
                alert("添加成功");
                window.location = '/NTCQ/SectionList'
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
    document.getElementById("InsertSection").value = "";
    $("#AddBody").empty();
})

$("#btn_Del").click(function () {
    var row = $('#table').bootstrapTable('getSelections', function (row) {
        return row;
    });
    var sectionId = row[0].Id;
    if (!confirm('确定删除该地区？')) {
        return;
    }
    $.ajax({
        url: '/NTCQ/delSection?sectionId=' + sectionId,
        type: 'post',
        cache: false,
        success: function (data, stutas, xhr) {
            var res = JSON.parse(data);
            if (res.errCode == "0") {
                alert("删除成功");
                window.location = '/NTCQ/SectionList'
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