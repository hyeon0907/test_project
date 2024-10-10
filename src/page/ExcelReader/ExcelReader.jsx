/*global kakao*/
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import * as XLSX from 'xlsx';
import { instance } from '../../apis/util/instance';

const KakaoGeocoder = () => {
    const [data, setData] = useState([]); // 주소 및 추가 정보 상태
    const [results, setResults] = useState([]); // 결과 상태

    useEffect(() => {
        // 카카오맵 API가 로드되었는지 확인
        if (typeof window.kakao === 'undefined') {
            console.error('카카오맵 API가 로드되지 않았습니다.');
            return;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 위도, 경도를 찾는 함수
        const getLatLngFromAddress = (address) => {
            return new Promise((resolve, reject) => {
                geocoder.addressSearch(address, function (result, status) {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const lat = result[0].y;
                        const lng = result[0].x;
                        resolve({ lat, lng }); // 주소와 좌표를 포함한 결과 반환
                    } else {
                        reject(`주소를 찾을 수 없습니다: ${address}`);
                    }
                });
            });
        };

        // 모든 주소에 대해 좌표 찾기
        const fetchCoordinates = async () => {
            const resultsArray = [];
            for (const item of data) {
                try {
                    const result = await getLatLngFromAddress(item.주소);
                    resultsArray.push({ ...result, cafename: item.이름, category: item.카테고리, address: item.주소 });
                } catch (error) {
                    console.error(error);
                    resultsArray.push({ 주소: item.주소, lat: null, lng: null, 이름: item.이름, 카테고리: item.카테고리 });
                }
            }
            setResults(resultsArray);
            console.log(results);
        };

        if (data.length > 0) {
            fetchCoordinates();
        }
    }, [data]);

    // 엑셀 파일 처리
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // jsonData에서 주소, 이름, 카테고리 추출
            const addressList = jsonData.map(item => ({
                주소: item.주소,
                이름: item.이름,
                카테고리: item.카테고리
            })).filter(item => item.주소); // 주소가 있는 항목만 필터링

            setData(addressList); // 주소 리스트 설정
        };
        console.log(data);

        reader.readAsArrayBuffer(file);
    };


    const handleOnclike = async () => {
        console.log(results);
        let response = null;

        for(let i = 0; i < 50; i++){
            try {
                response = await instance.post("/cafe/add", results[i]);
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            <button onClick={handleOnclike}>확인</button>
            <h3>주소로 찾은 위도와 경도</h3>
            {results.map((result, index) => (
                <div key={index}>
                    <p>이름: {result.cafename}</p>
                    <p>주소: {result.address}</p>
                    <p>카테고리: {result.category}</p>
                    <p>위도: {result.lat !== null ? result.lat : "위도를 찾지 못했습니다"}</p>
                    <p>경도: {result.lng !== null ? result.lng : "경도를 찾지 못했습니다"}</p>
                </div>
            ))}
        </div>
    );
};

export default KakaoGeocoder;
