"use client"

import * as RadixSlider from "@radix-ui/react-slider";
import React from "react";

interface SliderProps {
    value: number;
    max?: number;
    step?: number;
    onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange, max = 1, step = 0.1 }) => {
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0])
    }
    return (
        <RadixSlider.Root defaultValue={[1]} value={[value]} max={max} step={step} onValueChange={handleChange}
            className="relative flex items-center select-none w-full h-10">
            <RadixSlider.Track className="bg-neutral-800 h-[3px] relative grow rounded-full">
                <RadixSlider.Range className="absolute h-full bg-white rounded-full" />
            </RadixSlider.Track>
            <RadixSlider.Thumb className="block size-3 rounded-[10px] bg-white focus:shadow-black focus:outline-none"
                aria-label="Volume"
            />
        </RadixSlider.Root>
    );
}

export default Slider;