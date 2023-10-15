import { View } from "react-native";
import { HelperText } from 'react-native-paper';

const HelperRegister = ({ helperType = 'error', visible = false, message = '', justifyContent = 'start' }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: justifyContent }}>
            <HelperText type={helperType} padding='none' style={{display: visible ? 'flex' : 'none'}}>
                {message}
            </HelperText>
        </View>
    );
};

export default HelperRegister;