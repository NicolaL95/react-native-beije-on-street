import React, { FC, useState } from 'react'
import { Pressable } from 'react-native'
import { eventEmit } from '../../utils/eventEmitter'
import { fixedDimensions } from '../../styles/globalStyleVariables'
import styleBrushSizes from '../../styles/components/styleBrushSizes'


interface Brush {
    id: number | string,
    style: Object,
    size: number,
    selected: boolean
}
const brushes: Array<Brush> = [
    {
        id: 0,
        style: styleBrushSizes.brushWidthBtnSmall,
        size: fixedDimensions.brushRadius.small,
        selected: false,
    },
    {
        id: 1,
        style: styleBrushSizes.brushWidthBtnMedium,
        size: fixedDimensions.brushRadius.medium,
        selected: true,
    },
    {
        id: 2,
        style: styleBrushSizes.brushWidthBtnLarge,
        size: fixedDimensions.brushRadius.large,
        selected: false,
    },

]

interface BrushSizesState {
    brushesArr: Brush[]
}
const initialState: BrushSizesState = {
    brushesArr: brushes,
}

const BrushSizes: FC = () => {

    const [state, setState] = useState(initialState);

    const setBrushWidth = (brush: Brush) => () => {
        console.log('new brush width: ', brush.size);

        eventEmit('onChangeBrushWidth', brush.size)

        const newSelection = handleSelectedWidthBtn(brush)
        if (newSelection === undefined) { return }
        setState({
            ...state,
            brushesArr: newSelection
        })
    }

    const handleSelectedWidthBtn = (brushEl: Brush): Brush[] | void => {
        const brushesCopy = [...state.brushesArr]
        if (brushEl.selected) {
            return
        }

        brushesCopy.forEach((el, index) => { el.selected = brushEl.id === index ? true : false; })

        return brushesCopy
    }

    return (<>
        {
            state.brushesArr.map((brush, index) => {
                console.log('render brush n. ', index);
                console.log('brush info ', brush);

                return <Pressable
                    key={`size_${index}`}
                    style={[
                        styleBrushSizes.brushWidthBtn,
                        brush.style,
                        {
                            borderWidth: brush.selected ? 1 / brush.size + 1.5 : 0,
                        }
                    ]}
                    onPress={setBrushWidth(brush)}
                    hitSlop={brush.id === 0 ? 50 : null}
                />
            })
        }
    </>
    )
}
export default BrushSizes