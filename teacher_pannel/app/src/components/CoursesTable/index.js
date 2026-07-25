
import React, { Fragment, useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';

import { API_URL } from '../../configuration';
import CourseForm from '../CourseForm';
import {Link} from "@mui/material";
import translate from "../../tools/translate";
import {Button, Sheet, Table} from "@mui/joy";
import {Add, EditOutlined} from "@mui/icons-material";

const CoursesTable = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
    const [courses, setCourses] = useState(null);
    const [createNew, setCreateNew] = useState(false);
    useEffect(() => {
        if (!courses) {
            refresh();
        }
    });

    const refresh = () => {
        axios({
            url: `${API_URL}/courses`,
            headers: {
                Authorization: `Bearer ${cookies.jwt}`
            }
        }).then(response => {
            setCourses(response.data.content)
        }).catch(error => {
            removeCookie("jwt");
        });
    }

    const createNewCourse = (name, desc) => {
        axios({
            method: 'POST',
            url: `${API_URL}/courses`,
            headers: {
                Authorization: `Bearer ${cookies.jwt}`,
                "Content-Type": "application/json"
            },
            data: {
                name: name,
                desc: desc
            }
        }).then(response => {
            alert(translate('courses.createdNew'));
            setCreateNew(false);
            refresh();
        }).catch(error => {
            console.log(error);
        });
    }

    const cancelCreatingCourse = () => {
        setCreateNew(false);
    }

    return (
        <div style={{ margin: "0 50px" }}>
            <Button variant={"solid"} sx={{mt: 5}}
                    startDecorator={<Add />}
                    onClick={() => setCreateNew(true)} disabled={createNew}>
                {translate('courses.createNew')}
            </Button>
            {createNew && <CourseForm open={true} createNew={createNewCourse} cancel={cancelCreatingCourse} />}

            <Sheet variant="soft"
                   sx={{ pt: 1,
                       borderRadius: 'sm',
                       my: 5
                   }}>
                <Table
                    variant={'plain'}
                    color={"neutral"}
                    hoverRow
                    stickyHeader
                    sx={{ captionSide: 'top'}}
                >
                    <caption>{translate('courses.tableTitle')}</caption>
                    <thead>
                    <tr>
                        <th style={{ width: '10%' }}>ID</th>
                        <th>{translate('courses.name')}</th>
                        <th>{translate('courses.description')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses && courses.map(course => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>
                                <Link href={`/courses/${course.id}`} underline="hover">
                                    {course.name.toLocaleUpperCase()} <EditOutlined fontSize={"small"} />
                                </Link></td>
                            <td>{course.desc}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Sheet>
        </div>
    );
}

export default CoursesTable;