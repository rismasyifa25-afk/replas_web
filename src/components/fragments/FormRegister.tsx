import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FormRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    nisn: "",
    jurusan: "",
    kelas: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Username */}
      <div>
        <label className="text-sm font-medium" htmlFor="username">Username</label>
        <Input id="username" name="username" placeholder="Masukkan username" value={formData.username} onChange={handleChange} />
      </div>

      {/* NISN */}
      <div>
        <label className="text-sm font-medium" htmlFor="nisn">NISN</label>
        <Input id="nisn" name="nisn" placeholder="Masukkan NISN" value={formData.nisn} onChange={handleChange} />
      </div>

      {/* Jurusan */}
      <div>
        <label className="text-sm font-medium">Jurusan</label>
        <Select onValueChange={(value) => handleSelectChange("jurusan", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Jurusan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rpl">RPL</SelectItem>
            <SelectItem value="tkj">TKJ</SelectItem>
            <SelectItem value="mm">MM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Kelas */}
      <div>
        <label className="text-sm font-medium">Kelas</label>
        <Select onValueChange={(value) => handleSelectChange("kelas", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Kelas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="x">X</SelectItem>
            <SelectItem value="xi">XI</SelectItem>
            <SelectItem value="xii">XII</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-medium" htmlFor="email">Email</label>
        <Input id="email" name="email" type="email" placeholder="Masukkan email" value={formData.email} onChange={handleChange} />
      </div>

      {/* Password */}
      <div>
        <label className="text-sm font-medium" htmlFor="password">Password</label>
        <Input id="password" name="password" type="password" placeholder="Masukkan password" value={formData.password} onChange={handleChange} />
      </div>

      {/* Tombol Register */}
      <Button type="submit" className="w-full">Daftar</Button>
    </form>
  );
};

export default FormRegister;
