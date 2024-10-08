import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const ImageVerification = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file));
        recognizeText(file);
    };

    const recognizeText = (file) => {
        setLoading(true);
        Tesseract.recognize(
            file,
            'kor',
            {
                logger: (m) => console.log(m),
            }
        ).then(({ data: { text } }) => {
            setText(text);
            const regex = /\d{3}-\d{2}-\d{5}/; // 사업자 등록번호 패턴
            const match = text.match(regex);
            console.log(match);
            if (match) {
                console.log(`추출된 사업자 등록번호: ${match[0]}`);
            } else {
                console.log('사업자 등록번호를 찾을 수 없습니다.');
            }
        });
    };

    return (
        <div>
            <h1>이미지 검증기</h1>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {loading && <p>처리 중...</p>}
            {image && <img src={image} alt="Uploaded" style={{ width: '300px', marginTop: '10px' }} />}
            <h2>추출된 텍스트:</h2>
            <pre>{text}</pre>
        </div>
    );
};

export default ImageVerification;
