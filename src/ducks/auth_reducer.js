const initialState = {
    user_id:0,
    username:'',
    profile_pic:'',
    workout_name:'',
    workout_id:0,
    workout_list: []
    
}
const UPDATE_USER = "UPDATE_USER"
const CLEAR_USER = "CLEAR_USER"
const UPDATE_WORKOUT ="UPDATE_WORKOUT"
const CLEAR_WORKOUT = "CLEAR_WORKOUT"
const UPDATE_WORKOUTLIST = "UPDATE_WORKOUTLIST"
const CLEAR_WORKOUTLIST= "CLEAR_WORKOUTLIST"

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
export function updateWorkoutList(workout_list){
    return{
        type: UPDATE_WORKOUTLIST,
        payload: workout_list
    }
}
export function clearWorkoutList(){
    return{
        type: CLEAR_WORKOUTLIST
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
        const {workout_name, workout_id} = payload
        return {...state, workout_id, workout_name}
    case CLEAR_WORKOUT:
        return {...state, workout_id:0, workout_name: ''}
    case UPDATE_WORKOUTLIST:
        return {...state, workout_list: [...payload]}
    case CLEAR_WORKOUTLIST:
        return {...state, workout_list:[]}
    default:
         return state
    }
}