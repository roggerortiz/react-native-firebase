import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { db }  from '../database/firebase'

const UserCreate = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const isValidUser = () => {
        if (user.name === "")
            alert("Please provide a name");
        else
            return true;

        return false;
    }

    const handleChangeText = (name, value) => {
        setUser({...user, [name]: value});
    }

    const handleCreateUser = async () => {
        if(!isValidUser()) return;
        await db.collection('users').add(user);
        props.navigation.navigate("UserList");
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Name"
                    onChangeText={value => handleChangeText("name", value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Email"
                    onChangeText={value => handleChangeText("email", value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Phone"
                    onChangeText={value => handleChangeText("phone", value)}
                />
            </View>
            <View>
                <Button
                    title="Save User"
                    onPress={() => handleCreateUser()}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    }
})

export default UserCreate
