import { View } from "react-native";
import { HelperText } from 'react-native-paper';

const HelperRegister = ({ helperType, visible, message }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <HelperText type={helperType} visible={visible} padding='none'>
                {message}
            </HelperText>
        </View>
    );
};

export default HelperRegister;