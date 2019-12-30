$("#submit_btn").click(function () {

    if ($("#userName").val() == null || $("#userName").val() == "") {
        alert("用户名不能为空");
        return;
    }

    if ($("#pwd").val() == null || $("#pwd").val() == "") {
        alert("密码不能为空");
        return;
    }

    var form = new FormData(document.getElementById("form"));

    $.ajax({
        url: '/NTCQ/doLogin',
        type: 'post',
        data: form,
        processData: false,
        contentType: false,
        success: function (data, stutas, xhr) {
            var res = JSON.parse(data);
            console.log(res);
            if (res.errCode == "0")
            {
                if ($("#pwd").val() == "111111")
                {
                    document.getElementById("InsertPassword").value = "";
                    document.getElementById("InsertDouPassword").value = "";
                    $("#AddModal").modal('show');
                }
                else {
                    window.location = '/NTCQ/Admin';
                }
            }
            else
            {
                document.getElementById("pwd").value = "";
                alert(res.errMsg);
            }
        },
        error: function (xhr, textStatus, data) {
            alert(xhr.responseJSON);
        },
        complete: function (xhr, textStatus) {
        },
    });

});

$("#doSubmitAdd").click(function () {

    if ($("#InsertPassword").val() == null || $("#InsertPassword").val() == "") {
        alert("密码不能为空");
        return;
    }
    if ($("#InsertDouPassword").val() == null || $("#InsertDouPassword").val() == "") {
        alert("请重复输入密码");
        return;
    }
    if ($("#InsertPassword").val() != $("#InsertDouPassword").val()) {
        alert("两次密码不一致!");
        return;
    }
    if ($("#InsertPassword").val() =="111111") {
        alert("不能仍为默认密码");
        return;
    }

    if (!confirm('确定修改此密码？')) {
        return;
    }

    var Password = $("#InsertPassword").val();
    var username = $("#userName").val()
    $.ajax({
        url: '/NTCQ/changePass?UserName=' + username + '&Password=' + Password,
        type: 'post',
        cache: false,
        success: function (data, stutas, xhr) {
            var res = JSON.parse(data);
            if (res.errCode == "0") {
                window.location = '/NTCQ/Admin'
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
    document.getElementById("InsertPassword").value = "";
    document.getElementById("InsertDouPassword").value = "";
    $("#AddBody").empty();
})