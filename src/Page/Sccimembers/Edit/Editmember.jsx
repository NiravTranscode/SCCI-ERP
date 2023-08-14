import React, { useState, useEffect } from "react";
import {
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    SimpleGrid,
    Textarea,
    Select,
    Image,
    Checkbox,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import moment from "moment";
import { useLocation, useParams } from "react-router-dom";
import { ApiGet, ApiPost } from "../../../Api/ApiData";
import { handleUploadImage } from "../../../Uploads/upload";
import Error from "../../../Components/Commom/Error";

const Form1 = ({ values, setFieldValue }) => {
    return (
        <>
            <Heading w="100%" textAlign={"center"} fontWeight="400" mb="2%">
                Members's Details
            </Heading>

            <div className="profile_img_block">
                {!values.profilePhoto ? (
                    <img
                        className="profile_img"
                        src={
                            "https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg"
                        }
                        alt="profile"
                    />
                ) : (
                    <img
                        className="profile_img"
                        src={values.profilePhoto}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = 'https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg';
                        }}
                    />
                )}

                <input
                    type={"file"}
                    id="upload"
                    onChange={(event) =>
                        handleUploadImage(event, (value) =>
                            setFieldValue("profilePhoto", value)
                        )
                    }
                    hidden
                ></input>
                <br></br>
                <Button mb={4} color={"Highlight"}>
                    {" "}
                    <label htmlFor="upload"> Upload</label>
                </Button>
            </div>

            <Flex>
                <FormControl mr="5%" className="firstName">
                    <Field name="firstName" style={{ mb: "10px" }}>
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel htmlFor="firstName" fontWeight={"normal"}>
                                    First Name
                                </FormLabel>
                                <Input
                                    type="text"
                                    id="firstName"
                                    placeholder="First Name"
                                    {...field}
                                />

                                <ErrorMessage
                                    name="firstName"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>

                <FormControl mr="5%">
                    <Field name="middleName">
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel htmlFor="middleName" fontWeight={"normal"}>
                                    Middle Name
                                </FormLabel>
                                <Input
                                    type="text"
                                    id="middleName"
                                    placeholder="Middle Name"
                                    {...field}
                                />
                                <ErrorMessage
                                    name="middleName"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>
                <FormControl mr="5%">
                    <Field name="lastName">
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel htmlFor="lastName" fontWeight={"normal"}>
                                    Last Name
                                </FormLabel>
                                <Input
                                    type="text"
                                    id="lastName"
                                    placeholder="Last Name"
                                    {...field}
                                />
                                <ErrorMessage
                                    name="lastName"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>
            </Flex>

            <Flex>
                <FormControl mr="5%">
                    <Field name="phone">
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel htmlFor="phone" fontWeight={"normal"}>
                                    Contect Number
                                </FormLabel>
                                <Input
                                    type="number"
                                    id="phone"
                                    placeholder="Contect Number"
                                    {...field}
                                />
                                <ErrorMessage
                                    name="phone"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>

                <FormControl mr="2%">
                    <Field name="email">
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel htmlFor="email" fontWeight={"normal"}>
                                    Email
                                </FormLabel>
                                <Input type="email" id="email" placeholder="Email" {...field} />
                                <ErrorMessage
                                    name="email"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>
            </Flex>

            <Flex>
                <FormControl mr="5%">
                    <Field name="dob">
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel htmlFor="dob" fontWeight={"normal"}>
                                    Date Of Birth
                                </FormLabel>
                                <Input
                                    type="date"
                                    id="dob"
                                    placeholder="Date Of Birth"
                                    {...field}
                                    value={moment(values?.dob).format('YYYY-MM-DD')}
                                />
                                <ErrorMessage
                                    name="dob"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>

                <FormControl mr="5%">
                    <Field name="whatsappNumber">
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel htmlFor="whatsappNumber" fontWeight={"normal"}>
                                    WhatsApp Number
                                </FormLabel>
                                <Input
                                    type="number"
                                    id="whatsappNumber"
                                    placeholder="WhatsApp Number"
                                    {...field}
                                />
                                <ErrorMessage
                                    name="whatsappNumber"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>
            </Flex>

            <FormControl mt={4} mr="5%" className="radio_btn">
                <Field name="gender">
                    {({ field }) => (
                        <>
                            <FormLabel htmlFor="gender" fontWeight={"normal"}>
                                Gender
                            </FormLabel>
                            <div className="">
                                <Field
                                    type="radio"
                                    id="male"
                                    value="male"
                                    name="gender"
                                // checked={formData.gender === 'male'}
                                />
                                <label htmlFor="male">Male</label>

                                <Field type="radio" id="female" value="female" name="gender" />
                                <label htmlFor="female">Female</label>
                            </div>
                            <ErrorMessage
                                name="gender"
                                render={(msg) => <Error msg={msg} />}
                            />
                        </>
                    )}
                </Field>
            </FormControl>
        </>
    );
};

