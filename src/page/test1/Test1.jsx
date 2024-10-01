/*global kakao*/
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Map, MapMarker, MapTypeControl, Roadview, ZoomControl, useKakaoLoader } from "react-kakao-maps-sdk";

// buttonimage 스타일에서 toggle에 따라 background-position이 변경됨
const buttonimage = (toggle) => css`
    position: absolute;
    border: none;
    top: 5px;
    right: 50px;
    width: 42px;
    height: 42px;
    z-index: 10;
    background: url(//t1.daumcdn.net/localimg/localimages/07/2018/pc/common/img_search.png) 
        ${toggle === "map" ? "0 -450px" : "0 -350px"} no-repeat;
    cursor: pointer;

    &:active{
        background-position: 0 -350px;
    }
`;

const KakaoMap = () => {
    const [toggle, setToggle] = useState("map");
    const [center, setCenter] = useState({
        // lat: 35.15736,
        lat: 35.1498046404393,
        // lng: 129.0590,
        lng: 129.001871279832
    });
    const [position, setPosition] = useState({
        lat: "",
        lng: "",
    });
    useKakaoLoader();

    useEffect(() => {
        if (toggle === "map") {
            setPosition({ lat: "", lng: "" });
        }
    }, [toggle]);

    return (
        <div style={{ width: "1000px", height: "900px", position: "relative", margin: "0px auto" }}>
            <Map
                center={center}
                style={{
                    width: "1000px",
                    height: "900px",
                    display: toggle === "map" ? "block" : "none",
                    margin: "0px auto",
                }}
                level={4}
                onClick={(_, mouseEvent) => {
                    const latlng = mouseEvent.latLng;
                    setPosition({
                        lat: latlng.getLat(),
                        lng: latlng.getLng(),
                    });
                }}
            >
                <ZoomControl position={"RIGHT"} />
                <MapMarker position={center} />
                {toggle === "map" && (
                    <button
                        css={buttonimage(toggle)} // toggle 상태를 넘김
                        onClick={() => setToggle("roadview")}
                        title="로드뷰 보기"
                    />
                )}
            </Map>
            <Roadview
                position={position.lat && position.lng ? { ...position, radius: 50 } : { ...center, radius: 50 }}
                style={{
                    display: toggle === "roadview" ? "block" : "none",
                    width: "100%",
                    height: "100%",
                }}
                onPositionChanged={(roadview) =>
                    setCenter({
                        lat: roadview.getPosition().getLat(),
                        lng: roadview.getPosition().getLng(),
                    })
                }
            >
                {toggle === "roadview" && (
                    <button
                        css={buttonimage(toggle)} // toggle 상태를 넘김
                        onClick={() => setToggle("map")}
                        title="지도 보기"
                    />
                )}

            </Roadview>
        </div>
    );
};

export default KakaoMap;