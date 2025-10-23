import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { WebView } from 'react-native-webview';

const welcomeloader = `
 <html>
      <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=0.5"/>
        <style>
      
          .cssload-container * {
            box-sizing: border-box;
          }

          .cssload-container {
            margin: 0 auto;
            max-width: 200px;
            position: relative;
            height: 240px;
          }

          .cssload-loading-center {
            display: inline-block;
            position: absolute;
            background: #ff0000;
            height: 80px;
            width: 80px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            border-radius: 6px;
            animation: pulse 1.3s ease infinite;
          }

          .cssload-loading {
            display: inline-block;
            position: relative;
            width: 200px;
            height: 355px;
            margin-top: 6px;
            transform: rotate(45deg);
          }

          .cssload-loading:after, .cssload-loading:before {
            position: absolute;
            content: '';
            height: 30px;
            width: 30px;
            display: block;
            top: 0;
            background: #ff5252;
            border-radius: 6px;
          }

          .cssload-loading:after {
            right: 0;
            animation: square-tr 2.6s ease infinite;
          }

          .cssload-loading:before {
            animation: square-tl 2.6s ease infinite;
          }

          @keyframes square-tl {
            0% { transform: translate(0,0); }
            25% { transform: translate(0,170px); }
            50% { transform: translate(170px,170px); }
            75% { transform: translate(170px,0); }
          }

          @keyframes square-tr {
            0% { transform: translate(0,0); }
            25% { transform: translate(-170px,0); }
            50% { transform: translate(-170px,170px); }
            75% { transform: translate(0,170px); }
          }

          @keyframes pulse {
            0%,100% { transform: scale(inherit) rotate(45deg); }
            75% { transform: scale(0.25) rotate(45deg); }
          }
       
        </style>
      </head>
      <body>
        <div class="cssload-container">
          <div class="cssload-loading-center"></div>
          <div class="cssload-loading"></div>
        </div>
      </body>
    </html>
`;

export default function NagaraRaftLoader() {
  return (
    <ImageBackground
      source={require('../../assets/images/nagaraloader.png')}
      style={styles.container}
    >
      <View style={styles.loaderWrapper}>
        <WebView
          originWhitelist={['*']}
          source={{ html: welcomeloader }}
          style={styles.webview}
          scrollEnabled={false}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderWrapper: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
  },
  webview: {
    backgroundColor: 'transparent',
    width: 300,
    height: 200,
  },
});
