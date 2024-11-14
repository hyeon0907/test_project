import { css } from "@emotion/react"

/* styleexport constcss */
export const container = css`
    overflow: hidden; /* 내용이 넘어가면 숨기기 */
    width: 300px; /* 슬라이드의 너비 */
    height: 200px; /* 슬라이드의 높이 */
    position: relative;
`

export const content = css`
    position: absolute;
    transition: transform 0export const5s ease; /* 슬라이드 애니메이션 */
    width: 100%;
    height: 100%;
    background-color: lightblue; /* 슬라이드 배경색 */
`

export const slidein = css`
    transform: translateX(0); /* 기본 위치 */
`

export const slideout = css`
    transform: translateX(-100%); /* 왼쪽으로 슬라이드 */
`
