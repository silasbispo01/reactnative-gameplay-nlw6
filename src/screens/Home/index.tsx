import React, { useState, useCallback } from "react";
import { View, FlatList, Text, ImageBackground} from 'react-native';
import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { CategorySelect } from "../../components/CategorySelect";
import { Background } from "../../components/Background";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { styles } from '../Home/styles'
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Load } from "../../components/Load";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";

export function Home() {
    const [category, setCategory] = useState('')
    const [appointments, setAppointments] = useState<AppointmentProps[]>([])
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation();

    function handleCategorySelect (categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }

    function handleAppointmentDetails (guildSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails', { guildSelected });
    }
    function handleAppointmentCreate () {
        navigation.navigate('AppointmentCreate');
    }
    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if(category) {
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage)
        }

        setLoading(false);
    }

    useFocusEffect(useCallback(()=> {
        loadAppointments();
    }, [category]))
    return (
        <Background>
            <View style={styles.header}>
                <Profile/>
                <ButtonAdd onPress={handleAppointmentCreate}/>
            </View>
            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
                hasCheckBox={false}
            />
            {
                loading? <Load/> :
            <>
                <ListHeader
                    title='Partidas agendadas'
                    subtitle={`Total ${appointments.length}`}
                />
                <FlatList
                    data={appointments}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => ( <Appointment onPress={() => handleAppointmentDetails(item)} data={item}/>)}
                    style={styles.matches}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 27}}
                    ItemSeparatorComponent={()=> <ListDivider/>}
                />
            </>
            }
        </Background>
    );
}