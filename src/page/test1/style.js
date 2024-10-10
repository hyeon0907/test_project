import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    margin: 0px;
    width: 100%;
    height: 100%;
`

export const box = css`
    display: flex;
    box-sizing: border-box;
    flex-direction: column; /* 세로 방향으로 정렬 */
    border: 1px blue;
    height: 953px;
    width: 25%;
`

export const header = css`
    box-sizing: border-box;
    padding: 10px;
    background-color: lightblue; /* 배경 색상 */
    height: 100px;
`

export const logobox = css`
box-sizing: border-box;
    margin: 10px 0px;
    background-color: lightblue; /* 배경 색상 */
`

export const footer = css`
    margin: 10px; /* 아이템 간 간격 */
    padding: 20px;
    background-color: lightblue; /* 배경 색상 */
    border: 1px solid #ccc; /* 테두리 */
`
export const inputbox = css`
`

export const radiobutton = css`
    padding: 0px;
    margin: 0px;
    border: none;
`

export const content = css`
    flex-grow: 1;
    background: lightgreen; /* 배경 색상 */
    padding: 10px;
    border: 1px solid #dbdbdb;
    overflow-y: scroll;
    height: 100%;
`

export const contentlist = css`
    box-sizing: border-box;
    ul{
        list-style-type: none;
        padding: 0;
    }

    li{
        box-sizing: border-box;
        background: #f9f9f9;
        margin: 5px 0;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 10px;
    }
`

export const map = css`
    display: flex;
    width: 100%;
    height: 953px;
`