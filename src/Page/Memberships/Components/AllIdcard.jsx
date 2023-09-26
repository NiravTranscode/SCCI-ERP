import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../../Assest/images/sccilogo.png';

function AllIdcard({ details }) {
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const downloadAllIdcardsPDF = async () => {
        setIsGeneratingPDF(true);
        const pdf = new jsPDF('p', 'mm', 'a4');
        for (const member of details) {
            const cardContainer = document.getElementById(`card-${member._id}`);
            const canvasWidth = cardContainer.offsetWidth + 10;
            const canvasHeight = cardContainer.offsetHeight + 10;
            const canvas = await html2canvas(cardContainer, { width: canvasWidth, height: canvasHeight });
            const pdfWidth = canvasWidth * 0.335583;
            const pdfHeight = canvasHeight * 0.335583;
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.addPage();
        }
        pdf.deletePage(pdf.internal.getNumberOfPages());
        pdf.save('all_idcards.pdf');
        setIsGeneratingPDF(false);
    };
    return (
        <div>
            <div style={{ position: 'absolute', left: '-9999px', bottom: 0 }}>
                {details?.map((member) => (
                    <div key={member._id} id={`card-${member._id}`} className="card-container">
                        <div className="main_card">
                            <div className="sub_card">
                                <div className="card_img">
                                    <img className="logo_img" src={logo} alt="" />
                                    <img className="people_card" src={member?.profilePhoto} alt="" />
                                </div>
                                <div className="main_text">
                                    <div className="card_text">
                                        <h6 className="card_in_1"><b>SAURASHTRA CHAMBER OF COMMERCE & INDUSTRY</b></h6>
                                        <h6 className="card_in_2">STATUS:<span className="text_color">MEMBER</span></h6>
                                        <h6 className="card_in_3"><b> FINANCIAL YEAR:2023-24</b></h6>
                                    </div>
                                    <div className="card_text_1">
                                        <h6 className="card_in_4">SHRI {member?.name} {member?.name2}</h6>
                                        <div>
                                            <h6 className="card_in_5">
                                                {member?.phone}
                                            </h6>
                                        </div>
                                        <div className="people_sign">
                                            <h6 className="sign_text">PRESIDENT</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <Button onClick={downloadAllIdcardsPDF} disabled={isGeneratingPDF}>
                    {isGeneratingPDF ? 'Generating PDF...' : 'Download All IDCards'}
                </Button>
            </div>
        </div>
    );
}

export default AllIdcard;






