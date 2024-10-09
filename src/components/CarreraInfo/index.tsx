// components/CarreraInfo.tsx 

const CarreraInfo = () => {
return (
    <div className="flex flex-wrap justify-center gap-9 py-16 md:py-20 lg:py-28">
        <div className="bg-primary text-white rounded-lg p-6 shadow-lg w-64 h-64 flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold">Acreditación</h3>
            <div className="flex justify-center mt-4">
            {/* Aquí podrías usar un componente de icono */}
            <div
                style={{
                    backgroundImage: "url('/images/carrera/icacit.svg')",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "100px", // Ajusta el ancho y alto según necesites
                    height: "100px",
                }}
            >
                {/* Contenido del div */}
            </div>
            </div>
            <p className="text-sm text-center mt-2">
            Con Modelo ICACIT
            </p>
        </div>

        <div className="bg-primary text-white rounded-lg p-6 shadow-lg w-64 h-64 flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold">Duración</h3>
            <div className="flex justify-center mt-4">
            {/* Aquí podrías usar un componente de icono */}
            <div
                style={{
                    backgroundImage: "url('/images/carrera/diez.svg')",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "100px", // Ajusta el ancho y alto según necesites
                    height: "100px",
                }}
            >
                {/* Contenido del div */}
            </div>
            </div>
            <p className="text-sm text-center mt-2">
            Ciclos Académicos y 215 Creditos
            </p>
        </div>

        <div className="bg-primary text-white rounded-lg p-6 shadow-lg w-64 h-64 flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold">Grado Académico</h3>
            <div className="flex justify-center mt-4">
            {/* Aquí podrías usar un componente de icono */}
            <div
                style={{
                    backgroundImage: "url('/images/carrera/bachiller.svg')",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "100px", // Ajusta el ancho y alto según necesites
                    height: "100px",
                }}
            >
                {/* Contenido del div */}
            </div>
            </div>
            <p className="text-sm text-center mt-2">
            Bachiller en Ciencias de la Computación
            </p>
        </div>

        <div className="bg-primary text-white rounded-lg p-6 shadow-lg w-64 h-64 flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold">Título profesional</h3>
            <div className="flex justify-center mt-4">
            {/* Aquí podrías usar un componente de icono */}
            <div
                style={{
                    backgroundImage: "url('/images/carrera/titulo.svg')",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "100px", // Ajusta el ancho y alto según necesites
                    height: "100px",
                }}
            >
                {/* Contenido del div */}
            </div>
            </div>
            <p className="text-sm text-center mt-2">
            Ingeniero Informático
            </p>
        </div>
    </div>
);
};

export default CarreraInfo;