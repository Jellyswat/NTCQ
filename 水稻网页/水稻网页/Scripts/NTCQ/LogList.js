        $('#table').bootstrapTable({
            url: '/NTCQ/getLog',
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
                field: 'UserName',
                title: '用户名'
            }, {
                field: 'Affair',
                title: '事件'
            }, {
                field: 'Time',
                title: '时间',
            }],

        });

        function refreshTable() {
            $('#table').bootstrapTable('refresh', {
                url: '/NTCQ/getLog',
                silent: true,
            });
        }

        