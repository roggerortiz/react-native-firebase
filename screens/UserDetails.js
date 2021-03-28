import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { db }  from '../database/firebase'

const UserDetails = (props) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        phone: ''
    });

    const getUserId = () => {
        const params = props.route.params;
        return (params && params.userId) ? params.userId : "";
    }

    const getUserById = async () => {
        const userId = getUserId();
        if(userId === "") return;

        const doc = await db.collection("users").doc(userId).get();
        setUser({
            ...doc.data(),
            id: doc.id
        });
        setLoading(false);
    }

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

    const handleUpdateUser = async () => {
        if(!isValidUser()) return;

        await db.collection("users").doc(user.id).update(user);
        props.navigation.navigate("UserList");
    }

    const handleConfirmDeleteUser = () => {
        Alert.alert("Remove User", "Are you sure to remove the user?", [
            {text: "Yes", onPress: () => handleDeleteUser()},
            {text: "No", onPress: () => {}}
        ])
    }

    const handleDeleteUser = async () => {
        await db.collection("users").doc(user.id).delete();
        props.navigation.navigate("UserList");
    }

    useEffect(() => {
        getUserById();
    }, []);

    if(loading)
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Name"
                    value={user.name}
                    onChangeText={value => handleChangeText("name", value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Email"
                    value={user.email}
                    onChangeText={value => handleChangeText("email", value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Phone"
                    value={user.phone}
                    onChangeText={value => handleChangeText("phone", value)}
                />
            </View>
            <View>
                <Button
                    color="#28a745"
                    title="Update User"
                    onPress={() => handleUpdateUser()}
                />
            </View>
            <View>
                <Button
                    color="#dc3545"
                    title="Delete User"
                    onPress={() => handleConfirmDeleteUser()}
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

export default UserDetails
