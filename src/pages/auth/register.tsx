import FormRegister from "@/components/fragments/FormRegister";
import AuthLayouts from "@/components/layouts/AuthLayouts";


// import { Link } from "react-router-dom";
function RegisterPage() {
    return(
        <AuthLayouts title="Register" type="register">
            <FormRegister />
            {/* <p>already have an account? <Link to="/login" className="font-bold text-center text-blue-600">Sign Up</Link></p> */}
        </AuthLayouts>
    );
}

export default RegisterPage;