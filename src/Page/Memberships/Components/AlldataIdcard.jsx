import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../../../css/certificate.css';

const AlldataIdcard = ({ petronData, yearlyData }) => {
  const [petronDatas, setPetronDatas] = useState([]);
  const [yearlyDatas, setYearlyDatas] = useState([]);
  const [isGeneratingPetronPDF, setIsGeneratingPetronPDF] = useState(false);
  const [isGeneratingYearlyPDF, setIsGeneratingYearlyPDF] = useState(false);

  const downloadPetronDataPDF = async () => {
    setIsGeneratingPetronPDF(true);
    const pdf = new jsPDF('p', 'mm', 'a4');
    for (const dataGroup of petronDatas) {
      const cardContainer = document.getElementById(`card_datas-${dataGroup[0]._id}`);
      const canvas = await html2canvas(cardContainer);
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.setFontSize(20);
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.addPage();
    }
    pdf.deletePage(pdf.internal.getNumberOfPages());
    pdf.save('petron_data.pdf');
    setIsGeneratingPetronPDF(false);
  };

  const downloadYearlyDataPDF = async () => {
    setIsGeneratingYearlyPDF(true);
    const pdf = new jsPDF('p', 'mm', 'a4');
    for (const dataGroup of yearlyDatas) {
      const cardContainer = document.getElementById(`card_datas-${dataGroup[0]._id}`);
      const canvas = await html2canvas(cardContainer);
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.setFontSize(20);
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.addPage();
    }
    pdf.deletePage(pdf.internal.getNumberOfPages());
    pdf.save('yearly_data.pdf');
    setIsGeneratingYearlyPDF(false);
  };

  useEffect(() => {
    const newArrPetron = [];
    const tempArrPetron = [...petronData];
    while (tempArrPetron.length) newArrPetron.push(tempArrPetron.splice(0, 4));
    setPetronDatas(newArrPetron);

    const newArrYearly = [];
    const tempArrYearly = [...yearlyData];
    while (tempArrYearly.length) newArrYearly.push(tempArrYearly.splice(0, 4));
    setYearlyDatas(newArrYearly);
  }, [petronData, yearlyData]);

  return (
    <div id='card_datas'>
    <div style={{ position: 'absolute', left: '-9999px', bottom: 0 }}>
      {petronDatas.map((dataGroup) => (
        <div id={`card_datas-${dataGroup[0]._id}`} className="card-container px-3 pt-2">
          <h2 style={{ "text-align": 'center' }}>SAURASHTRA CHAMBER OF COMMERCE & INDUSTRY [Patron Data]</h2>
          <br />
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>PARTY NAME</th>
                <th>Name</th>
                <th>Name</th>
                <th>REMARK</th>
              </tr>
            </thead>
            <tbody>
              {dataGroup.map((member, index) => (
                <tr key={index}>
                  <td>{member?.userId}</td>
                  <td>
                    <span style={{ textTransform: 'uppercase' }}>{member.companyName}</span><br />
                    {member.address}<br />
                    {member.city}, {member.state}<br />
                    {member?.companyWhatsappNumber ? member.companyWhatsappNumber + "(B)" : ""}
                  </td>
                  <td>
                    <img src={member?.profilePhoto} alt="Profile Photo 1" height="150px" width="150px" /><br />
                    <span style={{ textTransform: 'uppercase' }}>{member.name}</span><br />
                    {member.phone}
                  </td>
                  <td>
                    <img src={member?.profilePhoto2} alt="Profile Photo 2" height="150px" width="150px" /><br />
                    <span style={{ textTransform: 'uppercase' }}>{member.name2}</span><br />
                    {member.phone2}
                  </td>
                  <td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {yearlyDatas.map((dataGroup) => (
        <div id={`card_datas-${dataGroup[0]._id}`} className="card-container px-3 pt-2">
          <h2 style={{ "text-align": 'center' }}>SAURASHTRA CHAMBER OF COMMERCE & INDUSTRY [Yearly Data]</h2>
          <br />
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>PARTY NAME</th>
                <th>Name</th>
                <th>Name</th>
                <th>REMARK</th>
              </tr>
            </thead>
            <tbody>
              {dataGroup.map((member, index) => (
                <tr key={index}>
                  <td>{member?.userId}</td>
                  <td>
                    <span style={{ textTransform: 'uppercase' }}>{member.companyName}</span><br />
                    {member.address}<br />
                    {member.city}, {member.state}<br />
                    {member?.companyWhatsappNumber ? member.companyWhatsappNumber + "(B)" : ""}
                  </td>
                  <td>
                    <img src={member?.profilePhoto} alt="Profile Photo 1" height="150px" width="150px" /><br />
                    <span style={{ textTransform: 'uppercase' }}>{member.name}</span><br />
                    {member.phone}
                  </td>
                  <td>
                    <img src={member?.profilePhoto2} alt="Profile Photo 2" height="150px" width="150px" /><br />
                    <span style={{ textTransform: 'uppercase' }}>{member.name2}</span><br />
                    {member.phone2}
                  </td>
                  <td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      </div>
      <div>
        <Button onClick={downloadPetronDataPDF} disabled={isGeneratingPetronPDF}>
          {isGeneratingPetronPDF ? 'Generating PetronData PDF...' : 'Directory with Photo(patron)'}
        </Button>
        <br/>
        <Button onClick={downloadYearlyDataPDF} >
          {isGeneratingYearlyPDF ? 'Generating YearlyData PDF...' : 'Directory with Photo(member)'}
        </Button>
      </div>
    </div>
  );
};

export default AlldataIdcard;





