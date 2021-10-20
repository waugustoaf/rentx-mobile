import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Car } from '../../database/models/Car';

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

export const CarList = styled(FlatList as new () => FlatList<Car>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;
