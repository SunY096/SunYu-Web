import React, { useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

// 定义全局状态原子
const formState = atom({
  key: 'formState',
  default: 'login' // 默认显示登录表单
});

const Login = () => {
  const navigate = useNavigate();
  const [_, setFormType] = useRecoilState(formState);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleLogin = () => {

    const users = JSON.parse(localStorage.getItem('users')||'[]')

    // 查找匹配的用户
    const user = users.find(
      user => user.username === formData.username &&
        user.password === formData.password
    );

    if (user) {
      // 登录成功
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert('登录成功！')
      navigate('/main')
      
    } else {
      alert('用户名或密码错误');
    }
  };

const handleRegisterRedirect = () => {
  setFormType('register');
};

return (
  <div className="login">
    <div className="inner">
      <div className="title">Login</div>
      <div className="title2">欢迎回来</div>
      <div className="input">
        <label htmlFor="username">用户名</label><br />
        <input
          type="text"
          id="username"
          placeholder="请输入用户名"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="input">
        <label htmlFor="password">密码</label><br />
        <input
          type="password"
          id="password"
          placeholder="请输入密码"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="button" className="slogin" onClick={handleLogin}>
        登 录
      </button>
      <button type="button" className="slogin" onClick={handleRegisterRedirect}>
        注 册
      </button>
    </div>
  </div>
);
};

const Register = () => {
  const [_, setFormType] = useRecoilState(formState);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleRegister = () => {
    if (!formData.username.trim()) {
      alert('用户名不能为空');
      return;
    }
    if (formData.password.length < 6) {
      alert('密码至少6位');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert('邮箱格式不正确');
      return;
    }
    // 获取现有用户
    const users = JSON.parse(localStorage.getItem('users') || '[]');
            // 寻找是否有元素满足条件
    if (users.some(user => user.username === formData.username)) {
      alert('用户名已存在');
      return;
    }

    const newuser = {
      username: formData.username,
      password: formData.password,
      email: formData.email
    }
    users.push(newuser)
    localStorage.setItem('users', JSON.stringify(users))
    alert('注册成功！');
    setFormType('login');

  };

  const handleLoginRedirect = () => {
    setFormType('login');
  };

  return (
    <div className="register">
      <div className="inner">
        <div className="title">Register</div>
        <div className="title2">创建新账户</div>
        <div className="input">
          <label htmlFor="username">用户名</label><br />
          <input
            type="text"
            id="username"
            placeholder="请输入用户名"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="password">密码</label><br />
          <input
            type="password"
            id="password"
            placeholder="请输入密码"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="email">邮箱</label><br />
          <input
            type="email"
            id="email"
            placeholder="请输入邮箱"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="slogin" onClick={handleRegister}>
          注 册
        </button>
        <button type="button" className="slogin" onClick={handleLoginRedirect}>
          返回登录
        </button>
      </div>
    </div>
  );
};

function App() {
  const [formType] = useRecoilState(formState);

  return (
    <div>
      {formType === 'login' ? <Login /> : <Register />}
    </div>
  );
}

export default App;