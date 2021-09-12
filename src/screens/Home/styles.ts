import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { ICarDTO } from '../../dtos/ICarDTO';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background-color: ${props => props.theme.colors.shape_dark};
  justify-content: flex-end;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 32px 24px;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${props => props.theme.fonts.primary_400};
  color: ${props => props.theme.colors.text};
`;

export const CarList = styled(FlatList as new () => FlatList<ICarDTO>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;

export const MyCarsButton = styled(RectButton)`
  position: absolute;

  width: 60px;
  height: 60px;
  border-radius: 30px;

  justify-content: center;
  align-items: center;

  background-color: ${props => props.theme.colors.main};

  bottom: 13px;
  right: 22px;
`;
