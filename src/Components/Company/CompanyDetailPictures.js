import React, { useState, useEffect } from "react";

export default function CompanyDetailPictures({pictures}) {
    const { REACT_APP_API_URL } = process.env;

    const renderPictures = () => {
        if (pictures.length === 1) {
            return (
                <div>
                    <img src={`${REACT_APP_API_URL}/assets/images/companies/${pictures[0].path}`} alt={pictures[0].name} className="w-full max-h-[200px] object-cover" />
                </div>
            );
        } else if (pictures.length === 2) {
            return (
                <div className="flex flex-col gap-3">
                    {pictures.map((picture, index) => (
                        <img key={index} src={`${REACT_APP_API_URL}/assets/images/companies/${picture.path}`} alt={picture.name} className="w-full max-h-[200px] object-cover" />
                    ))}
                </div>
            );
        } else if (pictures.length === 3) {
            return (
                <div className="flex">
                    <div className="w-4/6 mr-3">
                        <img src={`${REACT_APP_API_URL}/assets/images/companies/${pictures[0].path}`} alt={pictures[0].name} className="w-full h-full max-h-[404px] object-cover" />
                    </div>
                    <div className="w-2/6 flex flex-col justify-between">
                        <img src={`${REACT_APP_API_URL}/assets/images/companies/${pictures[1].path}`} alt={pictures[1].name} className="h-1/2 object-cover max-h-[200px] mb-1" />
                        <img src={`${REACT_APP_API_URL}/assets/images/companies/${pictures[2].path}`} alt={pictures[2].name} className="h-1/2 object-cover max-h-[200px]" />
                    </div>
                </div>
            );
        } else if (pictures.length === 4) {
            return (
                <div className="grid grid-cols-2 gap-3">
                    {pictures.map((picture, index) => (
                        <img key={index} src={`${REACT_APP_API_URL}/assets/images/companies/${picture.path}`} alt={picture.name} className="w-full h-full object-cover max-h-[200px]" />
                    ))}
                </div>
            );
        } else {
            return (
                <div>
                  <div className="flex mb-3">
                    <div className="w-4/6 mr-3">
                      <img src={`${REACT_APP_API_URL}/assets/images/companies/${pictures[0].path}`} alt={pictures[0].name} className="h-full object-cover max-h-[400px] w-full" />
                    </div>
                    <div className="w-2/6 flex flex-col justify-between">
                      <img src={`${REACT_APP_API_URL}/assets/images/companies/${pictures[1].path}`} alt={pictures[1].name} className="h-1/2 object-cover mb-3 max-h-[194px] w-full" />
                      <img src={`${REACT_APP_API_URL}/assets/images/companies/${pictures[2].path}`} alt={pictures[2].name} className="h-1/2 object-cover max-h-[194px] w-full" />
                    </div>
                  </div>
                  <div className="flex mb-3">
                    <div className="w-4/6 mr-3">
                        <img src={`${REACT_APP_API_URL}/assets/images/companies/${pictures[3].path}`} alt={pictures[3].name} className="w-full h-full object-cover max-h-[200px] w-full" />
                    </div>
                    <div className="w-2/6">
                        <img src={`${REACT_APP_API_URL}/assets/images/companies/${pictures[4].path}`} alt={pictures[4].name} className="w-full h-full object-cover max-h-[200px] w-full" />
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