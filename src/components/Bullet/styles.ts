import styled from 'styled-components/native';

interface ContainerProps {
  active?: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 6px;
  height: 6px;

  background-color: ${props =>
    props.active ? props.theme.colors.title : props.theme.colors.shape};

  margin-left: 8px;
  border-radius: 3px;
`;
