import React, { Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { API_URL } from '../../configuration';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import {Box, TextField} from "@mui/material";
import translate from "../../tools/translate";
import {Button, Chip, Typography} from "@mui/joy";
import {CancelOutlined, CheckCircleOutlineRounded} from "@mui/icons-material";

const ExerciseForm = ({ exercise, createNew, refresh, cancelCreating }) => {
    const [cookies] = useCookies(['jwt']);
    const [disabled, setDisabled] = useState(!!exercise);
    const [question, setQuestion] = useState((exercise && exercise.question) || '');
    const [correctAnswers, setCorrectAnswers] = useState(
        (exercise && exercise.correctAnswers) || ''
    );
    const [incorrectAnswers, setIncorrectAnswers] = useState(
        (exercise && exercise.incorrectAnswers) || ''
    );

    const saveExercise = () => {
        if (exercise) {
            axios({
                method: 'PUT',
                url: `${API_URL}/exercises/${exercise.id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.jwt}`,
                },
                data: {
                    question: question,
                    correctAnswers: correctAnswers,
                    incorrectAnswers: incorrectAnswers,
                },
            })
                .then((reponse) => {
                    refresh();
                    alert('Задание успешно сохранено');
                    setDisabled(true);
                })
                .catch((error) => alert('Ошибка сохранения задания \n' + error));
        } else {
            setDisabled(true);
            createNew(question, [correctAnswers], incorrectAnswers);
        }
    };

    const handleIncorrectAnswerChange = (e, index) => {
        let answers = [...incorrectAnswers];
        answers[index] = e.target.value;
        setIncorrectAnswers(answers);
    };

    const cancel = () => {
        setDisabled(true);
        if (exercise) {
            setQuestion(exercise.question || '');
            setCorrectAnswers(exercise.correctAnswers || '');
            setIncorrectAnswers(exercise.incorrectAnswers || '');
        } else {
            cancelCreating();
        }
    };

    console.log(exercise);

    const addIncorrectAnswer = (e) => {
        e.preventDefault();
        let answers = incorrectAnswers.concat('');
        setIncorrectAnswers(answers);
    };

    const removeExercise = () => {
        axios({
            method: 'DELETE',
            url: `${API_URL}/exercises/${exercise.id}`,
            headers: {
                Authorization: `Bearer ${cookies.jwt}`,
            },
        })
            .then((response) => {
                alert('Задание успешно удалено');
                refresh();
            })
            .catch((error) => {
                alert('Ошибка удаления задания\n' + error);
            });
    };

    return (
        <Box sx={{
            bgcolor: 'rgba(144, 202, 249, 0.05)',
            margin: '20px 0', padding: '20px', borderRadius: '10px',
            display: "flex", flexDirection: "column", gap: '20px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {!disabled ? (
                    <>
                        <TextField required
                                   fullWidth
                                   label={"Вопрос"}
                                   value={question}
                                   onChange={(e) => {setQuestion(e.target.value)}}/>
                    </>
                ) : null}

                <Typography level={'title-lg'}>
                    <TeX>{question}</TeX>
                </Typography>


                <Chip color="primary" variant="plain" startDecorator={<CheckCircleOutlineRounded/>}>Правильный ответ</Chip>
                {!disabled ? (
                    <Box sx={{ width: '100%', display: "flex", gap: '50px', alignItems: 'center'}}>
                        <TextField sx={{width: '50%' }} required size={'small'}
                                   value={correctAnswers}
                                   onChange={(e) => {setCorrectAnswers(e.target.value)}}/>

                        <TeX>{correctAnswers}</TeX>
                    </Box>
                    ) : (
                        <TeX>{correctAnswers.toString()}</TeX>
                )}

                <Chip color="primary" variant="plain" startDecorator={<CancelOutlined/>}>Неправильные ответы</Chip>

                {incorrectAnswers &&
                [...incorrectAnswers].map((answer, index) => (
                    !disabled ? (
                        <Box sx={{ width: '100%', display: "flex", gap: '50px', alignItems: 'center'}}>
                            <TextField sx={{width: '50%' }} required size={'small'}
                                       value={answer}
                                       onChange={(e) => handleIncorrectAnswerChange(e, index)}/>

                            <TeX>{answer}</TeX>
                        </Box>
                    ) : (
                        <TeX>{answer}</TeX>
                    )

                ))}
                {!disabled && <Button variant={'soft'} onClick={addIncorrectAnswer}>Добавить ответ</Button>}
            </Box>
            {disabled ? (
                <Box sx={{display: 'flex', gap: '10px'}}>
                    <Button onClick={() => setDisabled(false)} variant={'solid'}>Редактировать</Button>
                    <Button onClick={removeExercise} variant={'outlined'}>Удалить </Button>
                </Box>
            ) : (
                <Box sx={{display: 'flex', gap: '10px'}}>
                    <Button onClick={saveExercise} variant={'solid'}>Сохранить изменения</Button>
                    <Button onClick={cancel} variant={'outlined'}>Отмена</Button>
                </Box>
            )}
        </Box>
    );
};

export default ExerciseForm;
