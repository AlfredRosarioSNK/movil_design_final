import { AppRegistry } from 'react-native';
import App from './App'; // Asegúrate de importar el componente App con la ruta correcta
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
