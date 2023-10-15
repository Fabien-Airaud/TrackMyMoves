import { useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import HelperRegister from './HelperRegister';

const Input = ({ label, placeholder, secureTextEntry, onChangeText, inputMode, right, helperType, visible, message }) => {
    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        input: {
            backgroundColor: colors.inputFill,
            marginVertical: '2%'
        }
    });

    return (
        <View>
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
            <HelperRegister helperType={helperType} visible={visible} message={message} />
        </View>
    );
};

export default Input;