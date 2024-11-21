'use client';
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { ChangeEvent, useRef, useState } from "react";

interface FUTFormData {
    date: string;
    to: string;
    name: string;
    dni: string;
    address: string;
    phone: string;
    email: string;
    role: string;
    code: string;
    faculty: string;
    department: string;
    semester: string;
    request: string;
}

interface dateValues {
    day: string;
    month: string;
    year: string;
}

const FUTForm = () => {
    const [formData, setFormData] = useState<FUTFormData>({
        date: "",
        to: "",
        name: "",
        dni: "",
        address: "",
        phone: "",
        email: "",
        role: "",
        code: "",
        faculty: "",
        department: "",
        semester: "",
        request: "",
    });
    const [image, setImage] = useState<string | null>(null);
    const signatureInput = useRef<HTMLInputElement>(null);
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const [formalDate, setFormalDate] = useState<dateValues>({
        day: "",
        month: "",
        year: ""
    });
    const [lines, setLines] = useState<string[]>([]);

    const handleInputChange = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = ev.target;
        setFormData(formData => {
            let newValue = value;

            if (name === 'dni' || name === 'phone') {
                newValue = value.replace(/\D/g, '')
            }

            if (name === 'date') {
                const [year, month, day] = newValue.split('-');
                formalDate.day = day;
                formalDate.month = meses[parseInt(month, 10) - 1];
                formalDate.year = year;
            }

            if (name === 'request') {
                const words = newValue.split(' ');
                const lines: string[] = [];
                let currentLine = '';

                words.forEach(word => {
                    if ((currentLine + word).length > 96) {
                        lines.push(currentLine);
                        currentLine = word;
                    } else {
                        currentLine += (currentLine ? ' ' : '') + word;
                    }
                });

                if (currentLine) {
                    lines.push(currentLine);
                }

                setLines(lines);
            }

            return {
                ...formData,
                [name]: newValue
            }
        });
    }

    const handleImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files[0];
        const fileExtension = file.name.split('.')[1];
        
        if (file) {
            if (fileExtension !== "png") {
                handleResetInput();
                return;
            }
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImage(reader.result as string);
            },
            false,
            );
            reader.readAsDataURL(file);
        }
    }

    const writeToPDF = async () => {
        const url = '/assets/fut/FUT_FINAL.pdf';
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        pdfDoc.setTitle('FUT F-001 - Formato Único de Trámite');

        if (image) {
            const signatureImageBytes = await fetch(image).then((res) => res.arrayBuffer());
            const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
            const size = 120;
            if (signatureImage.width > signatureImage.height) {
                const scaleFactor = size / signatureImage.width;
                const heightScaled = signatureImage.height * scaleFactor;

                firstPage.drawImage(signatureImage, {
                    x: 41,
                    y: 368,
                    width: size,
                    height: heightScaled
                });
            } else {
                const scaleFactor = size / signatureImage.height;
                const widthScaled = signatureImage.width * scaleFactor;
                const xValue = 40 + (size / 2) - (widthScaled / 2);

                firstPage.drawImage(signatureImage, {
                    x: xValue,
                    y: 340,
                    width: widthScaled,
                    height: size
                });
            }
        }
        
        firstPage.drawText(formalDate.day, {
            x: 333,
            y: 749,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(formalDate.month, {
            x: 400,
            y: 749,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(formalDate.year, {
            x: 522,
            y: 749,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(formData.to, {
            x: 83,
            y: 727,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(formData.name, {
            x: 132,
            y: 702,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(formData.dni, {
            x: 463,
            y: 702,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(formData.address, {
            x: 82,
            y: 677,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(formData.phone, {
            x: 360,
            y: 677,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(formData.email, {
            x: 468,
            y: 677,
            size: 8.3,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        if (formData.role !== '') {
            firstPage.drawText('X', {
                x: (formData.role === "alumno" ? 78 : (formData.role === "docente" ? 302 : 400)),
                y: 650,
                size: 23,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            });
        }
        firstPage.drawText(formData.code, {
            x: (formData.role === "" || formData.role === "alumno" ? 180 : 501),
            y: 651,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(formData.faculty, {
            x: 182,
            y: 624,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(formData.department, {
            x: 114,
            y: 604,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(formData.semester, {
            x: 442,
            y: 604,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        let yLine = 570;
        for (let line in lines) {
            firstPage.drawText(lines[line], {
                x: 44,
                y: yLine,
                size: 11.8,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            });
            yLine -= 21;
        }

        firstPage.drawText(formData.name, {
            x: 132,
            y: 273,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText(formData.dni, {
            x: 463,
            y: 273,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        yLine = 239;
        for (let line in lines) {
            firstPage.drawText(lines[line], {
                x: 44,
                y: yLine,
                size: 11.8,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            });
            yLine -= 19;
        }

        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);

        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'FUT.pdf';
        link.click();
    }

    const handleResetInput = () => {
        if (signatureInput.current) {
            signatureInput.current.value = "";
            signatureInput.current.type = "text";
            signatureInput.current.type = "file";
            setImage(null);
        }
    }

    return (
        <>
            <div className="max-w-full sm:max-w-[800px] sm:mx-auto bg-primary/30 dark:bg-slate-800 rounded-md p-4 mt-8 mx-3">
                <p>
                    Llene el formulario para colocar valores en el FUT.
                </p>
                <div className="mt-3 grid grid-cols-1 gap-4">
                    <input
                        name="to"
                        type="text"
                        value={formData.to}
                        onChange={handleInputChange}
                        placeholder="Dirigido a"
                        maxLength={70}
                        className="w-full"
                    />
                    <input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full sm:w-auto text-gray-400"
                    />
                    <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Apellidos y nombres"
                        maxLength={45}
                        className="w-full"
                        autoComplete="off"
                    />
                    <input
                        name="dni"
                        type="text"
                        value={formData.dni}
                        onChange={handleInputChange}
                        placeholder="DNI"
                        maxLength={10}
                        className="w-full sm:w-auto"
                    />
                    <input
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Dirección"
                        maxLength={40}
                        className="w-full"
                        autoComplete="off"
                    />
                    <input
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Teléfono"
                        maxLength={12}
                        className="w-full sm:w-auto"
                        autoComplete="off"
                    />
                    <input
                        name="email"
                        type="text"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Correo electrónico"
                        className="w-full sm:w-auto"
                        autoComplete="off"
                    />
                    <select
                        name="role"
                        onChange={handleInputChange}
                        value={formData.role}
                        className="w-full sm:w-auto text-gray-400"
                    >
                        <option value="">Elija un rol</option>
                        <option value="alumno">Alumno</option>
                        <option value="docente">Docente</option>
                        <option value="administrativo">Administrativo</option>
                    </select>
                    <input
                        name="code"
                        type="text"
                        value={formData.code}
                        onChange={handleInputChange}
                        placeholder="N° Matrícula/Cod. Trabajador"
                        maxLength={12}
                        className="w-full sm:w-auto"
                    />
                    <input
                        name="faculty"
                        type="text"
                        value={formData.faculty}
                        onChange={handleInputChange}
                        placeholder="De la facultad (u oficina) de"
                        maxLength={60}
                        className="w-full"
                    />
                    <input
                        name="department"
                        type="text"
                        value={formData.department}
                        onChange={handleInputChange}
                        placeholder="Escuela o departamento"
                        maxLength={50}
                        className="w-full sm:w-auto"
                    />
                    <input
                        name="semester"
                        type="text"
                        value={formData.semester}
                        onChange={handleInputChange}
                        placeholder="Ciclo o Año"
                        className="w-full sm:w-auto"
                    />
                    <textarea
                        name="request"
                        rows={3}
                        value={formData.request}
                        onChange={handleInputChange}
                        placeholder="Objeto de la solicitud"
                        maxLength={385}
                        className="w-full"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-center">
                    <label htmlFor="signing" className="my-auto">
                        Firma (en PNG)
                    </label>
                    <input
                        id="signing"
                        type="file"
                        accept=".png"
                        onChange={handleImageChange}
                        ref={signatureInput}
                        className="block w-full sm:w-auto"
                    />
                    {image && (
                        <button className="primary p-1 mt-2 sm:mt-0 sm:ml-2" onClick={handleResetInput}>
                            Eliminar imagen
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-10 text-center">
                <button className="primary p-4" onClick={writeToPDF}>
                    Descargar PDF
                </button>
            </div>
            

            <div className="container mx-auto p-4">
                <div className="mt-10 max-w-[900px] mx-auto bg-white mb-10 overflow-x-auto">
                    <svg
                        width="900"
                        height="1200"
                        viewBox="0 0 900 1200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <image
                            href="/assets/fut/FUT_FINAL.svg"
                            x="0"
                            y="0"
                            width="900"
                            height="1200"
                        />
                        <text x="146" y="164" fontSize={17.2} fill="black">
                            {formData.to}
                        </text>
                        <text x="502" y="133" fontSize={17.2} fill="black">
                            {formalDate.day}
                        </text>
                        <text x="596" y="133" fontSize={17.2} fill="black">
                            {formalDate.month}
                        </text>
                        <text x="767" y="133" fontSize={17.2} fill="black">
                            {formalDate.year}
                        </text>
                        <text x="215" y="199" fontSize={17.2} fill="black">
                            {formData.name}
                        </text>
                        <text x="690" y="199" fontSize={17.2} fill="black">
                            {formData.dni}
                        </text>
                        <text x="144" y="235" fontSize={17.2} fill="black">
                            {formData.address}
                        </text>
                        <text x="538" y="235" fontSize={17.2} fill="black">
                            {formData.phone}
                        </text>
                        <text x="692" y="235" fontSize={11} fill="black">
                            {formData.email}
                        </text>
                        {formData.role !== "" && (
                            <text x={formData.role === 'alumno' ? "138" : (formData.role === 'docente' ? "458" : "597")} y="273" fontSize={30} fill="black">
                                X
                            </text>
                        )}
                        <text x={(formData.role === 'alumno' || formData.role === '') ? "284" : "741"} y="273" fontSize={16} fill="black">
                            {formData.code}
                        </text>
                        <text x="286" y="311" fontSize={17.2} fill="black">
                            {formData.faculty}
                        </text>
                        <text x="188" y="340" fontSize={17.2} fill="black">
                            {formData.department}
                        </text>
                        <text x="655" y="340" fontSize={17.2} fill="black">
                            {formData.semester}
                        </text>
                        <text x="88" y="387" fontSize={16} fill="black">
                            {lines.map((line, index) => (
                                <tspan key={index} x="88" dy={index === 0 ? 0 : 30}>
                                    {line}
                                </tspan>
                            ))}
                        </text>
                        {image && (
                            <image id="signature" href={image} x="77" y="536" width={180} height={180} />
                        )}

                        <text x="215" y="811" fontSize={17.2} fill="black">
                            {formData.name}
                        </text>
                        <text x="690" y="811" fontSize={17.2} fill="black">
                            {formData.dni}
                        </text>
                        <text x="88" y="858" fontSize={16} fill="black">
                            {lines.map((line, index) => (
                                <tspan key={index} x="88" dy={index === 0 ? 0 : 28}>
                                    {line}
                                </tspan>
                            ))}
                        </text>
                    </svg>
                </div>
            </div>
        </>
    );
}

export default FUTForm;