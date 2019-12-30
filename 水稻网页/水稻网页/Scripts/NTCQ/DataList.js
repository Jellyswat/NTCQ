$('#table').bootstrapTable({
    url: '/NTCQ/getData',
    method: 'get',
    dataType: "json",
    singleSelect: true,
    striped: true,
    toolbar: '#toolbar',
    clickToSelect: true,
    pagination: true,
    cache: false,
    //showToggle: "false",//是否显示 切换试图（table/card）按钮
    //showColumns: "false",//是否显示 内容列下拉框
    pageNumber: 1,//如果设置了分页，首页页码
    // showPaginationSwitch:true,//是否显示 数据条数选择框
    pageSize: 20,//如果设置了分页，页面数据条数
    pageList: [10, 15, 20, 40],	//如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。
    paginationPreText: '‹',//指定分页条中上一页按钮的图标或文字,这里是<
    paginationNextText: '›',//指定分页条中下一页按钮的图标或文字,这里是>
    singleSelect: true,//设置True 将禁止多选
    search: true, //显示搜索框
    data_local: "zh-US",//表格汉化
    sidePagination: "client", //服务端处理分页
    columns: [{
        field: 'startTime',
        title: '开始时间'
    }, {
            field: 'endTime',
            title: '结束时间'
        }, {
            field: 'Num',
            title: '数量'
        }, {
            field: 'sectionName',
            title: '地区名'
        }],

});

function refreshTable(st, en) {
    $('#table').bootstrapTable('refresh', {
        url: '/NTCQ/DataTimeNum?start=' + st + '&end=' + en,
        silent: true,
    });

}

$("#btn_Date").click(function () {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    document.getElementById("Timingst").value = (today);
    document.getElementById("Timingen").value = (today);
    $("#DateModal").modal('show');
});

$("#doSubmitDate").click(function () {
    var st = document.getElementById("Timingst").value;
    var en = document.getElementById("Timingen").value;
    if (st > en) {
        alert("非法时间，请重试!");
        return;
    }
    refreshTable(st, en);
    $("#DateModal").modal('hide');
});

$('#DateModal').on('hidden.bs.modal', function () {
    $("#DateBody").empty();
})

$("#btn_export").click(function () {

    $("#loaddiv").css("display", "");
    $.ajax({
        url: '/NTCQ/exportData',
        type: 'get',
        cache: false,
        success: function (data, stutas, xhr) {
            var res = JSON.parse(data);

            if (res.errCode == "0") {
                alert("导出完成");
                $("#loaddiv").css("display", "none");
                window.location = res.errMsg;
            }
            else
                alert(res.errCode);
        },
        error: function (xhr, textStatus, data) {
            alert("Server Error");
        },
        complete: function (xhr, textStatus) {
            $("#loaddiv").css("display", "none");
        },
    });

});