const initialState = {
    id:0,
    username:'',
    profile_pic:'',
    name:'',
    workout_id:0
    
}

const UPDATE_USER = "UPDATE_USER"
const CLEAR_USER = "CLEAR_USER"
const UPDATE_WORKOUT ="UPDATE_WORKOUT"

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function updateWorkout(workout){
    return {
        type: UPDATE_WORKOUT,
        payload: workout
    }
}

export function clearUser() {
    return {
        type: CLEAR_USER
    }
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case UPDATE_USER:
            const {id, username, profile_pic} = payload
            return { ...state, id, username, profile_pic}
        case CLEAR_USER:
            return {...state, id: 0, username: '', profile_pic:''}
        default:
        return state;
        case UPDATE_WORKOUT:
            const {name} = payload
            const workout_id = payload.workout.id
            return {...state, workout_id, name}
    }
}