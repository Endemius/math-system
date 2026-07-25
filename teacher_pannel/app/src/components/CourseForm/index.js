import React, { useState } from 'react';
import {Box, TextField} from "@mui/material";
import {Button, Modal, ModalClose, ModalDialog, Textarea, Typography} from "@mui/joy";
import translate from "../../tools/translate";

const CourseForm = ({ open, createNew, cancel }) => {
    const [openModal, setOpenModal] = useState(open)
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const submit = (e) => {
        e.preventDefault();
        createNew(name, desc);
    }
    const hideForm = (e) => {
        e.preventDefault();
        cancel();
    }
    return (
        <Modal open={openModal}
               onClose={() => {
                   setOpenModal(false);
                   cancel();
               }}>
            <ModalDialog
                color="primary"
                sx={{
                    width: "600px"
                }}
            >
                <ModalClose />
                <Typography>{translate('courses.createNew')}</Typography>
                <Box component={"form"} onSubmit={submit}
                     sx={{
                         my: '25px',
                         display: "flex",
                         flexDirection: "column",
                         gap: 2,
                         alignItems: "start",
                         width: "90%",
                     }}>
                    <TextField required
                               fullWidth
                               label={translate('courses.create.name')}
                               onChange={(e) => {setName(e.target.value)}}/>
                    <TextField required
                               fullWidth
                               multiline
                               label={translate('courses.create.description')}
                               onChange={(e) => setDesc(e.target.value)}/>
                    <Box sx={{
                        gap: 2
                    }}>
                        <Button variant={"solid"} type={"submit"}>
                            {translate('courses.create.submit')}</Button>
                        <Button variant={"plain"}
                                onClick={(e) => {
                                    hideForm(e);
                                    setOpenModal(false);
                                }}>{translate('courses.create.hide')}</Button>
                    </Box>
                </Box>
            </ModalDialog>
        </Modal>
    );
}

export default CourseForm;