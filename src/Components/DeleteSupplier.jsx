import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSupplier } from "../Context/Supplier.context";
import { AiFillDelete } from "react-icons/ai";

import "../css/style.css";

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

export default function DeleteSupplier({
  currentSupplier = {
    ID_Supplier: null
  }
}) {
  const [open, setOpen] = React.useState(false);
  const { deleteSupplier } = useSupplier();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const confirmDelete = () => {
    if (currentSupplier.ID_Supplier) {
      console.log(currentSupplier);
      deleteSupplier(currentSupplier.ID_Supplier);
      handleClose(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn  btn-icon btn-danger"
        onClick={() => handleOpen()}
      >
        <i data-feather="camera">
        <AiFillDelete />{" "}
        </i>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="fixed inset-0 flex items-center justify-center">

            <div className=" p-6 rounded shadow-md text-end ">
              <h1 className="text-3xl font-semibold ">Confirmar eliminación</h1>
              <p className="deleteText">
                ¿Estás seguro de que deseas eliminar este proveedor?
              </p>
              <div >
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded ml-5 mt-5  "
                >
                  Eliminar
                </button>
                <button
                  onClick={handleClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded m-3"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}