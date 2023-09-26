import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { MDBBtn, MDBCard, MDBCardBody, MDBCheckbox, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { setLogin } from '../Reducers/authReducer';
import { ApiPostNoAuth } from '../Api/ApiData';
import { toast } from "react-toastify";
// import * as yup from 'yup'
import { Button, Checkbox, Flex, FormControl, FormLabel, Heading, Image, Input, Stack, Text } from '@chakra-ui/react'
import Error from './Commom/Error';

const schema = yup.object().shape({
    email: yup.string().required("please enter your email"),
    password: yup.string().required("please enter your password")
})

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registration, setRegistration] = useState({
        email: '',
        password: ''
    })


    // validations
    const loginSchema = yup.object().shape({
        email: yup
            .string()
            // .email("Please provide a valid email address")
            .required("Email address is required"),
        password: yup
            .string()
            .min(5, "Password should have a minimum length of 5")
            .max(12, "Password should have a maximum length of 12")
            .required("Password is required")
            .oneOf([('password')], 'Passwords does not match'),
    });


    const handleLogin = (e) => {
        console.log(e, "wwewe")
        ApiPostNoAuth(
            "/admin/login",
            {
                email: e.email,
                password: e.password,
            }
        )
            .then((response) => {
                toast.success('Logiin SuccessFull')
                dispatch(
                    setLogin({
                        token: response?.data?.data?.token,
                        profile: response?.data?.data,
                        access: response?.data?.data?.managerAccess,
                    })
                );
                navigate("/StudentListpage");
            })
            .catch((error) => {
                toast.error(error.message)
                console.log(error);
            });
    };
    return (
        <>

            <Formik initialValues={registration} validationSchema={schema} onSubmit={handleLogin}>
                {
                    ({ values, isSubmitting }) => {
                        return <Form>
                            {
                                console.log(values)
                            }
                            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                                    <Stack spacing={4} w={'full'} maxW={'md'}>
                                        <Heading fontSize={'2xl'}>Sign in to SCCI ERP</Heading>
                                        <FormControl id="email">
                                            <FormLabel>Email address</FormLabel>
                                            <Field name="email">
                                                {({ field }) => (
                                                    <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                                        <Input
                                                            type="text"
                                                            id="email"
                                                            placeholder="Email"
                                                            {...field}
                                                        />
                                                        <ErrorMessage
                                                            name="email"
                                                            render={(msg) => <Error msg={msg} />}
                                                        />
                                                    </FormControl>
                                                )}</Field>

                                        </FormControl>
                                        <FormControl id="password">
                                            <FormLabel>Password</FormLabel>
                                            <Field name="password">
                                                {({ field }) => (
                                                    <FormControl style={{ marginTop: 10, marginBottom: 12 }}>

                                                        <Input
                                                            type="password"
                                                            id="password"
                                                            placeholder="password"
                                                            {...field}
                                                        />
                                                        <ErrorMessage
                                                            name="password"
                                                            render={(msg) => <Error msg={msg} />}
                                                        />
                                                    </FormControl>
                                                )}</Field>

                                        </FormControl>
                                        <Stack spacing={6}>
                                            <Stack
                                                direction={{ base: 'column', sm: 'row' }}
                                                align={'start'}
                                                justify={'space-between'}>
                                                <Checkbox>Remember me</Checkbox>

                                            </Stack>
                                            <Button type='submit' colorScheme={'blue'} variant={'solid'}>
                                                Sign in
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Flex>
                                <Flex flex={1}>
                                    <Image
                                        alt={'Login Image'}
                                        objectFit={'cover'}
                                        src={
                                            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                                        }
                                    />
                                </Flex>
                            </Stack>
                        </Form>
                    }
                }

            </Formik>

        </>
    );
}

export default Login;