import React from 'react';
import logo from '../../../Assest/images/sccilogo.png';
function PDFContent({ details }) {
    return (
        <div>
            {details.map((member, index) => (
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
    );
}

export default PDFContent;
