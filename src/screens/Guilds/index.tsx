import React, { useEffect} from "react";
import { View, FlatList } from "react-native";
import { Guild, GuildProps } from "../../components/Guild";
import { styles } from "./styles";
import { ListDivider } from "../../components/ListDivider";
import { Load } from "../../components/Load";
import { useState } from "react";
import { api } from "../../services/api";

type Props = {
    handleGuildSelect: (guild: GuildProps) => void
}
export function Guilds({ handleGuildSelect }: Props) {
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true);
    
    async function fetchGuilds() {
        const response = await api.get('./users/@me/guilds');

        setGuilds(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchGuilds();
    }, [])
    return (
        <View style={styles.container}>
            {
            loading ? <Load/> :
            <FlatList
             data={guilds} 
             keyExtractor={item => item.id} 
             renderItem={({item})=> (  <Guild data={item} onPress={()=> handleGuildSelect(item)}/> )}
             showsVerticalScrollIndicator={false}
             style={styles.guilds}
             contentContainerStyle={{paddingBottom: 27, paddingTop: 90}}
             ListHeaderComponent={()=> <ListDivider isCentered />}
             ItemSeparatorComponent={()=> <ListDivider isCentered/>}/>
            }
        </View>
    )
}