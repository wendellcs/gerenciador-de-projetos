import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {
            name: '',
            email: '',
            uid: '',
            online: false
        }
    },
    reducers: {
        setCurrentUser:(state, action) => {
            state.currentUser = action.payload
        },
        
        logout: (state) => {
            state.currentUser = {  
                email: '',
                uid: '',
                projects: [],
                online: false,
                userData: {
                    name: '',
                    projects: []
                }
            }
        }
        
    }
})

export const {setCurrentUser, addUserProjects, logout} = userSlice.actions

export default userSlice.reducer;