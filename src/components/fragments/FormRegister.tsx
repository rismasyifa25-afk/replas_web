import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import InputForm from "../element/Input/Index";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

function FormRegister() {
  const { register, loading, error } = useAuth();
  const [profile, setProfile] = useState<{
    fullname: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    profilePhoto: File | null;
  }>({
    fullname: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (profilePreview) URL.revokeObjectURL(profilePreview);
    };
  }, [profilePreview]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);
    if (profile.password !== profile.confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }
    try {
      // TODO: sertakan profile.profilePhoto saat backend siap
      await register(profile.fullname, profile.phoneNumber, profile.email, profile.password);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Registration Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {validationError && (
        <Alert variant="destructive" className="mb-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Validation Error</AlertTitle>
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}

      <input
        ref={fileInputRef}
        type="file"
        name="profilePhoto"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          setProfile(p => ({ ...p, profilePhoto: file }));
          if (profilePreview) URL.revokeObjectURL(profilePreview);
          setProfilePreview(file ? URL.createObjectURL(file) : null);
        }}
      />
      {profilePreview && (
        <div className="mb-4 flex flex-col items-center">
          <img
            src={profilePreview}
            alt="Profile Preview"
            className="h-24 w-24 rounded-full object-cover border"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {profile.profilePhoto?.name}
          </p>
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        className="w-full mb-4"
        onClick={() => fileInputRef.current?.click()}
      >
        {profile.profilePhoto ? "Change Profile Photo" : "Upload Profile Photo"}
      </Button>

      <InputForm
        label="Fullname"
        type="text"
        placeholder="Insert your full name here"
        name="fullname"
        value={profile.fullname}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setProfile(p => ({ ...p, fullname: e.target.value }))
        }
      />
      <InputForm
        label="Phone Number"
        type="number"
        placeholder="Insert your Phone Number here"
        name="phoneNumber"
        value={profile.phoneNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setProfile(p => ({ ...p, phoneNumber: e.target.value }))
        }
      />
      <InputForm
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        name="email"
        value={profile.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setProfile(p => ({ ...p, email: e.target.value }))
        }
      />
      <InputForm
        label="Password"
        type="password"
        placeholder="*********"
        name="password"
        value={profile.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setProfile(p => ({ ...p, password: e.target.value }))
        }
      />
      <InputForm
        label="Confirm Password"
        type="password"
        placeholder="*********"
        name="confirmPassword"
        value={profile.confirmPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setProfile(p => ({ ...p, confirmPassword: e.target.value }))
        }
      />

      <Button
        variant="default"
        className="w-full text-xl py-5 rounded-sm"
        type="submit"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}

export default FormRegister;
