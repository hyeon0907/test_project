import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import Ocr from '../../apis/util/ocr';

const ImageVerification = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [businessNumber, setBusinessNumber] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file));
    };

    const handleOnClick = () => {
        if (image) {
            setLoading(true);
            Ocr(image)
                .then((number) => {
                    setBusinessNumber(number); // 사업자 등록번호 상태 업데이트
                    console.log(`추출된 사업자 등록번호: ${number}`);
                })
                .catch((error) => {
                    console.error('OCR 처리 중 오류 발생:', error);
                })
                .finally(() => {
                    setLoading(false); // 로딩 종료
                });
        } else {
            console.log('이미지를 선택해 주세요.');
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleOnClick} disabled={loading}>
                {loading ? '처리 중...' : '확인'}
            </button>
            {businessNumber && (
                <div>
                    <h2>추출된 사업자 등록번호:</h2>
                    <p>{businessNumber}</p>
                </div>
            )}
        </div>
    );
};

export default ImageVerification;
