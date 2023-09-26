import React, { useState, useEffect } from "react";
import { initialValues } from "./initialvalue";
import { useDispatch } from "react-redux";
import { addUser } from "../../Reducers/authReducer";
import { useSelector } from "react-redux";
import { addFormData } from "../../Reducers/addScci";
import { ApiPost } from "../../Api/ApiData";
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
import { handleUploadImage } from "../../Uploads/upload";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Error from "../../Components/Commom/Error";
import { toast } from "react-toastify";

const Form1 = ({ values, setFieldValue }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUploadImage = (event, callback) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const image = e.target.result;
        callback(image);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (fieldName) => {
    setFieldValue(fieldName, null);
  };

  const handleEditImage = () => {
    setIsEditing(true);
  };

  const handleSaveImage = (fieldName) => {
    setIsEditing(false);
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="400" mb="2%">
        Members's Details
      </Heading>

      <div className="d-flex justify-content-center">
        <div className="profile_img_block mx-2">
          {!values.profilePhoto ? (
            <img
              className="profile_img"
              src={
                "https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg"
              }
              alt="profile"
            />
          ) : (
            <div className="profile_img_container">
              <img
                className="profile_img"
                src={values.profilePhoto}
                alt="profile"
              />
              <div className="image_actions">
                <button onClick={() => handleDeleteImage("profilePhoto")}>
                  Delete
                </button>
                <button>Edit</button>
              </div>
            </div>
          )}

          <input
            type="file"
            id="upload1"
            onChange={(event) =>
              handleUploadImage(event, (value) =>
                setFieldValue("profilePhoto", value)
              )
            }
            hidden
          />
          <br />
          <Button mb={4} color={"Highlight"}>
            <label htmlFor="upload1">Upload</label>
          </Button>
        </div>
        <div className="profile_img_block mx-2">
          {!values.profilePhoto2 ? (
            <img
              className="profile_img"
              src={
                "https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg"
              }
              alt="profile"
            />
          ) : (
            <div className="profile_img_container">
              <img
                className="profile_img"
                src={values.profilePhoto2}
                alt="profile"
              />
              <div className="image_actions">
                <button onClick={() => handleDeleteImage("profilePhoto2")}>
                  Delete
                </button>
                <button>Edit</button>
              </div>
            </div>
          )}

          <input
            type="file"
            id="upload2"
            onChange={(event) =>
              handleUploadImage(event, (value) =>
                setFieldValue("profilePhoto2", value)
              )
            }
            hidden
          />
          <br />
          <Button mb={4} color={"Highlight"}>
            <label htmlFor="upload2">Upload</label>
          </Button>
        </div>
      </div>
      <h3>FIRST USER</h3>
      <FormControl mr="5%" className="firstName">
        <Field name="name">
          {({ field }) => (
            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
              <FormLabel htmlFor="name" fontWeight={"normal"}>
                Name
              </FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder=" Name"
                {...field}
              />
              <ErrorMessage name="name" render={(msg) => <Error msg={msg} />} />
            </FormControl>
          )}
        </Field>
      </FormControl>
      <FormControl mr="5%">
        <Field name="phone">
          {({ field }) => (
            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
              <FormLabel htmlFor="phone" fontWeight={"normal"}>
                Contact Number
              </FormLabel>
              <Input
                type="number"
                id="phone"
                name="phone"
                placeholder="Contact Number"
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
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                {...field}
              />
              <ErrorMessage
                name="email"
                render={(msg) => <Error msg={msg} />}
              />
            </FormControl>
          )}
        </Field>
      </FormControl>
      <FormControl mt={4} mr="5%" className="radio_btn">
        <Field name="gender">
          {({ field }) => (
            <>
              <FormLabel htmlFor="gender" fontWeight={"normal"}>
                Gender
              </FormLabel>
              <div className="">
                <Field type="radio" id="male1" value="male" name="gender" />
                <label htmlFor="male1">Male</label>

                <Field type="radio" id="female1" value="female" name="gender" />
                <label htmlFor="female1">Female</label>
              </div>
              <ErrorMessage
                name="gender"
                render={(msg) => <Error msg={msg} />}
              />
            </>
          )}
        </Field>
      </FormControl>
      <h3 className="mt-3">SECOND USER</h3>
      <FormControl mr="5%" className="firstName">
        <Field name="name2">
          {({ field }) => (
            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
              <FormLabel htmlFor="name2" fontWeight={"normal"}>
                Name
              </FormLabel>
              <Input
                type="text"
                id="name2"
                name="name2"
                placeholder=" Name"
                {...field}
              />
              <ErrorMessage
                name="name2"
                render={(msg) => <Error msg={msg} />}
              />
            </FormControl>
          )}
        </Field>
      </FormControl>
      <FormControl mr="5%">
        <Field name="phone2">
          {({ field }) => (
            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
              <FormLabel htmlFor="phone2" fontWeight={"normal"}>
                Contact Number
              </FormLabel>
              <Input
                type="number"
                id="phone2"
                name="phone2"
                placeholder="Contact Number"
                {...field}
              />
              <ErrorMessage
                name="phone2"
                render={(msg) => <Error msg={msg} />}
              />
            </FormControl>
          )}
        </Field>
      </FormControl>
      <FormControl mr="2%">
        <Field name="email2">
          {({ field }) => (
            <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
              <FormLabel htmlFor="email2" fontWeight={"normal"}>
                Email
              </FormLabel>
              <Input
                type="email"
                id="email2"
                name="email2"
                placeholder="Email"
                {...field}
              />
              <ErrorMessage
                name="email2"
                render={(msg) => <Error msg={msg} />}
              />
            </FormControl>
          )}
        </Field>
      </FormControl>
      <FormControl mt={4} mr="5%" className="radio_btn">
        <Field name="user2.gender">
          {({ field }) => (
            <>
              <FormLabel htmlFor="gender2" fontWeight={"normal"}>
                Gender
              </FormLabel>
              <div className="">
                <Field type="radio" id="male1" value="male" name="gender2" />
                <label htmlFor="male1">Male</label>

                <Field
                  type="radio"
                  id="female1"
                  value="female"
                  name="gender2"
                />
                <label htmlFor="female1">Female</label>
              </div>
              <ErrorMessage
                name="gender2"
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
      <Field
        name="address"
        validate={(value) => {
          if (!value) {
            return "Company Address is required";
          }
          const wordCount = value.split(/\s+/).length;
          if (wordCount < 30) {
            return "Company Address cannot exceed 30 words";
          }
        }}
      >
        {({ field }) => (
          <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
            <FormLabel htmlFor="address" fontWeight={"normal"}>
              Company Address
            </FormLabel>
            <Textarea
              id="address"
              placeholder="Company Address"
              {...field}
              onInput={(e) => {
                const wordCount = e.target.value.split(/\s+/).length;
                if (wordCount > 30) {
                  e.target.setCustomValidity("Company Address cannot exceed 30 words");
                } else {
                  e.target.setCustomValidity("");
                }
              }}
            />
            <ErrorMessage name="address" render={(msg) => <Error msg={msg} />} />
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
    </>
  );
};

const Form3 = ({ values, setFieldValue, categories, handleChange }) => {
  const [startDate, setStartDate] = useState({ firstDate: "", endDate: "" });
  const [entryDate, setEntryDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [amount, setAmount] = useState(0);
  const [paytmParams, setPaytmParams] = useState(null);
  const [memberBulletingFees, setMemberBulletingFees] = useState("");
  const [admissionFees, setAdmissionFees] = useState("");
  const [membershipSubscripationFees, setMembershipSubscripationFees] =
    useState("");
  const [otherAmount, setOtherAmount] = useState("");
  const [petronFees, setPetronFees] = useState("");
  const [petronBulletinFees, setPetronBulletinFees] = useState("");
  const [gstAmount, setGstAmount] = useState("");

  useEffect(() => {
    const calculateSum = () => {
      const num1 = parseFloat(values.memberBulletingFees) || 0;
      const num2 = parseFloat(values.membershipSubscripationFees) || 0;
      const num3 = parseFloat(values.gstAmount) || 0;
      const num4 = parseFloat(values.admissionFees) || 0;
      const num5 = parseFloat(values.otherAmount) || 0;
      const num6 = parseFloat(values.petronFees) || 0;
      const num7 = parseFloat(values.petronBulletinFees) || 0;
      const sum = num1 + num2 + num3 + num4 + num5 + num6 + num7;
      setAmount(sum);
      console.log("sum", amount);
    };

    calculateSum();
  }, [values]);
  const handleFirstDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    let lastYear = year;
    let lastMonth = 2;

    if (month >= 2) {
      lastYear += 1;
    }

    const endDate = new Date(lastYear, lastMonth, 31);
    const updatedDateRange = {
      ...startDate,
      firstDate: e.target.value,
      endDate: endDate.toISOString().split("T")[0],
    };

    setFieldValue("endDate", endDate);
    setFieldValue("startDate", selectedDate)
    setStartDate(updatedDateRange);

    calculateTotalDays(updatedDateRange);
  };

  const handleEntryDateChange = (e) => {
    const selectedDate = e.target.value;
    setEntryDate(selectedDate);
  }

  const calculateTotalDays = (startDate) => {
    const start = new Date(startDate.firstDate);
    const end = new Date(startDate.endDate);
    const totalDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
    setTotalDays(totalDays);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const start = new Date(values.startDate.firstDate);
    const end = new Date(values.startDate.endDate);
    const calculatedEndDate = new Date(values.startDate.endDate);
    calculatedEndDate.setDate(start.getDate() + totalDays); // Assuming totalDays is a valid variable

    console.log("Start Date:", start.toISOString().split("T")[0]);
    console.log("Calculated End Date:", calculatedEndDate.toISOString().split("T")[0]);
    console.log("Total Days:", totalDays);
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Memberships Details
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
                <option value="petron">Patron (life time)</option>
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
                name="category"
                className="form-control"
                onChange={(event) =>
                  setFieldValue("type", event.target.value)
                }
              >
                <option value="">Select Category</option>
                {categories?.map((item) => {
                  return <option value={item._id}>{item.name}</option>;
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

      {values?.membershipType == "petron" && (
        <FormControl mr="5%">
          <Field name="entryDate">
            {({ field }) => (
              <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                <FormLabel htmlFor="startDate" fontWeight={"normal"}>
                  Entry Date
                </FormLabel>
                <Input
                  type="date"
                  id="entryDate"
                  value={entryDate}
                  onChange={handleEntryDateChange}
                />
                <ErrorMessage
                  name="entryDate"
                  render={(msg) => <Error msg={msg} />}
                />
              </FormControl>
            )}
          </Field>
        </FormControl>
      )}

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
                    value={values.startDate.firstDate}
                    onChange={handleFirstDateChange}
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
                    name="endDate"
                    value={startDate.endDate}
                    disabled
                  />
                  <div>
                    <label>Total Days</label>
                    <input type="text" value={totalDays} disabled />
                  </div>
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
      {values?.membershipType == "yearly" && (
        <Flex>
          <FormControl mr="5%">
            <Field name="admissionFees">
              {({ field }) => (
                <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                  <FormLabel
                    htmlFor="admissionFees"
                    fontWeight={"normal"}
                  >
                    Admission Fees
                  </FormLabel>
                  <Input
                    type="number"
                    id="admissionFees"
                    placeholder="Admission Fees"
                    name="admissionFees"
                    value={admissionFees}
                    onChange={handleChange}
                    {...field}
                  />
                  <ErrorMessage
                    name="admissionFees"
                    render={(msg) => <Error msg={msg} />}
                  />
                </FormControl>
              )}
            </Field>
          </FormControl>
          <FormControl mr="5%">
            <Field name="memberBulletingFees">
              {({ field }) => (
                <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                  <FormLabel htmlFor="memberBulletingFees" fontWeight={"normal"}>
                    Member Bulleting Fees
                  </FormLabel>
                  <Input
                    type="number"
                    id="memberBulletingFees"
                    name="memberBulletingFees"
                    placeholder="Member Bulleting Fees"
                    value={memberBulletingFees}
                    onChange={handleChange}
                    {...field}
                  />
                  <ErrorMessage
                    name="memberBulletingFees"
                    render={(msg) => <Error msg={msg} />}
                  />
                </FormControl>
              )}
            </Field>
          </FormControl>
          <FormControl mr="5%">
            <Field name="membershipSubscripationFees">
              {({ field }) => (
                <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                  <FormLabel
                    htmlFor="membershipSubscripationFees"
                    fontWeight={"normal"}
                  >
                    Membership Subscripation Fees
                  </FormLabel>
                  <Input
                    type="number"
                    id="membershipSubscripationFees"
                    placeholder="Membership Subscripation Fees "
                    name="membershipSubscripationFees"
                    value={membershipSubscripationFees}
                    onChange={handleChange}
                    {...field}
                  />
                  <ErrorMessage
                    name="membershipSubscripationFees"
                    render={(msg) => <Error msg={msg} />}
                  />
                </FormControl>
              )}
            </Field>
          </FormControl>
          <FormControl mr="5%">
            <Field name="otherAmount">
              {({ field }) => (
                <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                  <FormLabel htmlFor="otherAmount" fontWeight={"normal"}>
                    Other Amount
                  </FormLabel>
                  <Input
                    type="number"
                    id="otherAmount"
                    name="otherAmount"
                    placeholder="Other Amount"
                    value={otherAmount}
                    onChange={handleChange}
                    {...field}
                  />
                  <ErrorMessage
                    name="otherAmount"
                    render={(msg) => <Error msg={msg} />}
                  />
                </FormControl>
              )}
            </Field>
          </FormControl>
          <FormControl>
            <Field name="gstAmount">
              {({ field }) => (
                <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                  <FormLabel htmlFor="gstAmount" fontWeight={"normal"}>
                    GST Amount
                  </FormLabel>
                  <Input
                    type="number"
                    id="gstAmount"
                    name="gstAmount"
                    placeholder="GST Amount "
                    value={gstAmount}
                    onChange={handleChange}
                    {...field}
                  />

                  <ErrorMessage
                    name="gstAmount"
                    render={(msg) => <Error msg={msg} />}
                  />
                </FormControl>
              )}
            </Field>
          </FormControl>
        </Flex>
      )}
      {values?.membershipType == "petron" && (
        <Flex>
          <FormControl mr="5%">
            <Field name="admissionFees">
              {({ field }) => (
                <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                  <FormLabel
                    htmlFor="admissionFees"
                    fontWeight={"normal"}
                  >
                    admission Fees
                  </FormLabel>
                  <Input
                    type="number"
                    id="admissionFees"
                    placeholder="Admission Fees"
                    name="admissionFees"
                    value={admissionFees}
                    onChange={handleChange}
                    {...field}
                  />
                  <ErrorMessage
                    name="admissionFees"
                    render={(msg) => <Error msg={msg} />}
                  />
                </FormControl>
              )}
            </Field>
          </FormControl>
          <FormControl mr="5%">
            <Field name="petronFees">
              {({ field }) => (
                <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                  <FormLabel htmlFor="petronFees" fontWeight={"normal"}>
                    Petron Fees
                  </FormLabel>
                  <Input
                    type="number"
                    id="petronFees"
                    name="petronFees"
                    placeholder="Petron Fees"
                    value={petronFees}
                    onChange={handleChange}
                    {...field}
                  />
                  <ErrorMessage
                    name="petronFees"
                    render={(msg) => <Error msg={msg} />}
                  />
                </FormControl>
              )}
            </Field>
          </FormControl>
          <FormControl mr="5%">
            <Field name="petronBulletinFees">
              {({ field }) => (
                <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                  <FormLabel
                    htmlFor="petronBulletinFees"
                    fontWeight={"normal"}
                  >
                    Petron Bulletin Fees
                  </FormLabel>
                  <Input
                    type="number"
                    id="petronBulletinFees"
                    placeholder="Petron Bulletin Fees"
                    name="petronBulletinFees"
                    value={petronBulletinFees}
                    onChange={handleChange}
                    {...field}
                  />
                  <ErrorMessage
                    name="petronBulletinFees"
                    render={(msg) => <Error msg={msg} />}
                  />
                </FormControl>
              )}
            </Field>
          </FormControl>
          <FormControl mr="5%">
            <Field name="otherAmount">
              {({ field }) => (
                <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                  <FormLabel htmlFor="otherAmount" fontWeight={"normal"}>
                    Other Amount
                  </FormLabel>
                  <Input
                    type="number"
                    id="otherAmount"
                    name="otherAmount"
                    placeholder="Other Amount"
                    value={otherAmount}
                    onChange={handleChange}
                    {...field}
                  />
                  <ErrorMessage
                    name="otherAmount"
                    render={(msg) => <Error msg={msg} />}
                  />
                </FormControl>
              )}
            </Field>
          </FormControl>
          <FormControl>
            <Field name="gstAmount">
              {({ field }) => (
                <FormControl style={{ marginTop: 10, marginBottom: 12 }}>
                  <FormLabel htmlFor="gstAmount" fontWeight={"normal"}>
                    GST Amount
                  </FormLabel>
                  <Input
                    type="number"
                    id="gstAmount"
                    name="gstAmount"
                    placeholder="GST Amount "
                    value={gstAmount}
                    onChange={handleChange}
                    {...field}
                  />

                  <ErrorMessage
                    name="gstAmount"
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
                  Total Amout
                </FormLabel>
                <Input
                  type="number"
                  id="amount"
                  placeholder="Total Amout"
                  name="amount"
                  value={amount}
                  readOnly
                  onChange={(event) => {
                    setAmount(event?.target?.value);
                    setFieldValue("pendingAmount", event?.target?.value);
                    setFieldValue("amount", event?.target?.value);
                  }}
                />
                <ErrorMessage
                  name="amount"
                  render={(msg) => <Error msg={msg} />}
                />
              </FormControl>
            )}
          </Field>
        </FormControl>
      </Flex>

      {values?.membershipType == "petron" && (
        <FormControl as={GridItem} colSpan={[6, 3]}>
          <Field as="Checkbox" name="isSubscribeToBulletin">
            {({ field }) => (
              <>
                <Checkbox {...field} colorScheme="green">
                  isSubscribeToBulletin
                </Checkbox>

                <ErrorMessage
                  name="isSubscribeToBulletin"
                  render={(msg) => <Error msg={msg} />}
                />
              </>
            )}
          </Field>
        </FormControl>
      )}
    </>
  );
};

export default function Memberships({ data }) {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [categories, setCategories] = useState([]);

  const handleSubmit = (values, resetForm) => {
    ApiPost("/admin/member/add", values)
      .then((response) => {
        console.log("***********", response.data);

        toast.success("Member Added Successfully");
        resetForm({
          values: initialValues,
        });
      })
      .catch((error) => toast.error(error.message));
  };

  const fetchCategory = async () => {
    await ApiPost("/admin/member/type/get/all", { search: "" }).then(
      (response) => {
        console.log("category res", response?.data);
        setCategories(response?.data?.data);
      }
    );
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <>
      <Formik
        initialValues={initialValues}
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
