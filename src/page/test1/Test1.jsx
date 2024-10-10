/*global kakao*/
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { Map, MapTypeControl, ZoomControl, useKakaoLoader } from "react-kakao-maps-sdk";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { instance } from "../../apis/util/instance";

function MapPage(props) {
    const [ check, setCheck ] = useState("전체");
    const [loading, error] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAOMAP_API_KEY, // 발급 받은 APPKEY
    })
    const [center, setCenter] = useState({
        lat: 35.156359,
        lng: 129.0631410,
    });

    const cafe = useQuery(
        ["cafeQuery", check],
        async () => {
            return instance.get(`/cafe/get/${check}`);
        },
        {
            onSuccess: response => console.log(response),
            refetchOnWindowFocus: false,
            retry: 0,
        }
    )

    

    const handleOnChange = (e) => {
        setCheck(e.target.value);
        console.log(e.target.value); // 변경된 value를 확인
    };

    return (
        <div css={s.layout}>
            <div css={s.box}>
                <div css={s.header}>
                    <div css={s.logobox}>
                        <button>이벤트 이동</button>
                        LOGO
                    </div>
                    <div css={s.inputbox}>
                        <input type="text" />
                        <button>확인</button>
                        <fieldset css={s.radiobutton}>
                            <label>
                                <input type="radio" name="menu" onChange={handleOnChange} value={"전체"} checked={check == "전체"} />
                                전체
                            </label>
                            <label>
                                <input type="radio" name="menu" onChange={handleOnChange} value={"브런치"} checked={check == "브런치"}/>
                                브런치
                            </label>
                            <label>
                                <input type="radio" name="menu" onChange={handleOnChange} value={"분위기"} checked={check == "분위기"}/>
                                분위기
                            </label>
                            <label>
                                <input type="radio" name="menu" onChange={handleOnChange} value={"베이커리"} checked={check == "베이커리"}/>
                                베이커리
                            </label>
                            <label>
                                <input type="radio" name="menu" onChange={handleOnChange} value={"디저트"} checked={check == "디저트"}/>
                                디저트
                            </label>
                        </fieldset>
                    </div>
                </div>
                <div css={s.content}>카페리스트
                    <div css={s.contentlist}>
                        <ul>
                            {
                                cafe.data?.data.map((result, index) => (
                                    <li key={index}>
                                        <p>카페이름: {result.cafeName}</p>
                                        <p>평점</p>
                                        <p>주소: {result.address}</p>
                                        <p>카테고리/ 리뷰수: {result.category}</p>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Map css={s.map} center={center}>
                <MapTypeControl position={"TOPRIGHT"} />
                <ZoomControl position={"RIGHT"} />
            </Map>
        </div>
    )
}

export default MapPage;