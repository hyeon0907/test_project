import React, { useState } from 'react';
import axios from 'axios';

const BusinessRegistration = () => {
  const [businessNumber, setBusinessNumber] = useState('');
  const [businessInfo, setBusinessInfo] = useState("");
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setBusinessNumber(event.target.value);
  };

  const handleCheckBusiness = async () => {
    if (!businessNumber) {
      setError('사업자 등록번호를 입력해주세요.');
      return;
    }

    const data = {
      b_no: [businessNumber], // 사업자번호를 배열로 전달
    };

    const apiKey = 'KMw7lDJe1GdDfiY78zaaVa9PXm5E18m5d4vC4K2cA5WuykRDWpfht%2BYL9TnpE7tStMox0BZa0lTpDWQ689Eh8A%3D%3D'; // 발급받은 API 키
    const apiUrl = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=KMw7lDJe1GdDfiY78zaaVa9PXm5E18m5d4vC4K2cA5WuykRDWpfht%2BYL9TnpE7tStMox0BZa0lTpDWQ689Eh8A%3D%3D`;

    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });
      console.log(response);
      // response.data.data의 b_stt_cd 코드 종류(01 계속사업자, 02 휴업자, 03 폐업자)
      if (response.data.data[0].b_stt_cd == "01") {
        setBusinessInfo("인증완료");
        setError('');
        console.log(businessInfo);
      } else {
        setBusinessInfo(null);
        setError('등록된 사업자가 없습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('조회 중 오류가 발생했습니다.');
      setBusinessInfo(null);
    }
  };

  return (
    <div>
      <h1>사업자 등록번호 조회</h1>
      <input
        type="text"
        value={businessNumber}
        onChange={handleInputChange}
        placeholder="사업자 등록번호 입력 (예: 1234567890)"
      />
      <button onClick={handleCheckBusiness}>조회</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {businessInfo && (
        <div>
          <h2>사업자 정보</h2>
          <p>번호: {businessInfo}</p>
          <p>업종: {businessInfo}</p>
          <p>주소: {businessInfo}</p>
        </div>
      )}
    </div>
  );
};

export default BusinessRegistration;
