type InputBoxProps = {
    label: string,
    placeholder: string,
    type?:string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=>void;
}

export function InputBox({label, placeholder, type="text", onChange}: InputBoxProps){
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input placeholder={placeholder} type={type} onChange={onChange} className="w-full px-2 py-1 border-slate-200" />
    </div>
}