const Form2 = ({ values, setFieldValue }) => {
    return (
        <>
            <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
                Member's Company Details
            </Heading>
            <Flex>
                <FormControl mr="5%">
                    <Field name="companyName">
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel htmlFor="companyName" fontWeight={"normal"}>
                                    Company Name
                                </FormLabel>
                                <Input
                                    type="text"
                                    id="companyName"
                                    placeholder="Company Name"
                                    {...field}
                                />
                                <ErrorMessage
                                    name="companyName"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>
                <FormControl>
                    <Field name="gst">
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel htmlFor="gst" fontWeight={"normal"}>
                                    GST Number
                                </FormLabel>
                                <Input
                                    type="text"
                                    id="gst"
                                    placeholder=" GST Number"
                                    {...field}
                                />
                                <ErrorMessage
                                    name="gst"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>
            </Flex>
            <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                <Field name="address">
                    {({ field }) => (
                        <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                            <FormLabel htmlFor="address" fontWeight={"normal"}>
                                Company Address
                            </FormLabel>
                            <Textarea id="address" placeholder="Company Address" {...field} />
                            <ErrorMessage
                                name="address"
                                render={(msg) => <Error msg={msg} />}
                            />
                        </FormControl>
                    )}
                </Field>
            </FormControl>

            <Flex mt={4}>
                <FormControl mr="5%">
                    <Field name="city">
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel htmlFor="city" fontWeight={"normal"}>
                                    City
                                </FormLabel>
                                <Input type="text" id="city" placeholder="City" {...field} />
                                <ErrorMessage
                                    name="city"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>
                <FormControl>
                    <Field name="state">
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel htmlFor="state" fontWeight={"normal"}>
                                    State
                                </FormLabel>
                                <Input type="text" id="state" placeholder="State" {...field} />
                                <ErrorMessage
                                    name="state"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>
            </Flex>

            <Flex mt={4}>
                <FormControl mr="5%">
                    <Field name="companyEmail">
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel htmlFor="emailOfCompany" fontWeight={"normal"}>
                                    Email
                                </FormLabel>
                                <Input
                                    type="email"
                                    id="emailOfCompany"
                                    placeholder="Email"
                                    {...field}
                                />
                                <ErrorMessage
                                    name="companyEmail"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>
                <FormControl>
                    <Field name="companyWhatsappNumber">
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel
                                    htmlFor="companyWhatsappNumber"
                                    fontWeight={"normal"}
                                >
                                    WhatsApp Number
                                </FormLabel>
                                <Input
                                    type="number"
                                    id="companyWhatsappNumber"
                                    placeholder="Whatsapp Number"
                                    {...field}
                                />
                                <ErrorMessage
                                    name="companyWhatsappNumber"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>
            </Flex>

            <FormControl as={GridItem} colSpan={[3, 2]}>
                <Field name="website">
                    {({ field }) => (
                        <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                            <FormLabel htmlFor="website" fontWeight={"normal"}>
                                Website
                            </FormLabel>
                            <Input
                                type="tel"
                                id="website"
                                placeholder="www.example.com"
                                focusBorderColor="brand.400"
                                rounded="md"
                                name=""
                                {...field}
                            />
                            <ErrorMessage
                                name="website"
                                render={(msg) => <Error msg={msg} />}
                            />
                        </FormControl>
                    )}
                </Field>
            </FormControl>

            <FormControl mt={1}>
                <Field name="businessDetails">
                    {({ field }) => (
                        <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                            <FormLabel htmlFor="businessDetails" fontWeight={"normal"}>
                                Business Details
                            </FormLabel>
                            <Textarea
                                name="businessDetails"
                                placeholder=" Business Details"
                                rows={3}
                                shadow="sm"
                                focusBorderColor="brand.400"
                                id="businessDetails"
                                {...field}
                                fontSize={{
                                    sm: "sm",
                                }}
                            />

                            <ErrorMessage
                                name="businessDetails"
                                render={(msg) => <Error msg={msg} />}
                            />
                        </FormControl>
                    )}
                </Field>
            </FormControl>

            <FormControl mt={1}>
                <Field name="about">
                    {({ field }) => (
                        <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                            <FormLabel htmlFor="about" fontWeight={"normal"}>
                                About
                            </FormLabel>
                            <Textarea
                                name="about"
                                placeholder="Describe About Company"
                                rows={3}
                                shadow="sm"
                                focusBorderColor="brand.400"
                                id="about"
                                {...field}
                                fontSize={{
                                    sm: "sm",
                                }}
                            />

                            <ErrorMessage
                                name="about"
                                render={(msg) => <Error msg={msg} />}
                            />
                        </FormControl>
                    )}
                </Field>
            </FormControl>

            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                <FormLabel fontWeight={"normal"}>Add Company's Photo</FormLabel>

                <SimpleGrid columns={5} spacing={1} mt={8}>
                    {values?.companyPhoto?.map((singlePhoto) => (
                        <Image
                            boxSize="300px"
                            objectFit="cover"
                            src={singlePhoto}
                            alt="Dan Abramov"
                        />
                    ))}

                    <Box
                        minH={100}
                        minW={100}
                        bg="whitesmoke"
                        margin={"auto"}
                        border={"1px dashed #ddd"}
                        borderRadius={"50%"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        {" "}
                        <label htmlFor="companyPhoto">
                            {" "}
                            <AiOutlinePlus size={"40"} />
                        </label>
                    </Box>
                </SimpleGrid>
            </FormControl>
            <input
                type="file"
                hidden
                id="companyPhoto"
                onChange={(event) =>
                    handleUploadImage(event, (data) =>
                        setFieldValue("companyPhoto", [...values?.companyPhoto, data])
                    )
                }
            ></input>
        </>
    );
};

const Form3 = ({ values, setFieldValue, categories, handleAmountChange }) => {
    console.log(values, 'f3')
    const [amount, setAmount] = useState("");
    const handleStartDateChange = (event, setFieldValue) => {
        const { value } = event.target;
        setFieldValue('startDate', value)
        const newEndDate = new Date(
            new Date(value).getFullYear() + 1,
            new Date(value).getMonth(),
            new Date(value).getDate()
        );
        setFieldValue('endDate', moment(newEndDate).format('YYYY-MM-DD'));
    };

    return (
        <>
            <Heading w="100%" textAlign={"center"} fontWeight="normal">
                Editmember Details
            </Heading>
            <FormControl colSpan={[6, 3]}>
                <Field as="select" name="membershipType">
                    {({ field }) => (
                        <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                            <FormLabel htmlFor="membershipType" fontWeight={"normal"}>
                                Select Membership Type
                            </FormLabel>
                            <Field as={Select} {...field} id="membershipType">
                                <option value="yearly">Yearly</option>
                                <option value="patron">Patron (life time)</option>
                            </Field>

                            <ErrorMessage
                                name="membershipType"
                                render={(msg) => <Error msg={msg} />}
                            />
                        </FormControl>
                    )}
                </Field>
            </FormControl>

            <FormControl>
                <Field name="type">
                    {({ field }) => (
                        <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                            <FormLabel htmlFor="category" fontWeight={"normal"}>
                                Category Add
                            </FormLabel>
                            <Select
                                name="type"
                                className="form-control"
                                onChange={(event) =>
                                    setFieldValue("type", event.target.value)
                                }
                            >
                                <option value="">Select Category</option>
                                {categories?.map((item) => {
                                    return <option selected={item?._id == values?.type?._id} value={item._id}>{item.name}</option>;
                                })}{" "}
                            </Select>

                            <ErrorMessage
                                name="category"
                                render={(msg) => <Error msg={msg} />}
                            />
                        </FormControl>
                    )}
                </Field>
            </FormControl>

            {values?.membershipType == "yearly" && (
                <Flex>
                    <FormControl mr="5%">
                        <Field name="startDate">
                            {({ field }) => (
                                <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                    <FormLabel htmlFor="startDate" fontWeight={"normal"}>
                                        Start Date
                                    </FormLabel>
                                    <Input
                                        type="date"
                                        id="startDate"
                                        value={moment(values?.startDate).format('YYYY-MM-DD')}
                                        onChange={(event) => handleStartDateChange(event, setFieldValue)}
                                    // {...field}
                                    />

                                    <ErrorMessage
                                        name="startDate"
                                        render={(msg) => <Error msg={msg} />}
                                    />
                                </FormControl>
                            )}
                        </Field>
                    </FormControl>
                    <FormControl>
                        <Field name="endDate">
                            {({ field }) => (
                                <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                    <FormLabel htmlFor="endDate" fontWeight={"normal"}>
                                        End Date
                                    </FormLabel>
                                    <Input
                                        type="date"
                                        id="endDate"
                                        disabled
                                        value={moment(values?.endDate).format('YYYY-MM-DD')}
                                    // max='2000-01-01'
                                    // {...field}
                                    />

                                    <ErrorMessage
                                        name="endDate"
                                        render={(msg) => <Error msg={msg} />}
                                    />
                                </FormControl>
                            )}
                        </Field>
                    </FormControl>
                </Flex>
            )}
            <Flex>
                <FormControl mr="5%">
                    <Field name="amount">
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel htmlFor="amount" fontWeight={"normal"}>
                                    Amount
                                </FormLabel>
                                <Input
                                    type="number"
                                    id="amount"
                                    placeholder="Amount"
                                    {...field}
                                />
                                <ErrorMessage
                                    name="amount"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>
                <FormControl>
                    <Field name="pendingAmount">
                        {({ field }) => (
                            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                                <FormLabel htmlFor="pendingAmount" fontWeight={"normal"}>
                                    Pending Amount
                                </FormLabel>
                                <Input
                                    type="number"
                                    id="pendingAmount"
                                    placeholder="Pending Amount"
                                    {...field}
                                />
                                <ErrorMessage
                                    name="pendingAmount"
                                    render={(msg) => <Error msg={msg} />}
                                />
                            </FormControl>
                        )}
                    </Field>
                </FormControl>
            </Flex>

            <FormControl as={GridItem} colSpan={[6, 3]}>
                <label>
                    <Field type="checkbox" name="isSubscribeToBulletin" />
                    Subcrive To Bulletin?
                </label>
                <ErrorMessage
                    name="isSubscribeToBulletin"
                    render={(msg) => <Error msg={msg} />}
                />
            </FormControl>
        </>
    );
};

export default function Editmember() {
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(33.33);
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({})
    const { id } = useParams()

    const handleSubmit = (values, resetForm) => {
        ApiPost("/admin/member/edit", values)
            .then((response) => {
                toast.success(response?.data?.message);
            })
            .catch((error) => toast.error(error.message));
    };

    const fetchCategory = async () => {
        await ApiPost("/admin/member/edit", { search: "" }).then(
            (response) => {
                console.log("category res", response?.data);
                setCategories(response?.data?.data);
            }
        );
    };

    const getMemberById = () => {
        ApiGet(`/admin/member/${id}`).then((response) => setData(response?.data?.data)).catch((error) => toast.error(error.message))
    }

    useEffect(() => {
        fetchCategory();
        getMemberById()
    }, []);
    return (
        <>
            <Formik
                initialValues={data}
                enableReinitialize
                // validationSchema={SignupSchema}
                onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        {console.log("?>?>?>??>?", values)}
                        <Box
                            borderWidth="1px"
                            rounded="lg"
                            shadow="1px 1px 3px rgba(0,0,0,0.3)"
                            maxWidth={800}
                            p={6}
                            m="10px auto"
                        >
                            {step === 1 ? (
                                <Form1 setFieldValue={setFieldValue} values={values} />
                            ) : step === 2 ? (
                                <Form2 setFieldValue={setFieldValue} values={values} />
                            ) : (
                                <Form3
                                    setFieldValue={setFieldValue}
                                    values={values}
                                    categories={categories}
                                />
                            )}
                            <ButtonGroup mt="5%" w="100%">
                                <Flex w="100%" justifyContent="space-between">
                                    <Flex>
                                        <Button
                                            onClick={() => {
                                                setStep(step - 1);
                                                setProgress(progress - 33.33);
                                            }}
                                            isDisabled={step === 1}
                                            colorScheme="teal"
                                            variant="solid"
                                            w="7rem"
                                            mr="5%"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            w="7rem"
                                            isDisabled={step === 3}
                                            onClick={() => {
                                                setStep(step + 1);
                                                if (step === 3) {
                                                    setProgress(100);
                                                } else {
                                                    setProgress(progress + 33.33);
                                                }
                                            }}
                                            colorScheme="teal"
                                            variant="outline"
                                        >
                                            Next
                                        </Button>
                                    </Flex>

                                    {step === 3 ? (
                                        <Button
                                            w="7rem"
                                            colorScheme="red"
                                            variant="solid"
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    ) : null}
                                </Flex>
                            </ButtonGroup>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    );
}
