import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import { createEventSchema } from '../helpers/validations';
import './createEvent.scss';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function CreateEvent() {
    const [userList, setUserList] = useState([]);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitForm = (values) => {
        let userEntry = values;
        let temp = userList.find((item) => item.id === userEntry.id);

        if (editId) {
            let editTemp = userList.map((item) => {
                if (item.id === editId) {
                    item.eventName = userEntry.eventName;
                }
                return item;
            })
            setUserList(editTemp);
            setEditId(null);
        } else if (!temp) {
            let id = Date.now().toString(36) + Math.random().toString(36).substr(2);
            let userContainer = [...userList, { ...userEntry, id: id }]
            setUserList(userContainer);
        } else {
            alert('Already exist.')
        }
        setOpen(false)
    }

    const formik = useFormik({
        initialValues: {
            eventName: null,
        },
        validationSchema: createEventSchema,
        onSubmit: handleSubmitForm,
    });

    useEffect(() => {
        const { resetForm } = formik;
        if (!open) {
            setEditId(null)
            resetForm()
        }
    }, [open])

    useEffect(() => {
        if (editId) {
            const { setFieldValue } = formik;
            let temp = userList.find((item) => item.id === editId);
            setFieldValue('eventName', temp.eventName)
        }
    }, [editId])

    const handleEdit = (id) => {
        setEditId(id);
        setOpen(true);
    }

    const handleDelete = (id) => {
        let deleteTemp = userList.filter((item) => {
            return (
                item.id !== id
            )
        })
        setUserList(deleteTemp);
    }

    return (
        <div className='createEventWrap'>
            <div>
                <div className='createEventHeadWrap'>
                    <div className='headerTitle'>
                        <h4>Event Management</h4>
                    </div>
                    <div>
                        <Button variant="contained" onClick={handleClickOpen}>
                            Add New Event
                        </Button>
                    </div>
                </div>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>User Form</DialogTitle>
                    <DialogContent >
                        <form onSubmit={formik.handleSubmit} >
                            <div>
                                <TextField
                                    style={{ margin: 10 }}
                                    label="Event Name"
                                    variant="outlined"
                                    name="eventName"
                                    type="eventName"
                                    onChange={formik.handleChange}
                                    value={formik.values.eventName}
                                    error={formik.touched.eventName && Boolean(formik.errors.eventName)}
                                    helperText={formik.touched.eventName && formik.errors.eventName}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker />
                                </LocalizationProvider>
                            </div>
                            <Button variant="contained" type="submit" >Save</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='userDetails'>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell >Event Name</StyledTableCell>
                                <StyledTableCell >Start Date</StyledTableCell>
                                <StyledTableCell >End Date</StyledTableCell>
                                <StyledTableCell >Update</StyledTableCell>
                                <StyledTableCell >Remove</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {console.log('userList', userList)}
                            {userList.map((item) => (
                                <StyledTableRow key={item.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {item.id}
                                    </StyledTableCell>
                                    <StyledTableCell >{item.eventName}</StyledTableCell>
                                    <StyledTableCell >{item.lastName}</StyledTableCell>
                                    <StyledTableCell >{item.email}</StyledTableCell>

                                    <StyledTableCell >
                                        <Button variant="contained" onClick={() => handleEdit(item.id)} >Edit</Button>
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        <Button variant="contained" onClick={() => handleDelete(item.id)}>Delete</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>


        </div>
    )
}

export default CreateEvent