import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {
            email: '',
            uid: '',
            online: false,
            userData: {
                name: '',
                projects: []
            }
        }
    },
    reducers: {
        setCurrentUser:(state, action) => {
            state.currentUser = action.payload
        },

        // Modificar isso
        addProject: (state , action) => {
            state.currentUser.projects.push(action.payload)
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

export const {setCurrentUser, addProject, logout} = userSlice.actions

export default userSlice.reducer;