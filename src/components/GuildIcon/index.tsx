import React from "react";
import { Image } from 'react-native'
import { styles } from "./styles";

export function GuildIcon() {
    const uri = 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/147573378/original/4e1e7dbfb6bcf24d2c7d0ad51eef1f2ea366d6a2/design-and-help-with-discord-server.png'
    return( 
            <Image source={{ uri }} style={styles.image} resizeMode='cover'/>
    );
}