import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { useState } from 'react'
import axios from 'axios'

//Icono
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import DateTimePicker from '@react-native-community/datetimepicker'
import { set } from 'react-hook-form'

//Form
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Esquema de validación con Yup
const validationSchema = yup.object().shape({
  nombre: yup
    .string()
    .required('El nomnbre es obligatorio'),
  apellido: yup
    .string()
    .required('El apellido es obligatorio'),
  email: yup
    .string()
    .email('Debe ser un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),
  password: yup
    .string()
    .required('La contraseña es obligatoria'),
  direccion: yup
    .string()
    .required('La direccion es obligatoria'),
  ciudad: yup
    .string()
    .required('La ciudad es obligatoria'),
  celular: yup.string()
    .matches(
      /^[0-9]{10}$/, 
      'El número de teléfono debe tener 10 dígitos'
    )
    .required('El número de teléfono es obligatorio')
});


const Register = () => {

  const navigation = useNavigation()

  const [nombre,setNombre] = useState('');
  const [apellido,setApellido] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [direccion,setDireccion] = useState('');
  const [ciudad,setCiudad] = useState('');
  const [phone,setPhone] = useState('');

  // Usando react-hook-form para manejar el formulario
  const { control, handleSubmit, formState: { errors },getValues } = useForm({
    resolver: yupResolver(validationSchema),
  });
  

  const onSubmit = async () => {
    try {
      const formData = getValues();  // Obtener valores directamente de useForm
      
      console.log("Datos enviados:", JSON.stringify(formData, null, 2));
  
      const response = await axios.post('http://dog0s0gwksgs8osw04csg0cs.31.170.165.191.sslip.io/register', {
        name: formData.nombre,
        lastname: formData.apellido,
        email: formData.email,
        pass: formData.password,
        address: formData.direccion,
        city: formData.ciudad,
        phone: formData.celular,
      });
  
      if (response.status === 201) {
        alert('Registro exitoso');
        navigation.navigate('Login');
      } else {
        alert('Error en el registro: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.response?.data || error.message);
      alert('Hubo un problema con el registro.');
    }
  };
  
  
  

  //Fecha y Picker useState
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState()
  
  //Metodo para mostrar el Date
  const toggleDatePicker =()=>{
    setShowPicker(!showPicker);
  }

  const onChange = ({type}, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      toggleDatePicker()
    }
  }

  //Fuentes Personalizadas
      const [fontsLoaded] = useFonts({
          MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
          MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
          MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
      });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
    <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/LogoEncontrarte.png')} resizeMode='contain'/>
      
      <View style={styles.form}>
        <Text style={styles.titulo}>Registrate</Text>

          <Controller
            name="nombre"
            control={control}
            defaultValue={nombre} 
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Nombre(s)"
                value={value}
                onChangeText={(text) => {
                  onChange(text);  
                  setNombre(text); 
                }}
              />
            )}
          />


        <Controller
          name='apellido'
          control={control} 
          defaultValue={apellido}
          render={({ field: {onChange,value} }) => (
                    <TextInput 
                    style={styles.input} 
                    placeholder='Apellido(s)' 
                    value={value} 
                    onChangeText={(text)=>{
                      onChange(text);
                      setApellido(text)
                    }}
                  />
          )}
        />


          <Controller
            name='email'
            control={control} 
            render={({ field: { onChange, value } }) => (
              <TextInput 
                style={styles.input} 
                placeholder='Correo Electrónico' 
                keyboardType='email-address' 
                value={value} 
                onChangeText={(text)=>{
                  onChange(text);
                  setEmail(text)
                }} 
              />
            )}
          />


        <Controller 
          name='password'
          control={control} 
          render={({ field:{onChange,value} }) => (
                    <TextInput 
                    style={styles.input} 
                    placeholder='Contraseña' 
                    value={value} 
                    onChangeText={(text)=>{
                      onChange(text);
                      setPassword(text);
                    }}/>
          )}
        />

        <Controller 
          name='direccion'
          control={control} 
          render={({ field:{onChange,value} }) => (
                    <TextInput 
                    style={styles.input} 
                    placeholder='Direccion' 
                    value={value} 
                    maxLength={35}
                    onChangeText={(text)=>{
                      onChange(text);
                      setDireccion(text);
                    }}/>
          )}
        />

        <Controller
          name='ciudad'
          control={control} 
          render={({ field:{onChange,value} }) => (
                    <TextInput 
                    style={styles.input} 
                    placeholder='Ciudad'
                    value={value} 
                    maxLength={35} 
                    onChangeText={(text)=>{
                      onChange(text);
                      setCiudad(text);
                    }}/>
          )}
        />

        <Controller 
          name='celular'
          control={control} 
          render={({ field:{onChange,value} }) => (
                    <TextInput 
                    style={styles.input} 
                    placeholder='Celular' 
                    value={value} 
                    onChangeText={(text)=>{
                      onChange(text);
                      setPhone(text);
                    }} 
                    keyboardType='phone-pad'/>
          )}
        />
          
{/* 
        <Pressable style={styles.input} title='Fecha De Nacimiento' onPress={toggleDatePicker}/>
        
        {showPicker && (<DateTimePicker
        mode='date'
        display='spinner'
        value={date}
        onChange={onChange}/>)} */}

        
        
        

        
        <TouchableOpacity style={styles.boton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.textoBtn}>
            Registrar
          </Text>
        </TouchableOpacity>

        <View style={styles.containerTexto}>
          <Text style={styles.texto}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registrate}>Inicia Sesion</Text>
          </TouchableOpacity>
        </View>
      </View>

      {errors.email && <View style={styles.msgContainer}>
        <MaterialIcons name="cancel" size={24} color="red" />
        <Text style={styles.msgText}>{errors.email.message}</Text>
        </View>}
      
      {errors.password && <View style={styles.msgContainer}>
        <MaterialIcons name="cancel" size={24} color="red" />
        <Text style={styles.msgText}>{errors.password.message}</Text>
        </View>}
      
      {errors.ciudad && <View style={styles.msgContainer}>
        <MaterialIcons name="cancel" size={24} color="red" />
        <Text style={styles.msgText}>{errors.ciudad.message}</Text>
        </View>}
      
      {errors.direccion && <View style={styles.msgContainer}>
        <MaterialIcons name="cancel" size={24} color="red" />
        <Text style={styles.msgText}>{errors.direccion.message}</Text>
        </View>}
      
      
      {errors.celular && <View style={styles.msgContainer}>
        <MaterialIcons name="cancel" size={24} color="red" />
        <Text style={styles.msgText}>{errors.celular.message}</Text>
        </View>}

      <View style={styles.marginBottom}></View>

    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
  scroll:{
    backgroundColor: '#E3298F',
  },
  container:{
    height: "100%",
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200
  },
  image:{
    width:'70%',
    height: 100,
    marginBottom: 30
  },
  form:{
    width:'80%',
    height: 'auto',
    backgroundColor: '#FFFFF3',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 30,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0},
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  titulo:{
    fontFamily: 'MadeTommyBold',
    color: '#1A1A1A',
    fontSize: 35,
    marginBottom: 30
  },
  input:{
    backgroundColor: '#FFF9F9',
    width: '70%',
    height: 40,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius:10,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0},
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  boton:{
    marginTop: 10,
    width: '35%',
    height: 35,
    backgroundColor: '#44634E',
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoBtn:{
    fontFamily: 'MalgunGothic',
    fontSize: 15,
    color: '#FFFFF3'
  },
  containerTexto:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20
  },
  texto:{
    fontFamily: 'MalgunGothic',
    fontSize: 15,
    color: '#1A1A1A'
  },
  registrate:{
    fontFamily: 'MalgunGothic',
    fontSize: 15,
    textDecorationLine: 'underline',
    color: '#44634E'
  },
  marginBottom:{
    marginBottom: 30
  },
  msgContainer:{
    flexDirection: 'row',
    width: 'auto',
    height: 40,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFF9F9'
  },
  msgText:{
    color: 'black',
    fontFamily: 'MalgunGothic',
    fontSize: 14,
    marginLeft: 10
  }
})