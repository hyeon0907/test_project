/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';

const slideContainerStyle = css`
    overflow: hidden; /* 내용이 넘어가면 숨기기 */
    width: 300px; /* 슬라이드의 너비 */
    height: 200px; /* 슬라이드의 높이 */
    position: relative;
`;

const slideContentStyle = (isVisible) => css`
    position: absolute;
    transition: transform 0.5s ease; /* 슬라이드 애니메이션 */
    width: 100%;
    height: 100%;
    background-color: lightblue; /* 슬라이드 배경색 */
    transform: ${isVisible ? 'translateX(0)' : 'translateX(-100%)'}; /* 슬라이드 위치 */
`;

const SlideExample = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleButtonClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <button onClick={handleButtonClick}>
                {isVisible ? 'Hide' : 'Show'} Slide
            </button>
            <div css={slideContainerStyle}>
                <div css={slideContentStyle(isVisible)}>
                    <h2>슬라이드 내용</h2>
                    <p>이곳에 슬라이드 애니메이션이 적용됩니다.</p>
                </div>
            </div>
        </div>
    );
};

export default SlideExample;