import InputMask from 'react-input-mask';

export default function Input(props){
    return(
        <div className={`flex flex-col mt-3`}> 
            <label>{props.label}</label>
            <InputMask 
                type={props.type ?? 'text'}
                value={props.value}
                mask={props.mask}
                maskChar={props.maskChar}
                formatChars={props.formatChars}
                onChange={e => props.onChange?.(e.target.value)}
                required={props.required}
                className={` 
                    px-4 py-3 rounded-lg bg-gray-300 mt-2
                    border focus:border-purple-500 focus:bg-white
                    focus:outline-none
                `}
                style={props.style}
                ref={props.ref}
            />
        </div>
    )
}