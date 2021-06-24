import React from "react";
import { View, FlatList } from "react-native";
import { Background } from "../../components/Background";
import { Guild } from "../../components/Guild";
import { styles } from "./styles";
import { ListDivider } from "../../components/ListDivider";
import { GuildProps } from "../../components/Guild";

type Props = {
    handleGuildSelect: (guild: GuildProps) => void
}
export function Guilds({ handleGuildSelect }: Props) {
    const guilds = [
        {
            id: '1',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id: '2',
            name: 'Épicos',
            icon: 'img2',
            owner: true
        }
    ]
    return (
        <View style={styles.container}>
            <FlatList
             data={guilds} 
             keyExtractor={item => item.id} 
             renderItem={({item})=> (  <Guild data={item} onPress={()=> handleGuildSelect(item)}/> )}
             showsVerticalScrollIndicator={false}
             style={styles.guilds}
             ItemSeparatorComponent={()=> <ListDivider/>}/>
        </View>
    )
}