import styled from 'styled-components';
import { Input } from 'antd';

const InputComponent = ({ name, label, onChange, register, warning }) => {
  return (
    <Styled>
      <label>{label}</label>
      {name !== 'password' ? (
        <Input {...register(name)} name={name} onChange={onChange} />
      ) : (
        <Input.Password {...register(name)} name={name} onChange={onChange} />
      )}
      <p>{warning}</p>
    </Styled>
  );
};

const Styled = styled.div``;

export default InputComponent;
