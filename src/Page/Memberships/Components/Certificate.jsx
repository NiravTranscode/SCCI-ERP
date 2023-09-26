import React from 'react';
import '../../../css/certificate.css';
import logo from '../../../Assest/images/sccilogo.png';
import ribbun from '../../../Assest/images/ribbon_img.png';
import { Box, Button } from '@chakra-ui/react';
import { AiOutlineDownload } from 'react-icons/ai';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Certificate({ details }) {
    const handleDownload = async () => {
        const content = document.querySelector('.back_img');
        try {
            const canvas = await html2canvas(content, {
                scrollX: 0,
                scrollY: 0,
            });
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4',
            });
            const imgData = canvas.toDataURL('image/jpeg');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('certificate.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    return (
        <>
        <div className="main_bg">
            <div className="back_img">
                <div class="text_div">
                    <h3 id="demo4">SAURASHTRA CHAMBER OF COMMERCE & INDUSTRY</h3>
                    <img class="logo" src={logo} alt="" />
                    <p class="logo_text1">ESTO 1943</p>
                    <h4 class="logo_text2">BHAVNAGAR</h4>
                    <div class="ribbon_img">
                        <img src={ribbun} alt="" />
                        <span>MEMBERSHIP CERTIFICATE</span>
                    </div>
                    <p class="ribbon_text">This is to certify that</p>
                    <div class="form">
                        <label id="fname" for="fname">M/s. / Shri</label>
                        <input type="text" id="fname" name="fname" value={details?.firstName + details?.middleName + details?.lastName} />
                    </div>
                    <p class="member_text">is Member of this Organisation for The Year<br />
                        1st April 2021 to 31st March 2022
                    </p>
                    <div class="sign sign_main">
                        <div class="sign_div1">
                            <span></span>
                            <p class="sign_text">Hon.Secretary</p>
                        </div>
                        <div>
                            <span></span>
                            <p class="sign_text">President</p>
                        </div>
                        <div>
                            <span></span>
                            <p class="sign_text">Hon.Secretary</p>
                        </div>
                    </div>
                </div>
            </div>
            <Box textAlign={'center'} py={4}>
                <Button onClick={handleDownload}>Download  &nbsp;<AiOutlineDownload /></Button>
            </Box>
        </div>
        </>
    );
}

export default Certificate;
