import React, {useState} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";

export default function Index({ auth, lessons = [], thema_id }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        les_name: "",
        les_number: lessons.length > 0 ? lessons[lessons.length - 1].les_number + 1 : 1,
        thema_id: thema_id,
        les_type: "",
    });

    const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleDropdownSelect = (value) => {
        let displayText;
        switch (value) {
            case 1:
            displayText = "Kahoot";
            break;
            case 2:
            displayText = "connect the words";
            break;
            case 3:
            displayText = "spelling";
            break;
            default:
            displayText = "onbekend les type";
        }
        setSelectedDropdownValue(displayText);
        setData("les_type", parseInt(value, 10)); // Update the useForm state
    };

    const submit = (e) => {
        e.preventDefault();
        if (!data.les_name) {
            setErrorMessage("Please enter a name for the lesson.");
            return;
        }
        if (!data.les_type) {
            setErrorMessage("Please select a lesson type.");
            return;
        }
        setErrorMessage(""); 
        post(route("LessonsMakenStore"), {
            onSuccess: () => {
                reset();
                setSelectedDropdownValue("");
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Lessen Maken
                </h2>
            }
        >
            <form
                onSubmit={submit}
                encType="multipart/form-data"
                className="p-6 max-w-3xl mx-auto"
            >
                {errorMessage && (
                    <div className="mb-4 text-red-600">
                        {errorMessage}
                    </div>
                )}
                <div
                    className="p-4 rounded mb-4"
                    style={{ backgroundColor: "#bbc4dd" }}
                >
                    <h1 className="mb-2 font-semibold">Naam van de les</h1>
                    <input
                        id="les_name"
                        value={data.les_name}
                        placeholder="Naam van de Les"
                        className="block w-full bg-white border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm p-2"
                        onChange={(e) => setData("les_name", e.target.value)}
                    />
                </div>
                <div
                    className="p-4 rounded mb-4"
                    style={{ backgroundColor: "#bbc4dd" }}
                >
                    <h1 className="mb-2 font-semibold">type les</h1>
                    <h2 className="block w-full bg-white border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm p-2">{selectedDropdownValue || "Type les"}</h2>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button type="button">
                                selecteer les type
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <ul>
                                <li onClick={() => handleDropdownSelect(1)}>Kahhoot</li>
                                <li onClick={() => handleDropdownSelect(2)}>Connect the words</li>
                                <li onClick={() => handleDropdownSelect(3)}>Spelling</li>
                            </ul>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
                <div className="text-right">
                    <PrimaryButton disabled={processing}>Opslaan</PrimaryButton>
                </div>
            </form>
            {lessons.length > 0 ? (
                lessons.map((lesson, index) => (
                    <div
                        key={index}
                        className="p-4 bg-gray-200 rounded shadow-lg"
                        style={{ backgroundColor: "#bbc4dd" }}
                    >
                        <h1 className="font-semibold text-lg text-gray-800">
                            {lesson.les_name}
                        </h1>
                        <p className="text-gray-700">Lesnummer: {lesson.les_number}</p>
                        <p className="text-gray-700">Les type: {lesson.les_type}</p>
                    </div>
                ))
            ) : (
                <p>Er zijn geen lessen gevonden</p>
            )}
        </AuthenticatedLayout>
    );
}
