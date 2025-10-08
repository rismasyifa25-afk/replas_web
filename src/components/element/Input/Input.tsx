import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // You can add any custom props here if needed
}

function Input(props: InputProps) {
    const {type, placeholder, name, value, onChange} = props;
    return (
        <input type={type} 
        className="lg:text-lg md:text-md sm:text-sm xl:text-xl border border-[#CD242C] rounded 2-full py-2 px-3 text-[color:var(--foreground)] placeholder-[color:var(--placeholder)] w-full"
        placeholder={placeholder} 
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        />
    )
}

export default Input;