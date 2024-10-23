import Image from "next/image";
import { ChangeEvent } from "react";

interface EditableImageProps {
    image: string;
    setImage: (image: string) => void;
}

export default function EditableImage({ image, setImage }: EditableImageProps) {
    async function handleFileChange(ev: ChangeEvent<HTMLInputElement>) {
        const files = ev.target.files;
        if (files && files.length === 1) {
            const data = new FormData();
            data.set('file', files[0]);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                });

                if (response.ok) {
                    const result = await response.json();
                    setImage(result.path);
                } else {
                    console.error('Algo salió mal durante la subida');
                }
            } catch (error) {
                console.error('Error de subida:', error);
            }
        }
    }
    
    return (
        <>
    <div className="flex  flex-row items-center sm:flex-col">
        {image ? (
            <Image
                className="rounded-lg mb-1 sm:w-40 sm:h-40 w-24 h-24 object-cover" // Tamaño pequeño en móviles
                src={image}
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: '80px', height: 'auto' }}
                alt="Foto"
            />
        ) : (
            <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1 sm:w-40 sm:h-40 w-24 h-24">
                Sin imagen
            </div>
        )}

        <div className="flex flex-col sm:ml-4">
            <label>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="block border border-gray-300 rounded-lg p-2 text-center font-bold cursor-pointer ml-10 mt-2 sm:mt-0 sm:ml-0 ">
                    Editar foto
                </span>
            </label>

            {image !== '/images/props/pfp_default.png' && (
                <button
                    className="secondary py-2 text-center ml-10 mt-2 sm:mt-4 px-[40px] sm:ml-0"
                    onClick={() => setImage("/images/props/pfp_default.png")}
                >
                    Quitar foto
                </button>
            )}
        </div>
    </div>
</>
    );
}