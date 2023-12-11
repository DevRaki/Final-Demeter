import React from 'react';
import Box from "@mui/material/Box";
import '../css/style.css'

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};


function DeleteUser({ onClose, onDelete }) {

    const onCancel = () => {
        onClose();
    };

    return (
        <div>
            <Box sx={style}>
                <div className="fixed inset-0 flex items-center justify-center">

                    <div className="p-6 rounded shadow-md text-end">
                        <h1 className="text-3xl font-semibold ">Confirmar eliminación</h1>
                        <p className="deleteText">
                            ¿Estás seguro de que deseas eliminar este usuario?
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={onDelete}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-5 "
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={onCancel}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default DeleteUser