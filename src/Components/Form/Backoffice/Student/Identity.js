import React, {useState, useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../../../Styles/Form/Backoffice/studentIdentity.css"

export default function StudentIdentityForm({ formData, setFormData, toggleEditState }) {
    const { REACT_APP_API_URL } = process.env;
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        const fetchGenders = async () => {
            try {
                const response = await fetch(`${REACT_APP_API_URL}/api/users/genders`);
                if (response.ok) {
                    const data = await response.json();
                    setGenders(data);
                } else {
                    console.error('Failed to fetch genders');
                }
            } catch (error) {
                console.error('Error fetching genders:', error);
            }
        };

        fetchGenders();
    }, []);

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required("Prénom est requis"),
        name: Yup.string().required("Nom est requis"),
        gender: Yup.string().required("Genre est requis"),
        birthdate: Yup.date().required("Date de naissance est requise"),
        email: Yup.string().email("Email invalide").required("Email est requis"),
        cellphone: Yup.string()
            .matches(/^0\d{9}$/, "Téléphone invalide")
            .required("Téléphone est requis"),
        address: Yup.string().required("Adresse est requise"),
        additionalAddress: Yup.string(),
        city: Yup.string().required("Ville est requise"),
        zipCode: Yup.string().required("Code postal est requis"),
    });

    const handleSubmit = (values) => {
        setFormData(values);
        toggleEditState();
    };

    const handleFileChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        setFieldValue("profileImage", file);
    };

    return (
        <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, errors, touched }) => (
                <Form className="flex flex-wrap justify-between items-start px-4 py-6">
                    <div className="w-2/12 relative group">
                        <img
                            src={formData.profileImage === 'null' ? `${REACT_APP_API_URL}/assets/images/users/usr.png` : `${REACT_APP_API_URL}/assets/images/users/${formData.profileImage}`}
                            className="rounded-full h-24 w-24 object-cover cursor-pointer"
                            alt="Profile"
                            onClick={() => document.getElementById('fileInput').click()}
                        />
                        <input
                            id="fileInput"
                            type="file"
                            name="profileImage"
                            onChange={(event) => handleFileChange(event, setFieldValue)}
                            className="hidden"
                        />
                        <div className="absolute inset-0 h-24 w-24 bg-black opacity-0 group-hover:opacity-50 rounded-full flex items-center justify-center cursor-pointer" onClick={() => document.getElementById('fileInput').click()}>
                            <span className="text-white">Changer</span>
                        </div>
                    </div>
                    <div className="w-10/12 flex items-start gap-x-16">
                        <div className="flex flex-col gap-y-4">
                            <label>
                                <span className="font-semibold">Prénom : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="firstname" />
                                <ErrorMessage name="firstname" component="div" className="text-red-500 text-sm" />
                            </label>
                            <label>
                                <span className="font-semibold">Nom : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="name" />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </label>
                            <label>
                                <span className="font-semibold">Genre : </span>
                                <Field name="gender" as="select">
                                    <option value="">Sélectionnez le genre</option>
                                    {genders.map((gender, index) => (
                                        <option key={index} value={gender}>
                                            {gender}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
                            </label>
                            <label>
                                <span className="font-semibold">Date de naissance : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="birthdate" type="date" />
                                <ErrorMessage name="birthdate" component="div" className="text-red-500 text-sm" />
                            </label>
                            <label>
                                <span className="font-semibold">E-mail : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="email" type="email" readOnly />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </label>
                        </div>
                        <div className="flex flex-col gap-y-4">
                            <label>
                                <span className="font-semibold">Téléphone : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="cellphone" />
                                <ErrorMessage name="cellphone" component="div" className="text-red-500 text-sm" />
                            </label>
                            <label>
                                <span className="font-semibold">Adresse : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="address" />
                                <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                            </label>
                            <label>
                                <span className="font-semibold">Complément d'adresse : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="additionalAddress" />
                            </label>
                            <label>
                                <span className="font-semibold">Ville : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="city" />
                                <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                            </label>
                            <label>
                                <span className="font-semibold">Code postal : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="zipCode" />
                                <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm" />
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <button type="submit" className="btn-blue-dark">Enregistrer</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
