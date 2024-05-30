import React, { useState, useEffect } from "react";

export default function CompanyDetailPictures({pictures}) {

    const renderPictures = () => {
        if (pictures.length === 1) {
            return (
                <div>
                    <img src={pictures[0].url} alt="Company Picture" className="w-full max-h-[200px] object-cover" />
                </div>
            );
        } else if (pictures.length === 2) {
            return (
                <div className="flex flex-col gap-3">
                    {pictures.map((picture, index) => (
                        <img key={index} src={picture.url} alt={`Company Picture ${index + 1}`} className="w-full max-h-[200px] object-cover" />
                    ))}
                </div>
            );
        } else if (pictures.length === 3) {
            return (
                <div className="flex">
                    <div className="w-4/6 mr-3">
                        <img src={pictures[0].url} alt="Company Picture 1" className="w-full h-full max-h-[404px] object-cover" />
                    </div>
                    <div className="w-2/6 flex flex-col justify-between">
                        <img src={pictures[1].url} alt="Company Picture 2" className="h-1/2 object-cover max-h-[200px] mb-1" />
                        <img src={pictures[2].url} alt="Company Picture 3" className="h-1/2 object-cover max-h-[200px]" />
                    </div>
                </div>
            );
        } else if (pictures.length === 4) {
            return (
                <div className="grid grid-cols-2 gap-3">
                    {pictures.map((picture, index) => (
                        <img key={index} src={picture.url} alt={`Company Picture ${index + 1}`} className="w-full h-full object-cover max-h-[200px]" />
                    ))}
                </div>
            );
        } else {
            return (
                <div>
                  <div className="flex mb-3">
                    <div className="w-4/6 mr-3">
                      <img src={pictures[0].url} alt="Company Picture 1" className="h-full object-cover max-h-[400px] w-full" />
                    </div>
                    <div className="w-2/6 flex flex-col justify-between">
                      <img src={pictures[1].url} alt="Company Picture 2" className="h-1/2 object-cover mb-3 max-h-[194px] w-full" />
                      <img src={pictures[2].url} alt="Company Picture 3" className="h-1/2 object-cover max-h-[194px] w-full" />
                    </div>
                  </div>
                  <div className="flex mb-3">
                    <div className="w-4/6 mr-3">
                        <img src={pictures[3].url} alt="Company Picture 4" className="w-full h-full object-cover max-h-[200px] w-full" />
                    </div>
                    <div className="w-2/6">
                        <img src={pictures[4].url} alt="Company Picture 5" className="w-full h-full object-cover max-h-[200px] w-full" />
                    </div>
                  </div>
                </div>
              );
        }
    };

    return (
        <div>{renderPictures()}</div>
    )
}