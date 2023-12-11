import { createContext, useContext, useState } from 'react';
import { getRolesRequest, getRoleRequest, createRoleRequest, toggleRoleRequest, updateRoleRequest, deleteRoleRequest } from '../Api/Role.request.js'

export const RoleContext = createContext();

export const useRole = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("El useRole debe usarse dentro de RoleProvider")
    }
    return context;
}

export const Role = ({ children }) => {
    const [role, setRole] = useState([]);

    const getRoles = async () => {
        try {
            const res = await getRolesRequest();
            setRole(res.data)
            console.log('Roles obtenidos context: ', res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getRole = async (id) => {
        try {
            const res = await getRoleRequest(id);
            return res.data
        } catch (error) {
            console.error(error);
        }
    }

    const createRole = async (Role) => {
        try {
            const res = await createRoleRequest(Role);
            getRoles();
        } catch (error) {
            console.log(error);
        }
    }

    const toggleRoleStatus = async (id) => {
        try {
            const res = await toggleRoleRequest(id);

            if (res.status === 200) {
                setRole((prevRole) =>
                    prevRole.map((rol) =>
                    rol.ID_Role === id ? { ...rol, State: !rol.State } : rol
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateRole = async (id, rol) => {
        try {
            await updateRoleRequest(id, rol);
            getRoles();
        } catch (error) {
            console.error(error);
        }
    }

    const deleteRole = async (id) => {
        try {
            const res = await deleteRoleRequest(id)
            if (res.status === 204) setRole(role.filter(rol => rol.ID_Role !== id))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <RoleContext.Provider
            value={{
                role,
                getRoles,
                getRole,
                createRole,
                toggleRoleStatus,
                updateRole,
                deleteRole,
            }}
        >
            {children}
        </RoleContext.Provider>
    );
};