import { Box, useState, Modal } from "react";

function Manage({ open, handleClose }){



  return (
    <Modal open={open} onClose={handleClose}>
      <Box
          sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: '#FFF',
          borderRadius: 4,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center'
        }}
      ></Box>
    </Modal>
  );
}



export default Manage;