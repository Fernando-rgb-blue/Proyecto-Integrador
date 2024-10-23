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
            {image ? (
                <Image className="rounded-lg w-full h-full mb-1" src={image} width="0" height="0" sizes="100vw" style={{ width: '100%', height: 'auto' }} alt="Foto" />
            ) : (
                <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
                    Sin imagen
                </div>
            )}
            <label>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="block border border-gray-300 rounded-lg p-2 text-center font-bold cursor-pointer">
                    Editar foto
                </span>
            </label>
            {image !== '/images/props/pfp_default.png' && (
                <button className="secondary py-2 text-center mt-2 px-[69px]"
                onClick={() => setImage("/images/props/pfp_default.png")}>
                    Quitar foto
                </button>
            )}
        </>
    );
}