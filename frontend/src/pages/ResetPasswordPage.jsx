import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/api.service";


const ResetPasswordPage = () => {

    const navigate = useNavigate();

    const [Password, setPassword] = useState("");
    const { token } = useParams();

    const onChange = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await resetPassword({ password: Password }, token);
            alert(res.data.message);
        } catch (error) {
            alert(error.response.data.message || "something went wrong");
        }
    }

    return (
        <div className="flex flex-col items-center mt-10">
            <div className="w-72">
                <h1 className="text-xl font-bold mb-4">Reset Password</h1>
                <form onSubmit={onSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col">
                        <label className="text-sm">New Password</label>
                        <input
                            type="password"
                            required className="border border-black p-1"
                            value={Password}
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit" className="border border-black bg-gray-100 py-1 mt-2">
                        Update Password
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <span
                        className="underline text-xs cursor-pointer"
                        onClick={() => {
                            navigate('/login');
                        }}
                    >Return to Login</span>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;

