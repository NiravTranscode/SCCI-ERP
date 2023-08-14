import { Box, Button, Divider, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { Select } from '@chakra-ui/react'
import { ApiPost } from '../../../Api/ApiData'
function Transactioninfo({ details, get }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
    console.log(details, '10')

    const [body, setBody] = useState({
        memberId: "",
        type: "",
        amount: "",
        descripation: "",
    })


    const handleAddAmount = () => {
        let sendBody = body
        sendBody.memberId = details?._id
        ApiPost('/admin/transaction/add', sendBody).then((response) => {
            if (response.data.status == 200) {
                toast.success('Transaction Added')
                get()
            } else {
                toast.error(response?.data?.message)
            }
        }).catch((error) => toast.error(error.message))

        onClose()
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setBody((old) => {
            return {
                ...old,
                [name]: name == 'amount' ? Number(value) : value
            }
        })
    }

    return (
        <>
            <Box textAlign={'right'}>
                <Text >Membership Amount: <b> {details?.amount}</b></Text>
                <Text>Pending Amount: <b> {details?.pendingAmount}</b></Text>
            </Box>
            <TableContainer mt={5}>
                <Table variant='simple'>
                    <TableCaption>Member's Transaction Details</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Descripton</Th>
                            <Th>Amount</Th>
                            <Th>Type</Th>
                            <Th>Date</Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            details?.transactions?.map((trans) => <Tr>
                                <Td>{trans?.descripation}</Td>
                                <Td color={'green'}>{trans?.amount} </Td>
                                <Td >{trans?.paymentType}</Td>
                                <Td >{trans?.createdAt}</Td>
                            </Tr>)
                        }




                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Descripton</Th>
                            <Th>Amount</Th>
                            <Th>Type</Th>
                            <Th>Date</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>

            <Box textAlign={'center'}>

                <Button onClick={onOpen} > <AiOutlinePlus /> &nbsp;  New Transaction  </Button>
            </Box>

            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex>
                            <Box flex={1}>Total: {details?.amount}</Box>
                            <Box flex={1}>Pending: {details?.pendingAmount}</Box>
                        </Flex>
                        <Divider />
                        <Select placeholder='Select option' name='type' onChange={handleChange} >
                            <option value='membership'>Anual membership fees</option>
                            <option value='bulletIn'>Petron Bulletin Fees</option>
                            <option value='other'>Otheres</option>
                        </Select>
                        <Input type='text' mt={4} placeholder='Enter Amount' value={body?.amount} name='amount' onChange={handleChange} />
                        <Input type='text' mt={4} placeholder='Description' value={body?.descripation} name='descripation' onChange={handleChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='green' onClick={() => handleAddAmount()}>Done</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>)
}

export default Transactioninfo