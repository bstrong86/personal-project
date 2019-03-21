const initialState = {
    exercise_id: 0,
    exercise_name: '',
    sets: 0,
    reps: 0,
    weight: 0,
    exercise_list:[]
}
const UPDATE_EXERCISE_LIST = "UPDATE_EXERCISE_LIST"
const UPDATE_EXERCISE = "UPDATE_EXERCISE"
const CLEAR_EXERCISE = "CLEAR_EXERCISE"

export function updateExercise(exercise) {
    return {
        type: UPDATE_EXERCISE,
        payload: exercise
    }
}
export function clearExercise() {
    return {
        type: CLEAR_EXERCISE
    }
}
export function updateExerciseList(exercise_list) {
    return {
        type: UPDATE_EXERCISE_LIST,
        payload: exercise_list
    }
}

export default function exercise_reducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case UPDATE_EXERCISE:
            const { exercise_id, exercise_name, sets, reps, weight } = payload
            return { ...state, exercise_id, exercise_name, sets, reps, weight }
        case CLEAR_EXERCISE:
            return { ...state, exercise_id: 0, exercise_name: '', sets: 0, reps: 0, weight: 0 }
        case UPDATE_EXERCISE_LIST:
            return {...state, exercise_list: [...payload]}
        default:
            return state
    }
}