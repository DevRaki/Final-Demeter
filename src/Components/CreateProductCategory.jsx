import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useCategoryProducts } from '../Context/CategoryProducts.context';
import { useForm } from 'react-hook-form';

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

function CreateCategory_products({
    onDefaultSubmit = null,
    buttonProps = {
        buttonClass: 'btn btn-primary',
        buttonText: 'Registrar',
    },
}) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset,
    } = useForm();

    const { Category_products, createCategory_products } = useCategoryProducts();

    const [open, setOpen] = useState(false);

    const onSubmit = handleSubmit(async (values) => {
        const isNameDuplicate = Category_products.some(
            (ProductCategory) => ProductCategory.Name_ProductCategory === values.Name_ProductCategory
        );

        if (isNameDuplicate) {
            setError('Name_ProductCategory', {
                type: 'manual',
                message: 'El nombre de la categoria ya existe.',
            });
            return;
        }

        createCategory_products(values);
        setOpen(false);
        reset();
    });

    const onCancel = () => {
        setOpen(false);
        reset();
    };

    return (
        <React.Fragment>
            <button
                type="button"
                className={buttonProps.buttonClass}
                onClick={() => setOpen(true)}
            >
                {buttonProps.buttonText}
            </button>

            <Modal
                open={open}
                onClose={onCancel}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 600 }}>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Registro de categoría de productos</h5>
                            </div>
                            <div className="card-body">
                                <form
                                    onSubmit={(event) =>
                                        typeof onDefaultSubmit === 'function'
                                            ? onDefaultSubmit(event, setOpen)
                                            : onSubmit(event)
                                    }
                                >
                                    <div className="city">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="Name_productCategory" className="form-label">
                                                Nombre: <strong>*</strong>
                                            </label>
                                            <input
                                                {...register('Name_ProductCategory', {
                                                    required: 'Este campo es obligatorio',
                                                    pattern: {
                                                        value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/u,
                                                        message:
                                                            'Debe tener la primera letra en mayúscula, el resto en minúscula.',
                                                    },
                                                })}
                                                type="text"
                                                className="form-control"
                                            />
                                            {errors.Name_ProductCategory && (
                                                <p className="text-red-500">
                                                    {errors.Name_ProductCategory.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="buttonconfirm">
                                        <div className="mb-3">
                                            <button
                                                className="btn btn-primary mr-5"
                                                type="submit"
                                                title="Este botón sirve para guardar la información y cerrar la ventana modal."
                                            >
                                                Confirmar
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                onClick={onCancel}
                                                type="submit"
                                                title="Este botón sirve para cerrar la ventana modal sin guardar la información."
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

export default CreateCategory_products;
