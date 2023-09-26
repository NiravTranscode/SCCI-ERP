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
    const pdf = new jsPDF('landscape', 'mm', 'a4');

    for (const group of datas) {
      const cardContainer = document.getElementById(`g2-${group[0]._id}`);
      const canvas = await html2canvas(cardContainer);
      const pdfWidth = 260;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.setFontSize(20);
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.addPage();
    }
    pdf.save('all_idcards.pdf');
    setIsGeneratingPDF(false);
  };

  useEffect(() => {
    const newArr = [];
    const tempArr = [...details];
    while (tempArr.length) newArr.push(tempArr.splice(0, 9)); // 4x4 grid
    setData(newArr);
  }, [details]);

  return (
    <div id='card_datas'>
      <div style={{ position: 'absolute', left: '-9999px', bottom: 0 }}>
        {datas.map((group) => (
          <div id={`g2-${group[0]._id}`} className="col-3">
            <div className=" row" style={{ width: "100%", border: "0px" }}>
              {group.map((user) => (
                <span key={user._id} id={`address-${user._id}`} className="card-container  col-4">
                  <div
                    style={{
                      textAlign: "left",
                      border: "0px",
                      margin: "10px 30px",
                      minWidth: "280px",
                      maxWidth: "280px",
                      padding: "10px"
                    }}>
                    <p style={{ margin: "0px", fontSize: "20px", fontWeight: "600" }}>{user.name}</p>
                    <p style={{ margin: "0px", fontSize: "20px", fontWeight: "600" }}>{user.companyName}</p>
                    <p style={{ margin: "0px", fontSize: "20px", fontWeight: "600", wordWrap: "break-word" }}>{user.address}</p>
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