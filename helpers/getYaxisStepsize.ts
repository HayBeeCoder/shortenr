import { Y_AXIS_LENGTH } from "../constants"

const getYaxisStepsize = (view: number): number => {
    let one_with_zeros = "1"
    let number_of_zeros = String(view).length
    one_with_zeros += new Array(number_of_zeros).fill(0).join('')
    // console.log("number of zeros: ", number_of_zeros)
    // console.log("type of one_with_zeros: ", one_with_zeros)

    let return_value = Math.ceil(view / parseInt(one_with_zeros)) * parseInt(one_with_zeros)
    // console.log("return value: " , return_value)
    return return_value / Y_AXIS_LENGTH
}



export default getYaxisStepsize