import React from "react";
import bagBlue from '../../../../../Images/Icons/step-bag-blue.svg';
import bagGrey from '../../../../../Images/Icons/step-bag-grey.svg';
import formBlue from '../../../../../Images/Icons/step-form-blue.svg';
import formGrey from '../../../../../Images/Icons/step-form-grey.svg';
import giftBlue from '../../../../../Images/Icons/step-gift-blue.svg';
import giftGrey from '../../../../../Images/Icons/step-gift-grey.svg';

export default function FormStep({ step }) {

    return (
        <div className="border px-6 py-4">
            <div className="flex items-center gap-x-4">
                <img src={bagBlue} />
                <div className="flex flex-col">
                    <p className="text-blue-dark text-base">Etape /3</p>
                    <p className="font-semibold text-lg text-grey-dark">Description</p>
                </div>
            </div>

            <div className="flex items-center gap-x-4">
                <img src={bagGrey} />
                <div className="flex flex-col">
                    <p className="text-grey-placeholder text-base">Etape /3</p>
                    <p className="font-semibold text-lg text-grey-placeholder">Description</p>
                </div>
            </div>

            <div className="flex items-center gap-x-4">
                <img src={formBlue} />
                <div className="flex flex-col">
                    <p className="text-blue-dark text-base">Etape /3</p>
                    <p className="font-semibold text-lg text-grey-dark">Description</p>
                </div>
            </div>

            <div className="flex items-center gap-x-4">
                <img src={formGrey} />
                <div className="flex flex-col">
                    <p className="text-grey-placeholder text-base">Etape /3</p>
                    <p className="font-semibold text-lg text-grey-placeholder">Description</p>
                </div>
            </div>

            <div className="flex items-center gap-x-4">
                <img src={giftBlue} />
                <div className="flex flex-col">
                    <p className="text-blue-dark text-base">Etape /3</p>
                    <p className="font-semibold text-lg text-grey-dark">Description</p>
                </div>
            </div>

            <div className="flex items-center gap-x-4">
                <img src={giftGrey} />
                <div className="flex flex-col">
                    <p className="text-grey-placeholder text-base">Etape /3</p>
                    <p className="font-semibold text-lg text-grey-placeholder">Description</p>
                </div>
            </div>

        </div>
    )
}