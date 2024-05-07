import {View, Text, Image, StyleSheet} from 'react-native'

type CardProps = {
    title : string
}

export default function Card({ title }: CardProps) {
    <View>
        <Image 
            source ={{ uri:'https://www.google.fr/url?sa=i&url=https%3A%2F%2F99designs.fr%2Fblog%2Fconseils-design%2Fimages-might-ruining-website%2F&psig=AOvVaw06Y6OI2_9DvfSvxQifmW-Q&ust=1708097262177000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJDU7qbUrYQDFQAAAAAdAAAAABAf'
            }} style={styles.image}/>
        <Text>{title}</Text>
    </View>
}

const styles = StyleSheet.create ({
    image: {
        width: 200,
        height:300
    }
})