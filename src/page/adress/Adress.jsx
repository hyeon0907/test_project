/*global kakao*/
import React, { useEffect, useState } from 'react';

const KakaoGeocoder = () => {
    const [address, setAddress] = useState(""); // 주소 입력 상태
    const [latitude, setLatitude] = useState(null); // 위도 상태
    const [longitude, setLongitude] = useState(null); // 경도 상태

    useEffect(() => {
        // 카카오맵 Geocoder 객체 초기화
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 위도, 경도를 찾는 함수
        const getLatLngFromAddress = (address) => {
            geocoder.addressSearch(address, function (result, status) {
                // 정상적으로 검색이 완료됐을 경우
                if (status === window.kakao.maps.services.Status.OK) {
                    const lat = result[0].y;
                    const lng = result[0].x;
                    setLatitude(lat); // 위도 설정
                    setLongitude(lng); // 경도 설정
                } else {
                    console.error('주소를 찾을 수 없습니다.');
                }
            });
        };

        // 버튼 클릭 이벤트에서 호출할 수 있도록 함수 선언
        const handleButtonClick = () => {
            if (address) {
                getLatLngFromAddress(address); // 주소로 좌표 찾기
            } else {
                console.error('주소를 입력하세요.');
            }
        };

        // 전역으로 함수 배치 (렌더링 시에 바로 사용되도록)
        window.handleButtonClick = handleButtonClick;

    }, [address]);

    // 입력값 변경 핸들러
    const handleInputChange = (e) => {
        setAddress(e.target.value);
    };

    return (
        <div>
            <input 
                type="text" 
                name='address' 
                onChange={handleInputChange} 
                value={address} 
                placeholder="주소를 입력하세요" 
            />
            <button onClick={() => window.handleButtonClick()}>확인</button>
            <h3>주소로 찾은 위도와 경도</h3>
            <p>위도: {latitude ? latitude : "위도를 찾지 못했습니다"}</p>
            <p>경도: {longitude ? longitude : "경도를 찾지 못했습니다"}</p>
        </div>
    );
};

export default KakaoGeocoder;
