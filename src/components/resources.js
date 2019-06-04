import user from '../resources/icons/profile.jpg';
import classe from '../resources/icons/classe.png';
import subject from '../resources/icons/openBook.jpg';
import missing from '../resources/icons/missing.png';
import React from "react";
import PeopleIcon from '@material-ui/icons/People';
import MarksIcon from '@material-ui/icons/BarChart';
import TimetableIcon from '@material-ui/icons/ViewModule'
import SubjectsIcon from '@material-ui/icons/LibraryBooks'
import ClassesIcon from '@material-ui/icons/Class'

export function getEmptyBox(name)
{
    const objectMap = {
        'user': {
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            phone: '',
            role: '',
        },
        'classe': {
            name: '',
            users: [],
        },
        'subject': {
            name: '',
        },
        'lesson': {
            subject: '',
            teacher: '',
        }
    };
    return objectMap[name] || null;
}

export function isRequired(attribute)
{
    const objectMap = {
        firstName: true,
        lastName: true,
        password: true,
        email: true,
        phone: true,
        role: true,
        name: true,
        subject: true,
        teacher: true,
    };
    return objectMap[attribute] || false;
}

export function shouldDisplay(attribute, isNew)
{
    const objectMap = {
        firstName: true,
        lastName: true,
        password: isNew,
        email: true,
        phone: true,
        role: true,
        name: true,
        teacher: true,
        subject: true,
    };
    return objectMap[attribute] || false;
}

export function getPicture(type)
{
    const objectMap = {
        'user': user,
        'classe': classe,
        'subject': subject,
    };
    return objectMap[type] || missing;
}

export function isSelect(attribute)
{
    const objectMap = {
        'role': true,
        'teacher': true,
        'subject': true,
    };
    return objectMap[attribute] || false;
}

export function translate(attribute)
{
    const objectMap = {
        'name': 'Name',
        'firstName': 'First name',
        'lastName': 'Last name',
        'phone': 'Phone',
        'role': 'Role',
        'email': 'E-mail',
        'password': 'Password',
    };
    return objectMap[attribute] || attribute;
}

export function getMenuText(key)
{
    const textMap = {
        people: "People",
        subjects: "Subjects",
        timetable: "Timetable",
        marks: "Marks",
        classes: "Classes",
    };
    return textMap[key];
}

export function getMenuIcon(key)
{
    const textMap = {
        people: <PeopleIcon/>,
        subjects: <SubjectsIcon/>,
        timetable: <TimetableIcon/>,
        marks: <MarksIcon/>,
        classes: <ClassesIcon/>,
    };
    return textMap[key];
}

export function getEntitiesName(entities)
{
    const textMap = {
        classes: "Classes",
        subjects: "Subjects",
        users: "People",
    };
    return textMap[entities];
}