import Tesseract from 'tesseract.js';

const Ocr = (image) => {
    return new Promise((resolve, reject) => {
        Tesseract.recognize(
            image,
            'kor',
            {
                logger: (m) => console.log(m),
            }
        ).then(({ data: { text } }) => {
            const regex = /\d{3}-\d{2}-\d{5}/; // 사업자 등록번호 패턴
            const match = text.match(regex);
            if (match) {
                const businessNumber = match[0].replace(/-/g, ''); // 하이픈 제거
                resolve(businessNumber); // 사업자 등록번호 반환
            } else {
                reject(new Error('사업자 등록번호를 찾을 수 없습니다.'));
            }
        }).catch((error) => {
            reject(error); // 오류 처리
        });
    });
};

export default Ocr;
