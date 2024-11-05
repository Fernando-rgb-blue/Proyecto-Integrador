import { redirect } from "next/navigation";

const DashboardPage = () => {
    return(
        redirect('/dashboard/profile')
    );
}

export default DashboardPage;