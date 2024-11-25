import SignInComponent from "@/components/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inicio de sesión | Escuela de Informática",
    description: "Un formulario para editar y descargar el Formato Único de Trámite."
};

const SignInPage = () => {
    return (
        <SignInComponent/>
    );
}

export default SignInPage;