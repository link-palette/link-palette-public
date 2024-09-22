import React, { useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";

export default function ImageCrop({ src }: { src: string }) {
  const [crop, setCrop] = useState<Crop>();
  return (
    <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
      <img src={src} />
    </ReactCrop>
  );
}
