import React, { useState } from 'react'
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button } from '@chakra-ui/react'
import { ButtonGroup } from 'react-bootstrap'
import profileImg from '../../Assest/images/alt_profile.jpg'
import { useNavigate } from 'react-router-dom'
function Membercard({ data, openModel, setSelectedId }) {
    const navigate = useNavigate()
    const heandleClick = (id) => {
        navigate(`/members_details/${id}`)
    }
    const handleOpenDeletePop = (id) => {
        setSelectedId(id)
        openModel()
    }
    return (
        <>
            <Card maxW='sm' className='hover_effect' >
                <CardBody>
                    <Image
                        src={data?.profilePhoto || profileImg}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = profileImg;
                        }}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>{data?.companyName}</Heading>
                        <Text>
                            {data?.firstName}  {data?.middleName}  {data?.lastName}
                        </Text>
                        <Text>
                            {data?.phone}
                        </Text>
                        <Text>
                            {data?.userId}
                        </Text>
                        <Text>
                            {data?.email}
                        </Text>
                    </Stack>
                </CardBody>

                <CardFooter >
                    <Button variant='solid' size={'sm'} colorScheme='blue' onClick={() => heandleClick(data?._id)}>
                        Details
                    </Button>
                    <Button variant='solid' size={'sm'} colorScheme='green' ml={2} onClick={() => navigate(`/members/edit/${data?._id}`)}>
                        Edit
                    </Button>
                    <Button variant='solid' size={'sm'} colorScheme='orange' ml={2} onClick={() => handleOpenDeletePop(data?._id)}>
                        Delete
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default Membercard;






