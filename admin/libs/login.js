
//使用JQ来处理，先设置好入口函数
$(function() {
  // 1.先获取登录按钮，注册点击事件
  $(".input_sub").on("click", function(e) {
    //submit按钮，或默认跳转，所以要阻止默认行为
    e.preventDefault();
    // 2.点击的时候获取用户名和密码 的值，修剪首尾空格
    var userName = $(".input_txt")
      .val()
      .trim();
    var userPwd = $(".input_pass")
      .val()
      .trim();
    // 3.非空判断
    if (userName == "" || userPwd == "") {
      // alert("不能输入空数据");
      //调用模态框
      $("#myModal").modal();
      $(".modal-body").text("不能输入空数据");
      //重新
      return;
    }
    // 4.使用Ajax请求数据，页面渲染
    $.ajax({
      type: "post",
      // url: "http://localhost:8080/api/v1/admin/user/login",
      url:window.BigNew.user_login,
      //请求参数 字段
      data: {
        username: userName,
        password: userPwd
      },
      success: function(res) {
        //调整到前面可减少重复代码
        $("#myModal").modal();
        $(".modal-body").text(res.msg);
        // console.log(res)
        //判断输入的账号密码是否正确
        if (res.code == 200) {
          //令牌
          window.localStorage.setItem('token',res.token)
          // alert("登录成功");
          // $("#myModal").modal();
          // $(".modal-body").text(res.msg);
          //登录成功后 跳转到网站的首页  调用hidden.bs.modal JQ事件
          $("#myModal").on("hidden.bs.modal", function(e) {
            window.location.href = './index.html'
          });
        } 
        // else {
        //   // alert("输入的账号或密码有误");
        //   $("#myModal").modal();
        //   $(".modal-body").text(res.msg);
        // }
      }
    });
  });
});
