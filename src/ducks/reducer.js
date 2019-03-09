const initialState = {
    user_id:0,
    username:'',
    profile_pic:'',
    workout_name:'',
    workout_id:0
    
}
const UPDATE_USER = "UPDATE_USER"
const CLEAR_USER = "CLEAR_USER"
const UPDATE_WORKOUT ="UPDATE_WORKOUT"
const CLEAR_WORKOUT = "CLEAR_WORKOUT"

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}
export function clearUser() {
    return {
        type: CLEAR_USER
    }
}

export function updateWorkout(workout){
    return {
        type: UPDATE_WORKOUT,
        payload: workout
    }
}
export function clearWorkout() {
    return {
        type: CLEAR_WORKOUT
    }
}

export default function auth_reducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case UPDATE_USER:
        const {user_id, username, profile_pic} = payload
        return { ...state, user_id, username, profile_pic}
    case CLEAR_USER:
        return {...state, user_id: 0, username: '', profile_pic:''}
    case UPDATE_WORKOUT:
        const {workout_name} = payload
        const workout_id = payload.id
        return {...state, workout_id, workout_name}
    case CLEAR_WORKOUT:
        return {...state, workout_id:0, workout_name: ''}
    default:
         return state
    }
}