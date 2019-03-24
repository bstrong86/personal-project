const initialState = {
    user_id:0,
    username:'',
    profile_pic:'',
    workout_name:'',
    workout_id:0,
    workout_list: [],
    user_count:0,
    workout_count:0,
    
}
const UPDATE_USER_COUNT = "UPDATE_USER_COUNT"
const CLEAR_USER_COUNT = "UPDATE_USER_COUNT"
const UPDATE_WORKOUT_COUNT = "UPDATE_WORKOUT_COUNT"
const CLEAR_WORKOUT_COUNT = "CLEAR_WORKOUT_COUNT"
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
export function updateUserCount(user_count){
    return{
        type: UPDATE_USER_COUNT,
        payload: user_count
    }
}
export function clearUserCount(){
    return {
        type: CLEAR_USER_COUNT
    }
}
export function updateWorkoutCount(workout_count){
    return {        
        type: UPDATE_WORKOUT_COUNT,
        payload: workout_count
    }
}
export function clearWorkoutCount(){
    return {
        type: CLEAR_WORKOUT_COUNT
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
    case UPDATE_USER_COUNT:
        const {user_count} = payload
        return {...state, user_count}
    case CLEAR_USER_COUNT:
        return {...state, user_count:0}
    case UPDATE_WORKOUT_COUNT:
        const {workout_count} = payload
        return{...state, workout_count}
    case CLEAR_WORKOUT_COUNT:
        return {...state, workout_count:0}
    default:
         return state
    }
}