import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import InputForm from "../element/Input/Index";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

function FormLogin() {
  const { login, loading, error } = useAuth();
  const [nisn, setNisn] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(nisn, password); // login pakai nisn & password
      navigate("/dashboard"); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Pesan error */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Login Gagal</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Input NISN */}
      <InputForm
        label="NISN"
        type="text"
        placeholder="Masukkan NISN anda"
        name="nisn"
        value={nisn}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNisn(e.target.value)}
      />

      {/* Input Password */}
      <InputForm
        label="Password"
        type="password"
        placeholder="*********"
        name="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />

      {/* Tombol Login */}
      <Button
        variant="default"
        className="w-full text-xl py-5 rounded-sm"
        type="submit"
        disabled={loading}
      >
        {loading ? "Memproses..." : "Login"}
      </Button>
    </form>
  );
}

export default FormLogin;
