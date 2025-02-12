"use client"

import * as RadixSlider from "@radix-ui/react-slider";
import React from "react";

interface SliderProps {
    value: number;
    onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0])
    }
    return (
        <RadixSlider.Root defaultValue={[1]} value={[value]} max={1} step={0.1} onValueChange={handleChange}
            className="relative flex items-center select-none w-full h-10">
                <RadixSlider.Track className="bg-neutral-800 h-[3px] relative grow rounded-full">
                    <RadixSlider.Range className="absolute h-full bg-white rounded-full" />
                </RadixSlider.Track>
        </RadixSlider.Root>
    );
}

export default Slider;