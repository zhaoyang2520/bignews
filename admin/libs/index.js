
//用户登录成功之后，用Ajiax请求用户数据信息，将用户信息填充到对应页面
//1.jq的方法
$(function(){
    $.ajax({
        type:'get',
        // url:'http://localhost:8080/api/v1/admin/user/info',
        url:window.BigNew.user_info,
        //每次请求数据都要带上令牌，所以封装到JQ中
        // headers:{Authorization:window.localStorage.getItem('token')},
        success:function(res){
            console.log(res)
            //获取用户信息，渲染
            $('.user_info>img').attr('src',res.data.userPic)
            $('.user_info>span').html('欢迎&nbsp;&nbsp;'+res.data.nickname)
            $('.user_center_link>img').attr('src',res.data.userPic)
        }
    })

    //退出的实现逻辑
    // 点击退出按钮的时候，让页面回到登录页面，而且删掉令牌
    // 1.1 获取这个按钮之策点击事件
    $('.logout').on('click',function(){
        // 1.2点击按钮删除令牌token
        window.localStorage.removeItem('token')
         // 1.3跳转回登录页面
        window.location.href = './login.html'
    })    
     //给level01 导航栏这几个div注册点击事件
     $('div.level01').on('click',function() {
         //排他
        $(this).addClass('active').siblings('div').removeClass('active');

        if($(this).index() == 1) {
            //让当前的ul如果是折叠就展开，如果是展开的就折叠
            $('ul.level02').toggle();
            //[0]转成原生DOM对象
            //jQuery对象不能这样去触发a标签的默认的跳转事件，只有a标签的原生DOM对象才会在点击的时候触发a标签的默认的跳转行为
            $('ul.level02 li:eq(0)>a')[0].click();
            //小角标b
            $(this).find('b').toggleClass('rotate0');
        }
    });

    //点击li标签的时候，给当前点击的li标签添加一个样式类
    $('ul.level02 li').on('click',function () {
        $(this).addClass('active').siblings('li').removeClass('active');
    })  
    
    

})

// //2.原生的方法
//     var xhr = new XMLHttpRequest()
//     xhr.open('get','http://localhost:8080/api/v1/admin/user/info')
//     xhr.setRequestHeader('Authorization',window.localStorage.getItem('token'))
//     xhr,onreadystatechange = function(){
//         if(xhr.status == 200 && xhr.readyState == 4){
//             var res = JSON.parse(xhr.responseText)
//         }
//         console.log(res)
//     }
//     xhr.send()
