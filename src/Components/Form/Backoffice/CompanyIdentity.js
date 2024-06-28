import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CompanyIdentityForm({ formData, setFormData, toggleEditState }) {
    const { REACT_APP_API_URL } = process.env;
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${REACT_APP_API_URL}/api/company_categories`);
                if (response.ok) {
                    const data = await response.json();
                    const categoriesData = data['hydra:member'];
                    setCategories(categoriesData);
                    console.log(data)
                } else {
                    console.error('Failed to fetch Categories');
                }
            } catch (error) {
                console.error('Error fetching Categories:', error);
            }
        };
        setLoading(true)
        fetchCategories();
        setLoading(false)
    }, []);

    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required("Le nom de l'entreprise est requis"),
        siret: Yup.string().required("Le SIRET est requis"),
        category: Yup.string().required("La catégorie est requise"),
        phone_num: Yup.date().required("Le numéro de téléphone est requis"),
        address: Yup.string().required("L'adresse est requise"),
        additionalAddress: Yup.string(),
        city: Yup.string().required("La ville est requise"),
        zipCode: Yup.string().required("Le code postal est requis"),
    });

    const handleSubmit = (values) => {
        setFormData(values);
        toggleEditState();
    };



    return (
        <Formik
            initialValues={{
                ...formData,
                category: formData.category ? formData.category.id : "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, errors, touched }) => (
                <Form className="w-full flex flex-col gap-y-8 px-4 py-6">
                    <div className="w-full flex items-start gap-x-16">
                        <div className="flex flex-col gap-y-4">
                            <label>
                                <span className="font-semibold">Nom : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="companyName" />
                                <ErrorMessage name="companyName" component="div" className="text-red-500 text-sm" />
                            </label>
                            <label>
                                <span className="font-semibold">SIRET : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="siret" />
                                <ErrorMessage name="siret" component="div" className="text-red-500 text-sm" />
                            </label>
                            <label>
                                <span className="font-semibold">Catégorie : </span>
                                <Field name="category" as="select">
                                    <option value="">Sélectionnez le genre</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                            </label>
                            <label>
                                <span className="font-semibold">Téléphone : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="phone_num" />
                                <ErrorMessage name="phone_num" component="div" className="text-red-500 text-sm" />
                            </label>
                        </div>
                        <div className="flex flex-col gap-y-4">
                            <label>
                                <span className="font-semibold">Adresse : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="address" />
                                <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                            </label>
                            <label>
                                <span className="font-semibold">Complément d'adresse : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="additional_address" />
                                <ErrorMessage name="additional_address" component="div" className="text-red-500 text-sm" />
                            </label>
                            <label>
                                <span className="font-semibold">Ville : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="city" />
                                <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                            </label>
                            <label>
                                <span className="font-semibold">Code postal : </span>
                                <Field className="border-b py-1 ps-2 ms-2" name="zip_code" />
                                <ErrorMessage name="zip_code" component="div" className="text-red-500 text-sm" />
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <button type="submit" className="btn-blue-dark">Enregistrer</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}