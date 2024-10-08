import React, { useState } from 'react';
import EXIF from 'exif-js';

const MetadataChecker = () => {
  const [image, setImage] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    // EXIF 데이터 추출
    EXIF.getData(file, function() {
      const allMetaData = EXIF.getAllTags(this);
      setMetadata(allMetaData);
    });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Uploaded" style={{ width: '300px', marginTop: '10px' }} />}
      {metadata && (
        <div style={{ marginTop: '20px' }}>
          <h2>Metadata:</h2>
          <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MetadataChecker;
