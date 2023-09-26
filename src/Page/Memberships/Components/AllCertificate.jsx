import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../../Assest/images/sccilogo.png';
import ribbun from '../../../Assest/images/img-2.png';
import '../../../css/certificate.css';

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function AllCertificate({ details }) {
    const [data, setData] = useState([]);
    const [isPDF, setIsPDF] = useState(false);
    const handleDownload = async () => {
        setIsPDF(true);
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4',
        });

        for (const memberGroup of data) {
            const content = document.querySelector(`#pdf_block-${memberGroup[0]?._id}`);
            content.style.width = "1900px"; // a4 width in pixels
            content.style.height = "1060px"; // a4 height in pixels

            try {
                const canvasWidth = content.offsetWidth + 10;
                const canvasHeight = content.offsetHeight + 10;

                const canvas = await html2canvas(content, {
                    scrollX: 0,
                    scrollY: 0,
                    width: canvasWidth,
                    height: canvasHeight,
                });

                const imgData = canvas.toDataURL('image/jpeg');
                pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
                pdf.addPage();
            } catch (error) {
                console.error('Error generating PDF:', error);
            }
        }

        pdf.deletePage(pdf.internal.getNumberOfPages());
        pdf.save('all_certificates.pdf');
        setIsPDF(false);
    };

    useEffect(() => {
        const newArr = [];
        const tempArr = [...details];
        while (tempArr.length) newArr.push(tempArr.splice(0, 4));
        setData(newArr);
    }, [details]);
    return (
        <>
            <div style={{ position: 'absolute', left: '-9999px', bottom: 0 }}>
                {data.map((group) => (
                    <ul className="pdf_block" id={`pdf_block-${group[0]?._id}`} key={group[0]?._id}>
                        {group.map((member) => (
                            <li key={member._id} id={`card2-${member._id}`}>
                                <div className="main_bg">
                                    <div className="back_img" id={`card2-${member._id}`}>
                                        <div className="text_div">
                                            <h3 id="demo4">SAURASHTRA CHAMBER OF COMMERCE & INDUSTRY</h3>
                                            <img className="logo" src={logo} alt="" />
                                            <p className="logo_text1">ESTO 1943</p>
                                            <h4 className="logo_text2">BHAVNAGAR</h4>
                                            <div className="ribbon_img">
                                                <img src={ribbun} alt="" />
                                            </div>
                                            <p className="ribbon_text">This is to certify that</p>
                                            <br />
                                            <div className="form">
                                                <label id="fname" htmlFor="fname">M/s. / Shri</label>
                                                <input type="text" id="fname" name="fname" value={member?.name} readOnly style={{
                                                    fontFamily: 'sans-serif',
                                                    fontSize: '22px'
                                                }} />
                                            </div>
                                            <p className="member_text">
                                                is a Member of this Organization for The Year<br />
                                                {formatDate(member?.startDate)} to {formatDate(member?.endDate)}
                                            </p>
                                            <div className="sign sign_main">
                                                <div className="sign_div1">
                                                    <span></span>
                                                    <p className="sign_text">Hon.Secretary</p>
                                                </div>
                                                <div>
                                                    <span></span>
                                                    <p className="sign_text">President</p>
                                                </div>
                                                <div>
                                                    <span></span>
                                                    <p className="sign_text">Hon.Secretary</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
            <div>
                <Button onClick={handleDownload} disabled={isPDF}>
                    {isPDF ? 'Generating PDF...' : 'Download All Certificate'}
                </Button>
            </div>
        </>
    );
}

export default AllCertificate;


