$(() => {
  // 点击去注册连接
  $('#link_reg').on('click', () => {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  $('#link_login').on('click', () => {
    $('.reg-box').hide();
    $('.login-box').show();
  });
  // layUi补充
  //从layUi中获取到form对象
  var form = layui.form;
  //通过form.verify()函数定义自定义校验规则
  form.verify({
    //自定义一个叫做pwd的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须是6到十二位且不能出现空格"],
    rePwd: value =>
      //通过形参拿到的是确认密码框中的内容
      //还需要拿到密码框中的内容
      //然后判断他们是否相等
      //如果判断失败
      //则return一个错误信息
      $('#passwordOne').val() !== value && "两次密码不一致"
  });

  //监听注册表单的提交事件
  $('#form_reg').on('submit', e => {
    // 1. 阻止默认的提交行为
    e.preventDefault();
    var loginData = {
      username: $('#form_reg [name=userName]').val(),
      password: $('#form_reg [name=password]').val()
    };
    // 2. 发起Ajax的POST请求
    $.post('/api/reguser', loginData, res => {
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      layui.layer.msg('注册成功')
      $('#link_login').click();
    })

  });
  // 监听登录表单的提交事件
  $('#form_login').on('submit', function (e) {
    // 阻止默认提交行为
    e.preventDefault()
    console.log(this)
    console.log($(this).serialize());
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: res => {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token);
        // 跳转到后台主页
        location.href = '/index.html';
      }
    });
  });
});

