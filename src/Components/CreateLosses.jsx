import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { useLosses } from '../Context/Losses.context';
import { IoMdArrowDropdown } from 'react-icons/io';
import Select from 'react-select';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        '&:hover': {
            border: state.isFocused ? '1px solid #e36209' : '1px solid #ced4da',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#e36209' : state.isFocused ? '#e36209' : 'white',
        color: state.isSelected ? 'white' : state.isFocused ? '#555' : '#201E1E',
        '&:hover': {
            backgroundColor: '#e36209',
            color: 'white',
        },
        cursor: state.isDisabled ? 'not-allowed' : 'default',
    }),
};

function CreateLosses({ supply, onLossCreated }) {
    const { createLoss } = useLosses();
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = handleSubmit(async (values) => {
        try {
            await createLoss({
                ...values,
                Supplies_ID: supply.ID_Supplies,
                Measure: supply.Measure,
            });
            setOpen(false);
            
            if (onLossCreated) {
                onLossCreated();
                reset();
            }
        } catch (error) {
            console.error('Error al registrar la pérdida', error);
        }
    });

    const onCancel = () => {
        setOpen(false);
        reset();
    };

    return (
        <React.Fragment>
            <button
                type="button"
                className={`ml-1 btn btn-icon btn-warning ${!supply.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                onClick={() => {
                    setOpen(true);
                }}
                disabled={!supply.State}
                title="Este botón sirve para registrar la baja del insumo"
            >
                <IoMdArrowDropdown />
            </button>

            <Modal
                open={open}
                onClose={onCancel}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={style}>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Registro de pérdida</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={(event) => onSubmit(event)}>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="Unit" className="form-label">
                                            Cantidad pérdida:
                                        </label>
                                        <input
                                            {...register('Unit', {
                                                required: 'Este campo es obligatorio',
                                                validate: (value) => {
                                                    const parsedValue = parseFloat(value);
                                                    if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 99999999) {
                                                        return 'Debe ser un número entero entre 0 y 99999999.';
                                                    }
                                                },
                                            })}
                                            type="text"
                                            className="form-control"
                                        />
                                        {errors.Unit && (
                                            <p className="text-red-500">{errors.Unit.message}</p>
                                        )}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="Reason" className="form-label">
                                            Razón de la pérdida:
                                        </label>
                                        <textarea
                                            {...register('Reason', {
                                                required: 'Este campo es obligatorio',
                                                minLength: {
                                                    value: 10,
                                                    message: 'Debe tener al menos 10 caracteres.',
                                                },
                                                maxLength: {
                                                    value: 250,
                                                    message: 'No debe exceder los 250 caracteres.',
                                                },
                                                validate: (value) => {
                                                    if (!/^[A-ZÁÉÍÓÚÑa-záéíóúñ\s,.]*$/.test(value)) {
                                                        return 'Se permiten letras mayúscula, minúsculas, espacios, tildes, comas y puntos.';
                                                    }
                                                },
                                            })}
                                            type="textarea"
                                            className="form-control"
                                        />
                                        {errors.Reason && (
                                            <p className="text-red-500">{errors.Reason.message}</p>
                                        )}
                                    </div>

                                    <div className="buttonconfirm">
                                        <div className="mb-3">
                                            <button
                                                className="btn btn-primary mr-5"
                                                type="submit"
                                            >
                                                Confirmar
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                onClick={onCancel}
                                                type="button"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default CreateLosses;