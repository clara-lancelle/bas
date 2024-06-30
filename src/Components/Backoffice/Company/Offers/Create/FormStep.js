import React, { useState } from "react";
import bagBlue from '../../../../../Images/Icons/step-bag-blue.svg';
import bagGrey from '../../../../../Images/Icons/step-bag-grey.svg';
import formBlue from '../../../../../Images/Icons/step-form-blue.svg';
import formGrey from '../../../../../Images/Icons/step-form-grey.svg';
import giftBlue from '../../../../../Images/Icons/step-gift-blue.svg';
import giftGrey from '../../../../../Images/Icons/step-gift-grey.svg';

export default function FormStep({ step }) {
    const [activeStep, setActiveStep] = useState(step)
    return (
        <div className="border rounded-lg w-fit flex px-6 py-4 my-8">
            {step == 1 && (
                <div className="flex items-center gap-x-4 pe-28">
                    <img src={bagBlue} />
                    <div className="flex flex-col">
                        <p className="text-blue-dark text-base">Etape 1/3</p>
                        <p className="font-semibold text-lg text-grey-dark">Type d'offre</p>
                    </div>
                </div>
            )}
            {step !== 1 && (
                <div className="flex items-center gap-x-4 pe-28">
                    <img src={bagGrey} />
                    <div className="flex flex-col">
                        <p className="text-grey-placeholder text-base">Etape 1/3</p>
                        <p className="font-semibold text-lg text-grey-placeholder">Type d'offre</p>
                    </div>
                </div>
            )}
            {step == 2 && (
                <div className="flex items-center gap-x-4 px-28 border-x">
                    <img src={formBlue} />
                    <div className="flex flex-col">
                        <p className="text-blue-dark text-base">Etape 2/3</p>
                        <p className="font-semibold text-lg text-grey-dark">Description</p>
                    </div>
                </div>
            )}

            {step !== 2 && (
                <div className="flex items-center gap-x-4 px-28 border-x">
                    <img src={formGrey} />
                    <div className="flex flex-col">
                        <p className="text-grey-placeholder text-base">Etape 2/3</p>
                        <p className="font-semibold text-lg text-grey-placeholder">Description</p>
                    </div>
                </div>
            )}
            {step == 3 && (
                <div className="flex items-center gap-x-4 ps-28">
                    <img src={giftBlue} />
                    <div className="flex flex-col">
                        <p className="text-blue-dark text-base">Etape 3/3</p>
                        <p className="font-semibold text-lg text-grey-dark">Publication</p>
                    </div>
                </div>
            )}
            {step !== 3 && (
                <div className="flex items-center gap-x-4 ps-28">
                    <img src={giftGrey} />
                    <div className="flex flex-col">
                        <p className="text-grey-placeholder text-base">Etape 3/3</p>
                        <p className="font-semibold text-lg text-grey-placeholder">Publication</p>
                    </div>
                </div>
            )}
        </div>
    )
}