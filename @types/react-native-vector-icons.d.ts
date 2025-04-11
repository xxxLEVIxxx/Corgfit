declare module 'react-native-vector-icons/MaterialIcons' {
  import { Component } from 'react';
  import { ImageURISource } from 'react-native';

  interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }

  class Icon extends Component<IconProps> {
    static getImageSource(
      name: string,
      size?: number,
      color?: string,
    ): Promise<ImageURISource>;
  }

  export = Icon;
} 