import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect, withRouter } from 'react-router-dom';
import { Collapse } from 'react-collapse';
// import TeX from '@matejmazur/react-katex';
// import { BlockMath, InlineMath } from 'react-katex';

import { API_URL } from '../../configuration';
import ExerciseForm from '../ExerciseForm';
import {Button} from "@mui/joy";
import {Box} from "@mui/material";
import {Add} from "@mui/icons-material";
import translate from "../../tools/translate";

const CourseDetails = ({ match }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
    const [details, setDetails] = useState(null);
    const [forms, setForms] = useState(null);
    const [canAddNew, setCanAddNew] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const { id } = match.params;

    useEffect(() => {
        if (!details) {
           refresh();
        }
        else if (!forms) {
            setForms(details.exercises.map(exercise => (
                <ExerciseForm exercise={exercise} key={exercise.id} refresh={refresh} />
            )));
        }
    }, []);
    const refresh = () => {
        axios({
            url: `${API_URL}/courses/${id}`,
            headers: {
                Authorization: `Bearer ${cookies.jwt}`
            }
        }).then(response => {
            console.log("refresh");
            console.log(response);
            setDetails(response.data);
            setForms(response.data.exercises.map(exercise => (
                <ExerciseForm exercise={exercise} key={exercise.id} refresh={refresh} />
            )));
        }).catch(error => {
            alert(error);
            removeCookie("jwt");
        });
    }

    const cancelCreatingExercise = () => {
        setCanAddNew(true);
        let list = forms;
        setForms(list);
    }

    const showNewForm = () => {
        let newList = [<ExerciseForm key={0} createNew={saveNewExercise} refresh={refresh} cancelCreating = {cancelCreatingExercise} />].concat(forms);
        setForms(newList);
        setCanAddNew(false)
    };

    const saveNewExercise = (question, correctAnswers, incorrectAnswers) => {
        console.log(correctAnswers);
        axios({
            method: "POST",
            url: `${API_URL}/exercises`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.jwt}`
            },
            data: {
                question: question,
                correctAnswers: correctAnswers,
                incorrectAnswers: incorrectAnswers,
                courseId: details.id
            }
        }).then(reponse => {
            alert("Новое задание успешно создано");
            setCanAddNew(true);
            refresh();
        }).catch(error => alert("Ошибка создания задания\n" + error));
    }

    const removeCourse = () => {
        axios({
            method: "DELETE",
            url: `${API_URL}/courses/${details.id}`,
            headers: {
                Authorization: `Bearer ${cookies.jwt}`
            }
        }).then(response => {
            alert("Курс успешно удален");
            setRedirect(true);
        }).catch(error => alert("Ошибка удаления курса \n" + error));

    }

    if(redirect){
        return <Redirect to="/courses"/>
    }

    if (!details) {
        return null;
    }
    return (
        <Box sx={{ paddingLeft: '50px', paddingRight: '50px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center '}}>
                <h1>{details.name.toUpperCase()}</h1>
                <Box sx={{display: 'flex', gap: '10px'}}>
                    <Button color="primary"
                            onClick={() => {}}
                            variant="outlined">Редактировать данные курса</Button>
                    <Button color="danger" variant="plain"
                            onClick={removeCourse}>Удалить курс</Button>
                </Box>
            </Box>
            <Button variant={"solid"} sx={{mt: 5}}
                    startDecorator={<Add />}
                    onClick={showNewForm} disabled={!canAddNew}>
                Добавить задание
            </Button>
            {forms}
        </Box>
    );
};

export default withRouter(CourseDetails);