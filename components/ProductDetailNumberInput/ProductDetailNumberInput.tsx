'use client'

import { NumberInput } from '@mantine/core'
import React, {useState} from 'react'

type Props = {
    max: number
}

const ProductDetailNumberInput = ({max}: Props) => {
    const [value, setValue] = useState<string | number>(1);
    
    return (
        <NumberInput max={max} min={1} value={value} onChange={setValue} />
    )
}

export default ProductDetailNumberInput