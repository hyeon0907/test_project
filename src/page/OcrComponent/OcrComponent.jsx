import React, { useState } from 'react';
import axios from 'axios';

const OcrComponent = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleOcr = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append('file', image);
        formData.append('apikey', 'K82138352488957');
        formData.append('language', 'kor'); // 한국어 설정

        const response = await axios.post('https://api.ocr.space/parse/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const parsedText = response.data.ParsedResults[0].ParsedText;
        setText(parsedText);
        console.log(parsedText);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleOcr}>OCR 수행</button>
            <div>
                <h2>추출된 텍스트:</h2>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default OcrComponent;
