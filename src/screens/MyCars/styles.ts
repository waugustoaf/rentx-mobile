import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { IScheduleByUserDTO } from '../../dtos/IScheduleByUserDTO';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${props => props.theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(325)}px;
  background-color: ${props => props.theme.colors.header};
  justify-content: center;
  padding: 25px;
  padding-top: ${getBottomSpace() + 30}px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.shape};
  font-family: ${props => props.theme.fonts.secondary_600};
  font-size: ${RFValue(34)}px;
  margin-top: 24px;
`;

export const RentalPeriod = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 32px;
`;

export const SubTitle = styled.Text`
  color: ${props => props.theme.colors.shape};
  font-family: ${props => props.theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;
  margin-top: 24px;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 16px;
`;

export const Appointments = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text`
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
`;

export const AppointmentsQuantity = styled.Text`
  color: ${props => props.theme.colors.title};
  font-family: ${props => props.theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;

export const CarsList = styled(
  FlatList as new () => FlatList<IScheduleByUserDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const CarWrapper = styled.View`
  margin-bottom: 16px;
`;

export const CarFooter = styled.View`
  width: 100%;
  padding: 12px;
  margin-top: -10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${props => props.theme.colors.background_secondary};
`;

export const CarFooterTitle = styled.Text`
  color: ${props => props.theme.colors.text_detail};
  font-family: ${props => props.theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CarFooterDate = styled.Text`
  color: ${props => props.theme.colors.title};
  font-family: ${props => props.theme.fonts.primary_400};
  font-size: ${RFValue(13)}px;
`;

export const EmptyItemsView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyItemsText = styled.Text`
  color: ${props => props.theme.colors.title};
  font-family: ${props => props.theme.fonts.secondary_500};
  font-size: ${RFValue(15)}px;
  text-align: center;
`;
