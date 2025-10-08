function Label(props:any) {
    const { htmlFor, children } = props;
    return (
        <label htmlFor={htmlFor} 
        className='block text-[color:var(--foreground)]sm:text-md font-bold mb-2'>
            {children}
        </label>
    );
}

export default Label;