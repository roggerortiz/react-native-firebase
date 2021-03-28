import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { db } from '../database/firebase'

const UserList = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        db.collection('users').onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach((doc) => {
                users.push({
                    ...doc.data(),
                    id: doc.id
                });
            });
            setUsers(users);
        });
    }, [])

    return (
        <ScrollView>
            <View>
                <Button
                    title="Create User"
                    onPress={() => props.navigation.navigate("UserCreate") }
                />
            </View>
            <View>
                {users.map((user) => (
                    <ListItem
                        key={user.id}
                        bottomDivider
                        onPress={() => props.navigation.navigate("UserDetails", {userId: user.id})}
                    >
                        <ListItem.Chevron />
                        <Avatar
                            rounded
                            source={{
                                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{user.name}</ListItem.Title>
                            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </View>
        </ScrollView>
    )
}

export default UserList
