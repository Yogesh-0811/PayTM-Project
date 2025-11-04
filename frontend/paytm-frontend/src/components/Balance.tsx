type BalanceProps = {
    value: number;
}

export const Balance = ({value}: BalanceProps)=>{
    return <div className="flex items-center">
        <span className="font-bold text-lg">
            Your balance:
        </span>
        <span className="font-semibold ml-4 text-lg">
            ₹ {value}
        </span>
    </div>
}