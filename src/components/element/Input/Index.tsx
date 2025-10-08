import React from "react";
import Input from "./Input";
import Label from "./Label";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

function InputForm(props: InputFormProps) {
    const { label, name, type, placeholder, value, onChange } = props;
    return (
        <div className="mb-5">
            <Label htmlFor={name}>{label}</Label>
            <Input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    );
}

export default InputForm;