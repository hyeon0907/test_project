import React from 'react';
import KakaoMap from './page/Test1/Test1';
import KakaoGeocoder from './page/adress/Adress';
import MyEditor from './page/myeditor/MyEditor';
import { Route, Routes } from 'react-router-dom';
import OcrComponent from './page/OcrComponent/OcrComponent';
import BusinessRegistration from './page/BusinessRegistration/BusinessRegistration';
import CalendarModal from './page/CalendarModal/CalendarModal';
import OcrComponent2 from './page/OcrComponent2/OcrComponent2';
import ImageVerificationComponent from './page/ImageVerificationComponent/ImageVerificationComponent';
import ExcelReader from './page/ExcelReader/ExcelReader';
import { useQuery } from 'react-query';
import { instance } from './apis/util/instance';
import SlideExample from './page/SlideExample/SlideExample';
import Rating from './page/Rating/Rating';

function App() {

  return (
      <Routes>
        <Route path="/map" element={<KakaoMap/>} />
        <Route path="/adress" element={<KakaoGeocoder/>} />
        <Route path="/board" element={<MyEditor/>} />
        <Route path="/img" element={<OcrComponent/>} />
        <Route path="/img2" element={<OcrComponent2/>} />
        <Route path="/img3" element={<ImageVerificationComponent />} />
        <Route path="/check" element={<BusinessRegistration/>} />
        <Route path="/calendar" element={<CalendarModal/>} />
        <Route path="/excel" element={<ExcelReader/>} />
        <Route path="/slide" element={<SlideExample/>} />
        <Route path="/star" element={<Rating/>} />
      </Routes>
  );
}

export default App;
