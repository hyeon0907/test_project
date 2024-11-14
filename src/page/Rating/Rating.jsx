import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { FaStar } from 'react-icons/fa'; // 별 아이콘 가져오기

const RatingStar = () => {
    const [isHover, setIsHover] = useState([false, false, false, false, false]);
    const [score, setScore] = useState(-1);
    let tempisHover = [false, false, false, false, false];

    const handleMouseOver = index => {
        tempisHover = [false, false, false, false, false];
        for (let i = 0; i < index + 1; i++) {
            tempisHover[i] = true;
        }
        setIsHover(tempisHover);
    }

    const handleMouseOut = () => {
        tempisHover = [false, false, false, false, false];
        for (let i = 0; i < score + 1; i++) {
            tempisHover[i] = true;
        }
        setIsHover(tempisHover);
    }

    const handleOnClick = index => {
        setScore(index);
    }

    return (
        <>
            <div css={s.rating_stars}>
                {[0, 1, 2, 3, 4].map((element, index) => (
                    <FaStar 
                        css={isHover[element] ? s.rating_star_over : s.rating_star_out}
                        key={index}
                        size={50}
                        onMouseOver={() => handleMouseOver(index)}
                        onMouseOut={handleMouseOut}
                        onClick={() => handleOnClick(index)}
                    />
                ))}
            </div>
            {score >= 0 && (
                <div css={{ marginTop: '20px', fontSize: '18px', textAlign: 'center' }}>
                    <p>선택한 별점: {score + 1}점</p>
                </div>
            )}
        </>
    );
}

export default RatingStar;


// import React from 'react';
// import StarRatings from 'react-star-ratings';

// const StarRating = ({ rating }) => {
//   return (
//     <StarRatings
//       rating={3.5}                     // 현재 별점 값
//       starRatedColor="gold"               // 채워진 별의 색상
//       numberOfStars={5}                   // 전체 별의 개수
//       name="rating"                       // 별점 컴포넌트의 이름
//       starDimension="24px"                // 각 별의 크기
//       starSpacing="2px"                   // 별 사이의 간격
//     />
//   );
// };

// export default StarRating;