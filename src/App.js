import React from 'react';
import KakaoMap from './page/test1/Test1';
import KakaoGeocoder from './page/adress/Adress';
import MyEditor from './page/myeditor/MyEditor';
import { Route, Routes } from 'react-router-dom';
import OcrComponent from './page/OcrComponent/OcrComponent';
import BusinessRegistration from './page/BusinessRegistration/BusinessRegistration';

function App() {
  return (
      <Routes>
        <Route path="/map" element={<KakaoMap/>} />
        <Route path="/adress" element={<KakaoGeocoder/>} />
        <Route path="/board" element={<MyEditor/>} />
        <Route path="/img" element={<OcrComponent/>} />
        <Route path="/check" element={<BusinessRegistration/>} />
      </Routes>
  );
}

export default App;
