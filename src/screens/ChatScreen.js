import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import useChatSocket from '../hooks/useChatSocket';

export default function ChatScreen({ route }) {
  // Recibimos los parámetros de la navegación
  const { givenName, userId, otherUserId } = route.params;

  // Llamamos al hook pasando ambos userId para gestionar la conexión de socket
  const { messages, sendMessage } = useChatSocket(userId, otherUserId);

  const [text, setText] = useState('');
  const flatListRef = useRef(null);

  // Función para hacer scroll cuando se reciben nuevos mensajes
  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Título con el nombre del otro usuario */}
      <Text style={styles.header}>{`Chat con ${givenName}`}</Text>
      
      {/* Lista de mensajes */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.user}</Text>
            <Text>{item.msg}</Text>
          </View>
        )}
      />

      {/* Barra de input para escribir mensajes */}
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, padding: 8, borderRadius: 4 }}
          value={text}
          onChangeText={setText}
          placeholder="Escribe tu mensaje"
        />
        <Button
          title="Enviar"
          onPress={() => {
            if (text.trim()) {
              sendMessage(text.trim());
              setText('');
            }
          }}
        />
      </View>
    </View>
  );
}

// Estilos para la pantalla
const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
