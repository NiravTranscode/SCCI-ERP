import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import Revenuecard from '../../Components/Commom/Revenuecard';
import { ImStatsBars } from "react-icons/im";
import { ApiGet, ApiPost } from '../../Api/ApiData';
import AllIdcard from '../Memberships/Components/AllIdcard';
import AllCertificate from '../Memberships/Components/AllCertificate';
import '../../css/certificate.css';
import AllYearlyData from '../Memberships/Components/AllYearlyData';
import AlldataIdcard from '../Memberships/Components/AlldataIdcard';
import AllPetronData from '../Memberships/Components/AllPetronData';
import UserData from '../Memberships/Components/UserData';

function Dashboard() {
  const [data, setData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [petronData, setPetronData] = useState([]);
  const [details, setDetails] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const getDashboardDate = () => {
    ApiGet('/admin/get/dashboard').then((response) => setData([
      {
        title: "Membership Amount",
        amount: response?.data?.data?.totalTransaction?.totalAmount,
        icon: <ImStatsBars height={'100%'} width={'100%'} />,
        bg: "#EA6A47"
      },
      {
        title: "Pending Amount",
        amount: response?.data?.data?.totalTransaction?.totalpendingAmount,
        icon: <ImStatsBars />,
        bg: "#A5D8DD"
      },
      {
        title: "Total Member",
        amount: response?.data?.data?.members,
        icon: <ImStatsBars />,
        bg: "#0091D5"
      }
    ]));
  }
  const getAllMembers = async () => {
    try {
      const response = await ApiPost('/admin/member/get/all?exports=true', {
        page,
        limit,
        search,
      });
      setDetails(response?.data?.data);
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  };
  const getPetronMembers = async () => {
    try {
      const response = await ApiPost('/admin/member/get/all?exports=true', {
        page,
        limit,
        search,
        membershipTypeFilter: "petron"
      });
      setPetronData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  };

  const getYearlyMembers = async () => {
    try {
      const response = await ApiPost('/admin/member/get/all?exports=true', {
        page,
        limit,
        search,
        membershipTypeFilter: "yearly"
      });
      setYearlyData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  };

  useEffect(() => {
    getDashboardDate();
    getYearlyMembers();
    getPetronMembers()
  }, []);

  useEffect(() => {
    getAllMembers();
  }, [page, limit]);
  return (
    <div style={{ marginTop: "65px" }}>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
      >
        <SimpleGrid columns={[1, 1, 1, 2, 2, 3, 3]} spacing='40px'>
          {data?.map((singleDate) => <Revenuecard key={singleDate.title} data={singleDate} />)}
        </SimpleGrid>
      </Box>
      <AllIdcard details={details} />
      <AllCertificate details={details} />
      <AllPetronData details={petronData} />
      <AllYearlyData details={yearlyData} />
      <AlldataIdcard petronData={petronData} yearlyData={yearlyData} />
      <UserData details={details} />
    </div>
  );
}
export default Dashboard;

