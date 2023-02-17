import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
	appId: "calculator.mobile.uk",
	appName: "Merit Calculator",
	bundledWebRuntime: false,
	webDir: 'www',
	loggingBehavior: 'none',
	cordova: {},
	plugins: {
		SplashScreen: {
			androidScaleType: "CENTER_CROP",
			splashFullScreen: false,
			splashImmersive: false,
			launchShowDuration: 2000,
			launchAutoHide: true,
			backgroundColor: "#ffffffff"
		},
		Keyboard: {
			resize: KeyboardResize.Body
		}
	},
	android: {
		webContentsDebuggingEnabled: true
	},
	server: {
		"url": "http://192.168.1.98:8100",
		"cleartext": true
	},
};

export default config;