import FormLogin from "@/components/fragments/FormLogin";
import AuthLayouts from "@/components/layouts/AuthLayouts";


// import { Link } from "react-router-dom";
function LoginPage() {
    return(
        <AuthLayouts title="Login" type="login">
            <FormLogin />
        </AuthLayouts>
    );
}

export default LoginPage;