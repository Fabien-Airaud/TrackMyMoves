import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const Input = ({ label, placeholder, secureTextEntry, onChangeText, inputMode, right }) => {
    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        input: {
            backgroundColor: colors.inputFill,
            marginVertical: '2%'
        }
    });

    return (
        <TextInput label={label}
            placeholder={placeholder}
            secureTextEntry={false || secureTextEntry}
            onChangeText={onChangeText}
            inputMode={inputMode}
            right={right}
            textColor={colors.text}
            theme={{ colors: { primary: colors.primary, onSurfaceVariant: colors.placeholder } }}
            style={styles.input}
        />
    );
};

export default Input;