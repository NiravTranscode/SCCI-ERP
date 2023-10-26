import React, { useEffect, useState } from "react";
import { Button } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../../../css/certificate.css';

const UserData = ({ details }) => {
  const [datas, setData] = useState([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const downloadAllIdcardsPDF = async () => {
    setIsGeneratingPDF(true);
    const pdf = new jsPDF('p', 'mm', 'a4');

    for (const group of datas) {
      const cardContainer = document.getElementById(`g2-${group[0]._id}`);
      const canvas = await html2canvas(cardContainer, { scale: 2 });
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.setFontSize(25);
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.addPage();
    }
    pdf.save('all_idcards.pdf');
    setIsGeneratingPDF(false);
  };

  useEffect(() => {
    const newArr = [];
    const tempArr = [...details];
    while (tempArr.length) newArr.push(tempArr.splice(0, 8 * 3));
    setData(newArr);
  }, [details]);

  return (
    <div id='card_datas'>
      <div style={{ opacity: 0, height: 0 }}>
        {datas.map((group, groupIndex) => (
          <div key={groupIndex} id={`g2-${group[0]._id}`}>
            <div className="row" style={{ width: "100%", border: "0px" }}>
              {group.map((user) => (
                <span key={user._id} id={`address-${user._id}`} className="card-container col-4">
                  <div
                    style={{
                      textAlign: "left",
                      margin: "5px",
                      minWidth: "66mm",
                      'padding-bottom': '35px',
                    }}>
                    <p style={{ margin: "0px", fontSize: "30px", fontWeight: "600" }}>{user.name}</p>
                    <p style={{ margin: "0px", fontSize: "30px", fontWeight: "600" }}>{user.companyName}</p>
                    <p style={{ margin: "0px", fontSize: "30px", fontWeight: "600", wordWrap: "break-word" }}>{user.address}</p>
                  </div>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        <Button onClick={downloadAllIdcardsPDF}>
          {isGeneratingPDF ? 'Generating PDF...' : 'Download Address Data'}
        </Button>
      </div>
    </div>
  );
};

export default UserData;


