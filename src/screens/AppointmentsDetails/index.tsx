import React from "react";
import { View, ImageBackground, Text, FlatList } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { ListHeader } from "../../components/ListHeader";
import { ButtonIcon } from "../../components/ButtonIcon";
import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { Member } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import bannerImg from '../../assets/banner.png';

export function AppointmentDetails() {
    const members = [
     {
         id: '1',
         username: 'Silas',
         avatar_url: 'https://github.com/silasbispo01.png',
         status: 'online'
     },
     {
        id: '2',
        username: 'Thiago J',
        avatar_url: 'https://github.com/ThiagoDeJesus.png',
        status: 'offline'
    },   
    {
        id: '3',
        username: 'Rodrigo',
        avatar_url: 'https://github.com/rodrigorgtic.png',
        status: 'online'
    },     
    ]
    return (
        <Background>
            <Header
             title='Detalhes'
             action={
                 <BorderlessButton>
                    <Fontisto name='share' size={24} color={theme.colors.primary}/>
                 </BorderlessButton>
             }
            />
        <ImageBackground 
        source={bannerImg}
        style={styles.banner}>
            <View style={styles.bannerContent}>
                <Text style={styles.title}>
                    Lendários
                </Text>
                <Text style={styles.subtitle}>
                    É hoje que vamos chegar ao challenger sem perder uma partida da md10
                </Text>
            </View>
        </ImageBackground>
            <ListHeader title='Jogadores' subtitle='Total 3'/>
            <FlatList
                data={members}
                keyExtractor={item => item.id}
                renderItem={({item}) => 
                    <Member data={item}/>     
            }
                ItemSeparatorComponent={() => <ListDivider/>}
                style={styles.members}
            />
            <View style={styles.footer}>
                <ButtonIcon title='Entrar na Partida'/>
            </View>
        </Background>


    )
}