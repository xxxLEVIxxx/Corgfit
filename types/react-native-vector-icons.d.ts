declare module 'react-native-vector-icons/FontAwesome' {
    import { Component } from 'react';
    
    interface IconProps {
        name: string;
        size?: number;
        color?: string;
        style?: any;
    }

    export default class Icon extends Component<IconProps> {}
} 