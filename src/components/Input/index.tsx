import React, { useState, useCallback } from 'react';
import { Container, EyeButton, IconContainer, InputText } from './styles';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  password?: boolean;
  isFilled?: boolean;
}

export const Input = ({
  iconName,
  password,
  isFilled = false,
  autoCorrect,
  ...rest
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prevState => !prevState);
  }, []);

  const toggleFocused = useCallback(() => {
    setIsFocused(prevState => !prevState);
  }, []);

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={isFilled ? theme.colors.main : theme.colors.text}
        />
      </IconContainer>

      <InputText
        {...rest}
        onFocus={toggleFocused}
        onBlur={toggleFocused}
        secureTextEntry={password && !isPasswordVisible}
        autoCorrect={autoCorrect || password}
      />

      {password && (
        <EyeButton onPress={togglePasswordVisibility}>
          <Feather
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color={theme.colors.text}
          />
        </EyeButton>
      )}
    </Container>
  );
};
