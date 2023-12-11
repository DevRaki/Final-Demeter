import { createContext, useContext, useState } from 'react';
import { getUsersRequest, getUserRequest, createUserRequest, statusUserRequest, updateUserRequest, deleteUserRequest } from '../Api/User.request.js'
import { getWaitersRequest, getWaiterRequest, createWaiterRequest } from '../Api/User.request.js';

export const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("El useUser debe usarse dentro de UserProvider")
    }
    return context;
}

export const User = ({ children }) => {
    const [user, setUser] = useState([]);

    const getUsers = async () => {
        try {
            const res = await getUsersRequest();
            setUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id);
            return res.data
        } catch (error) {
            console.error(error);
        }
    }

    const createUser = async (user) => {
        try {
            const res = await createUserRequest(user);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }

    const toggleUserStatus = async (id) => {
        try {
            const res = await statusUserRequest(id);

            if (res.status === 200) {
                setUser((prevUser) =>
                    prevUser.map((users) =>
                    users.ID_User === id ? { ...users, State: !users.State } : users
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (id, users) => {
        try {
            await updateUserRequest(id, users);
            getUsers();
        } catch (error) {
            console.error(error);
        }
    }

    const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(id)
            if (res.status === 204) setUser(user.filter(users => users.ID_User !== id))
        } catch (error) {
            console.log(error);
        }
    }

    // --------------------------- Mesero --------------------------- //

    const getWaiters = async () => {
        try {
            const res = await getWaitersRequest();
            setUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getWaiter = async (id) => {
        try {
            const res = await getWaiterRequest(id);
            return res.data
        } catch (error) {
            console.error(error);
        }
    }

    const createWaiter = async (user) => {
        try {
            const res = await createWaiterRequest(user);
            getWaiters();
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UserContext.Provider
            value={{
                user,
                getUsers,
                getUser,
                createUser,
                toggleUserStatus,
                updateUser,
                deleteUser,
                // ---------- Mesero ---------- //
                getWaiters,
                getWaiter,
                createWaiter,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};