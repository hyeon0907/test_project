/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useRef, useState } from "react";
import { Map, MapMarker, MapTypeControl, ZoomControl, useKakaoLoader, useMap } from "react-kakao-maps-sdk";
import { instance } from "../../apis/util/instance";
import { useQuery } from "react-query";

function MapPage(props) {
    const [check, setCheck] = useState("전체");
    const [inputdata, setInputdata] = useState("");
    const [inputvalue, setInputvalue] = useState("");
    const [center, setCenter] = useState({
        lat: 35.156359,
        lng: 129.0631410,
    });

    const cafe = useQuery(
        ["cafeQuery", check, inputvalue],
        async () => {
            return instance.get(`/cafe/get/${check}/${inputvalue}`);
        },
        {
            onSuccess: response => console.log(response),
            refetchOnWindowFocus: false,
            retry: 0,
        }
    )

    console.log(cafe.data?.data);

    const handleOnChange = (e) => {
        setCheck(e.target.value);
    };

    const handleInputOnChange = (e) => {
        setInputdata(e.target.value);
    };

    const handleSearchOnClick = async () => {
        setInputvalue(inputdata);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearchOnClick();
        }
    };

    const EventMarkerContainer = ({ position, content, cafe }) => {
        // const map = useMap()
        const [isVisible, setIsVisible] = useState(false)

        return (
            <MapMarker
                position={position} // 마커를 표시할 위치

                // onClick={(marker) => map.panTo(marker.getPosition())}
                // onClick={() => setIsVisible(isVisible == true ? false : true)}
                onClick={() => setIsVisible(true)}
            // onMouseOver={() => setIsVisible(true)}
            // onMouseOut={() => setIsVisible(false)}
            >
                {cafe.id}
                {
                    isVisible &&
                    // <div>{isVisible && content}</div>
                    <div className="wrap">
                        <div className="info">
                            <div className="title">
                                {cafe.cafeName}
                                <div
                                    className="close"
                                    onClick={() => setIsVisible(false)}
                                    title="닫기"
                                >이벤트 닫기</div>
                            </div>
                            <div className="body">
                                {/* <div className="img">
                                    <img
                                        src="//t1.daumcdn.net/thumb/C84x76/?fname=http://t1.daumcdn.net/cfile/2170353A51B82DE005"
                                        width="73"
                                        height="70"
                                        alt="카카오 스페이스닷원"
                                    />
                                </div> */}
                                <div className="desc">
                                    <div className="ellipsis">
                                        {cafe.address}
                                    </div>
                                    <div className="jibun ellipsis">
                                        {cafe.category}
                                    </div>
                                    {/* <div>
                                        <a
                                            href="https://www.kakaocorp.com/main"
                                            target="_blank"
                                            className="link"
                                            rel="noreferrer"
                                        >
                                            홈페이지
                                        </a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </MapMarker>
        )
    }

    return (
        <div css={s.layout}>
            <div css={s.box}>
                <div css={s.header}>
                    <div css={s.logobox}>
                        <button>이벤트 이동</button>
                        LOGO
                    </div>
                    <div css={s.inputbox}>
                        <input type="text" value={inputdata} onChange={handleInputOnChange} onKeyDown={handleInputKeyPress} />
                        <button onClick={handleSearchOnClick}>확인</button>
                        <fieldset css={s.radiobutton}>
                            <label>
                                <input type="radio" name="menu" onChange={handleOnChange} value={"전체"} checked={check === "전체"} />
                                전체
                            </label>
                            <label>
                                <input type="radio" name="menu" onChange={handleOnChange} value={"브런치"} checked={check === "브런치"} />
                                브런치
                            </label>
                            <label>
                                <input type="radio" name="menu" onChange={handleOnChange} value={"분위기"} checked={check === "분위기"} />
                                분위기
                            </label>
                            <label>
                                <input type="radio" name="menu" onChange={handleOnChange} value={"베이커리"} checked={check === "베이커리"} />
                                베이커리
                            </label>
                            <label>
                                <input type="radio" name="menu" onChange={handleOnChange} value={"디저트"} checked={check === "디저트"} />
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
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <Map css={s.map} center={center}>
                <MapTypeControl position={"TOPRIGHT"} />
                <ZoomControl position={"RIGHT"} />
                {
                    cafe.data?.data.map((result, index) => (
                        <EventMarkerContainer
                            key={index}
                            position={{ lat: result.lat, lng: result.lng }} // 마커를 표시할 위치
                            content={result.cafeName}
                            cafe={result}
                        />
                    ))}
            </Map>
        </div>
    );
}

export default MapPage;