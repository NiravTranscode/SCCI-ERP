import React from 'react'
import { Box, Button, Divider, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, } from '@chakra-ui/react'
import { useState } from 'react'
import { memo } from 'react'
import Tags from '../../../Components/Commom/Tags'

function Filtermodel({ isOpen, onClose, categories, getFilterMember }) {
    const finalRef = React.useRef(null)
    const [filter, setFilter] = useState({
        typeFilter: [],
        genderFilter: "",
        cityFilter: "",
        stateFilter: "",
        membershipTypeFilter: "",
        feesFilter: ""
    })
    let categoryMap = null;
    let obj = {}
    for (let i = 0; i < categories.length; i++) {
        obj[categories[i]._id] = categories[i].name
    }
    categoryMap = obj


    const handleChange = (event) => {
        const { name, value } = event.target
        if (name == 'typeFilter') {
            setFilter((old) => {
                return {
                    ...old,
                    typeFilter: old.typeFilter.includes(value) ? old.typeFilter : [...old.typeFilter, value]
                }
            })
            return
        }
        if (name == 'limit') {
            setFilter((old) => {
                return {
                    ...old,
                    limit: Number(value)
                }
            })
            return
        }
        if (name == 'feesFilter') {
            setFilter((old) => {
                return {
                    ...old,
                    feesFilter: Number(value)
                }
            })
            return
        }

        setFilter((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    const remove = (ind) => {
        setFilter((old) => {
            return {
                ...old,
                typeFilter: old.typeFilter.filter((data) => data != ind)
            }
        })
    }

    return (
        <>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>SCCI MEMBERS-DETAILS</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Divider />
                        <Select placeholder='Select option' name='typeFilter' onChange={handleChange} >
                            {
                                categories.map((data) => <option value={data?._id}>{data?.name}</option>)
                            }
                        </Select>
                        <Box py={4}>
                            {
                                filter?.typeFilter?.map((cat) => <Tags value={categoryMap[cat]} remove={() => remove(cat)} />)
                            }
                        </Box>

                        <SimpleGrid columns={2} spacing={10}>
                            <Input type='text' mt={2} placeholder='City' name='cityFilter' value={filter.cityFilter} onChange={handleChange} />
                            <Input type='text' mt={2} placeholder='State' name='stateFilter' value={filter.stateFilter} onChange={handleChange} />

                        </SimpleGrid>

                        <SimpleGrid columns={2} spacing={10} mt={4}>
                            <Select placeholder='Type' name='membershipTypeFilter' onChange={handleChange} >
                                <option value={'yearly'}>Yearly</option>
                                <option value={'patron'}>Patron (life time)</option>
                            </Select>
                            <Select placeholder='Status' name='feesFilter' onChange={handleChange} >
                                <option value={0}>Complete</option>
                                <option value={1}>Pending</option>
                            </Select>
                        </SimpleGrid>

                        <Input type='number' mt={4} placeholder='Limit' name='limit' value={filter.limit} onChange={handleChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => setFilter({
                            typeFilter: [],
                            genderFilter: "",
                            cityFilter: "",
                            stateFilter: "",
                            membershipTypeFilter: ""
                        })}>
                            Clear
                        </Button>
                        <Button colorScheme='green' onClick={() => getFilterMember(filter)}>Apply</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default memo(Filtermodel)