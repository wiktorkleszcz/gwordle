type SliderType = {
    desc?: string,
    min: number,
    max: number,
    value: number,
    handleChange: (value: number) => void
}

export default function Slider({desc, min, max, value, handleChange}: SliderType) {
    return (
        <label className="flex flex-col gap-1 w-full text-white">
            {desc && <span>{desc}: {value}</span>}
            <input
                min={min}
                max={max}
                value={value}
                type='range'
                onChange={(e) => handleChange(Number(e.target.value))}
            />
        </label>
    )
}