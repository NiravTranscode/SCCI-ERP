import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../../../css/certificate.css';
import { useEffect } from 'react';

const AllPetronData = ({ details }) => {
    const [datas, setData] = useState([]);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const downloadAllIdcardsPDF = async () => {
        setIsGeneratingPDF(true);
        const pdf = new jsPDF('p', 'mm', 'a4');
        for (const data of datas) {
            const cardContainer = document.getElementById(`datas-${data[0]._id}`);
            const canvas = await html2canvas(cardContainer);
            const pdfWidth = 210;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.setFontSize(20);
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.addPage();
        }
        pdf.deletePage(pdf.internal.getNumberOfPages());
        pdf.save('all_idcards.pdf');
        setIsGeneratingPDF(false);
    };

    useEffect(() => {
        const newArr = [];
        const tempArr = [...details];
        while (tempArr.length) newArr.push(tempArr.splice(0, 4));
        setData(newArr);
    }, [details]);

    return (
        <div id='card_datas'>
            <div style={{ position: 'absolute', left: '-9999px', bottom: 0 }}>
                {datas.map((post) => (
                    <div key={post._id} id={`datas-${post[0]._id}`} className="card-container px-3 pt-5">
                        <h2>Group: {post[0].membershipType}</h2>
                        <br />
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Address, Name, City, State</th>
                                    <th>Phone</th>
                                    <th>Business Details, Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {post.map((member, index) => (
                                    <tr key={index}>
                                        <td>{member?.userId.split("_")[1]}</td>
                                        <td>
                                            {member.address}<br />
                                            {member.city}, {member.state}
                                        </td>
                                        <td>{member?.companyWhatsappNumber ? member.companyWhatsappNumber + "(B)" : ""}<br />{member?.phone ? member?.phone + "(F)" : ""}<br />{member?.phone2 ? member?.phone2 + "(S)" : ""}</td>
                                        <td>
                                            {member.name}<br />
                                            {member.name2}<br />
                                            {member.businessDetails}<br />
                                            {member.email}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
            <div>
                <Button onClick={downloadAllIdcardsPDF} disabled={isGeneratingPDF}>
                    {isGeneratingPDF ? 'Generating PDF...' : 'Directory without Photo(patron)'}
                </Button>
            </div>
        </div>
    );
};

export default AllPetronData;

