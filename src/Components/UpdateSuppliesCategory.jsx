import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useCategorySupplies } from '../Context/CategorySupplies.context';
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

function UpdateSuppliesCategory({
  buttonProps = {
    buttonClass: 'btn btn-primary',
    buttonText: <BiEdit />,
    isDisabled: false,
  },
  supplyCategoryToEdit = null,
}) {
  const { updateCategory_supplies } = useCategorySupplies();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (supplyCategoryToEdit) {
      setValue('Name_SuppliesCategory', supplyCategoryToEdit.Name_SuppliesCategory);

    }
  }, [supplyCategoryToEdit]);


  const onSubmit = handleSubmit(async (values) => {
    if (supplyCategoryToEdit) {
      const supplyCategory = { ...supplyCategoryToEdit, ...values };
      try {
        await updateCategory_supplies(supplyCategory.ID_SuppliesCategory, supplyCategory);
        setOpen(false);
      } catch (error) {
        console.error('Error al actualizar la categoria', error);
      }
    }
  });

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className={buttonProps.buttonClass}
        onClick={() => {
          setOpen(true);
        }}
        disabled={buttonProps.isDisabled}
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
                <h5>Edición de categoria de insumo</h5>
              </div>
              <div className="card-body">
                <form
                  onSubmit={(event) => onSubmit(event)}
                >
                  <div className="city">
                    <div className="form-group col-md-6">
                      <label htmlFor="Name_SuppliesCategory" className="form-label">
                        Nombre:
                      </label>
                      <input
                        {...register('Name_SuppliesCategory', {
                          required: 'Este campo es obligatorio',
                          pattern: {
                            value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/u,
                            message:
                              'Debe tener la primera letra en mayúscula y el resto en minúscula.',
                          },
                        })}
                        type="text"
                        className="form-control"
                        defaultValue={supplyCategoryToEdit ? supplyCategoryToEdit.Name_SuppliesCategory : ''}
                      />
                      {errors.Name_SuppliesCategory && (
                        <p className="text-red-500">
                          {errors.Name_SuppliesCategory.message}
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

export default UpdateSuppliesCategory;
