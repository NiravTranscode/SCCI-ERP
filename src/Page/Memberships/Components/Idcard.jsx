import React, { useRef } from 'react';
import '../../../css/Idcard.css';
import logo from '../../../Assest/images/sccilogo.png';
import { AiOutlineDownload } from 'react-icons/ai';
import { Button } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Idcard({ details }) {
    const mainCardRef = useRef(null);
    const name2CardRef = useRef(null);
    const downloadCard = () => {
        const pdf = new jsPDF('p', 'px', 'a4');
        html2canvas(mainCardRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 13, 20, 210, 130);
            if (name2CardRef.current) {
                html2canvas(name2CardRef.current).then((canvas2) => {
                    const imgData2 = canvas2.toDataURL('image/png');
                    pdf.addImage(imgData2, 'PNG', 230, 20, 205, 130);
                    pdf.save('id_card.pdf');
                });
            } else {
                pdf.save('id_card.pdf');
            }
        });
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div ref={mainCardRef} className="main_card">
                <div className="sub_card">
                    <div className="card_img">
                        <img className="logo_img" src={logo} alt="" />
                        {details?.profilePhoto && <img className="people_card" src={details.profilePhoto} alt="" />}
                    </div>
                    <div className="main_text">
                        <div className="card_text">
                            <h6 className="card_in_1"><b>SAURASHTRA CHAMBER OF COMMERCE & INDUSTRY</b></h6>
                            <h6 className="card_in_2">STATUS:<span className="text_color">MEMBER</span></h6>
                            <h6 className="card_in_3"><b> FINANCIAL YEAR:2023-24</b></h6>
                        </div>
                        <div className="card_text_1">
                            <h6 className="card_in_4">SHRI {details?.name?.toUpperCase()}</h6>
                            <div>
                                <h6 className="card_in_5">
                                    {details?.address}
                                </h6>
                            </div>
                            <div className="people_sign">
                                <h6 className="sign_text">PRESIDENT</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {details?.name2 && (
                <div ref={name2CardRef} className="main_card">
                    <div className="sub_card">
                        <div className="card_img">
                            <img className="logo_img" src={logo} alt="" />
                            {details?.profilePhoto2 && <img className="people_card" src={details.profilePhoto2} alt="" />}
                        </div>
                        <div className="main_text">
                            <div className="card_text">
                                <h6 className="card_in_1"><b>SAURASHTRA CHAMBER OF COMMERCE & INDUSTRY</b></h6>
                                <h6 className="card_in_2">STATUS:<span className="text_color">MEMBER</span></h6>
                                <h6 className="card_in_3"><b> FINANCIAL YEAR:2023-24</b></h6>
                            </div>
                            <div className="card_text_1">
                                <h6 className="card_in_4">SHRI {details?.name2?.toUpperCase()}</h6>
                                <div>
                                    <h6 className="card_in_5">
                                        {details?.address}
                                    </h6>
                                </div>
                                <div className="people_sign">
                                    <h6 className="sign_text">PRESIDENT</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <Button onClick={downloadCard}>Download &nbsp;<AiOutlineDownload /></Button>
            </div>
        </div>
    );
}

export default Idcard;


