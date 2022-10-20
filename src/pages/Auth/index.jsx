import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import styled from 'styled-components';
import { Button } from 'antd';
import { postAuth } from 'utils';
import { Canstant } from 'commons';
import InputComponent from './InputComponent';

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
  const pageInfoData = Canstant.authInfo[currentPage];
  const currentPageTitle =
    currentPage === 'sign_in'
      ? '로그인'
      : currentPage === 'sign_up'
      ? '회원가입'
      : '페이지가 없음';

  const postAuthData = async (data, currentPage) => {
    try {
      const res = await postAuth(data, currentPage);
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        localStorage.setItem('access_token', res.data['access_token']);
        navigate('/');
      }
    } catch (err) {
      alert(err);
    }
  };

  const onChange = ({ target }) => {
    clearErrors([target.name]);
    setValue(target.name, target.value);
  };

  return (
    <Styled>
      <h1>{currentPageTitle}</h1>
      <form onSubmit={handleSubmit(data => postAuthData(data, currentPage))}>
        {Object.keys(pageInfoData).map(info => {
          return (
            <InputComponent
              key={info}
              name={pageInfoData[info]}
              label={info}
              onChange={onChange}
              register={register}
              warning={errors[info] ? errors[info].message : ''}
            />
          );
        })}
        <Button htmlType="submit" type="primary">
          {currentPageTitle}
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
