import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Sound from 'react-native-sound';

export const ContadorScreen = () => {
  const [contador, setContador] = useState(10);
  const coin1Ref = useRef();
  const coin2Ref = useRef();

  useEffect(() => {
    // Cargar la música de fondo al montar el componente
    const backgroundMusic = new Sound(
      require('C:/Users/Alfred/Desktop/RN-HolaMundo-Contador-0.5.0/assets/soundEffects/greenHillZone.mp3'),
      (error) => {
        if (error) {
          console.log('Error al cargar la música de fondo:', error);
        } else {
          backgroundMusic.setNumberOfLoops(-1); // Reproducir en bucle
          backgroundMusic.play();
        }
      }
    );

    // Retornar una función de limpieza al desmontar el componente
    return () => {
      backgroundMusic.stop();
      backgroundMusic.release();
    };
  }, []);

  const handlePress = (operation) => {
    if (operation === 'increment') {
      setContador(contador + 1);
    } else if (operation === 'decrement') {
      setContador(contador - 10);
    }
  };

  const handleButtonPressIn = (operation, ref) => {
    handlePress(operation);
    ref.current.bounce(800); // Animación de rebote
    if (operation === 'decrement') {
      const decrementSound = new Sound(
        require('C:/Users/Alfred/Desktop/RN-HolaMundo-Contador-0.5.0/assets/soundEffects/SonicDropRings.mp3'),
        (error) => {
          if (error) {
            console.log('Error al cargar el sonido de decremento:', error);
          } else {
            decrementSound.play();
          }
        }
      );
    } else if (operation === 'increment') {
      const incrementSound = new Sound(
        require('C:/Users/Alfred/Desktop/RN-HolaMundo-Contador-0.5.0/assets/soundEffects/sonicRing-soundEffect.mp3'),
        (error) => {
          if (error) {
            console.log('Error al cargar el sonido de incremento:', error);
          } else {
            incrementSound.play();
          }
        }
      );
    }
  };

  const renderRedTriangles = () => {
    const numTriangles = 20;
    const triangleSize = 60; // Cambia este valor para hacer los triángulos más grandes
    const spacing = 60; // Cambia este valor para reducir el espaciado entre los triángulos

    const triangles = [];

    for (let i = 0; i < numTriangles; i++) {
      triangles.push(
        <Animatable.Image
          key={i}
          source={require('C:/Users/Alfred/Desktop/RN-HolaMundo-Contador-0.5.0/assets/images/RedTriangle.png')}
          style={[
            styles.triangle,
            {
              width: triangleSize,
              height: triangleSize,
              top: -1, // Ajuste para posicionar los triángulos hacia arriba
              left: i * (triangleSize - spacing), // Espaciado ajustado
              transform: [{ rotate: '180deg' }], // Rota el triángulo en 180 grados
            },
          ]}
        />
      );
    }

    return triangles;
  };

  const renderYellowTriangles = () => {
    const numTriangles = 20;
    const triangleSize = 60; // Cambia este valor para hacer los triángulos más grandes
    const spacing = 60; // Cambia este valor para reducir el espaciado entre los triángulos

    const triangles = [];

    for (let i = 0; i < numTriangles; i++) {
      triangles.push(
        <Animatable.Image
          key={i}
          source={require('C:/Users/Alfred/Desktop/RN-HolaMundo-Contador-0.5.0/assets/images/YellowTriangle.png')}
          style={[
            styles.triangle,
            {
              width: triangleSize,
              height: triangleSize,
              top: 10, // Ajuste para posicionar los triángulos hacia abajo
              left: i * (triangleSize - spacing), // Espaciado ajustado
              transform: [{ rotate: '90deg' }], // Rota el triángulo 90 grados a la derecha
            },
          ]}
        />
      );
    }

    return triangles;
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('C:/Users/Alfred/Desktop/RN-HolaMundo-Contador-0.5.0/assets/images/alfred-Rosario-20210798-8-3-2023.png')}
        style={styles.headerImage}
      />
      <View style={styles.redTrianglesContainer}>{renderRedTriangles()}</View>
      <View style={styles.yellowTrianglesContainer}>{renderYellowTriangles()}</View>
      <Image
        source={require('C:/Users/Alfred/Desktop/RN-HolaMundo-Contador-0.5.0/assets/images/sonic.webp')}
        style={styles.sonicImage}
      />
      <TouchableWithoutFeedback onPressIn={() => handleButtonPressIn('increment', coin1Ref)}>
        <Animatable.Image
          ref={coin1Ref}
          source={require('C:/Users/Alfred/Desktop/RN-HolaMundo-Contador-0.5.0/assets/images/sonic-ring.webp')}
          style={styles.gifOne}
        />
      </TouchableWithoutFeedback>
      <Text style={styles.title}>Rings: {contador}</Text>
      <TouchableWithoutFeedback onPressIn={() => handleButtonPressIn('decrement', coin2Ref)}>
        <Animatable.Image
          ref={coin2Ref}
          source={require('C:/Users/Alfred/Desktop/RN-HolaMundo-Contador-0.5.0/assets/images/sonic-ring.webp')}
          style={styles.gifTwo}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    top: -350,
    textAlign: 'center',
    color: '#FFFF00', // Cambiar el color del texto a amarillo
  },
  gifOne: {
    position: 'absolute',
    top: '33%',
    left: '75%',
    width: 40,
    height: 40,
  },
  gifTwo: {
    position: 'absolute',
    top: '33%',
    left: '15%',
    width: 40,
    height: 40,
  },
  redTrianglesContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  yellowTrianglesContainer: {
    flexDirection: 'column', // Cambiar a columna
    position: 'absolute',
    left: 0,
  },
  triangle: {
    width: 0,
    height: 0,
    position: 'relative',
    marginBottom: -5,
  },
 headerImage: {
     width: '100%',
     height: 20,
     position: 'absolute',
     top: 170, // Posición en la parte superior
     left: 15,
   },
  sonicImage: {
    width: 250,
    height: 140,
    marginTop: 300,
  },
});

