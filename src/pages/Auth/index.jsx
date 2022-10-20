import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import styled from 'styled-components';
import { postAuth } from 'utils';
import InputComponent from './InputComponent';
import { Button } from 'antd';

const scheme = Yup.object().shape({
  email: Yup.string()
    .email('이메일 형식이 맞지 않습니다.')
    .required('이메일 주소를 입력해 주세요.'),

  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&^+=_])[A-Za-z\d$@$!%*#?&^+=_]{8,12}$/,
      '비밀번호는 영문, 숫자, 특수문자를 혼합한 8~12자 이내로 입력해 주세요.',
    )
    .required('비밀번호를 입력해 주세요.'),
});

const Auth = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheme),
  });

  const params = useParams();
  const navigate = useNavigate();
  const currentPage = params.sign;

  const postAuthData = async (data, currentPage) => {
    try {
      const res = await postAuth.postAuth(data, currentPage);
      if (res.status === 200 || res.status === 204) {
        localStorage.setItem('access_token', res.data['access_token']);
        navigate('/');
      }
    } catch (err) {
      alert(err);
    }
  };

  const onChange = e => {
    clearErrors([e.target.name]);
    setValue(e.target.name, e.target.value);
  };

  return (
    <Styled>
      {currentPage === 'sign_in' ? (
        <h1>로그인</h1>
      ) : currentPage === 'sign_up' ? (
        <h1>회원가입</h1>
      ) : (
        '모르느 페이지'
      )}
      <form onSubmit={handleSubmit(data => postAuthData(data, currentPage))}>
        //* Canstant 파엘에 sign_in, sign_up에 따른 상수 데이터 추가
        <InputComponent
          name="email"
          label="이메일"
          onChange={onChange}
          register={register}
          warning={errors.email ? errors.email.message : ''}
        />
        <InputComponent
          name="password"
          label="비밀번호"
          onChange={onChange}
          register={register}
          warning={errors.password ? errors.password.message : ''}
        />
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </form>
    </Styled>
  );
};

const Styled = styled.main`
  width: 100%;
  height: 100vh;
`;

export default Auth;
