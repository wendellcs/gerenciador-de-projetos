import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {
            email: '',
            uid: '',
            online: false,
            projects: [{}]
        }
    },
    reducers: {
        setCurrentUser:(state, action) => {
            state.currentUser = action.payload
        },

        addUserProjects: (state , action) => {
            const {name, userUid} = action.payload

            if ( !name ){
                return alert('O projeto precisa ter um nome')
            }

            if (!userUid) {
                alert('Tivemos um problema ao adicionar o projeto.')
                throw new Error('This project should have received the users uid.')
            }

            if (state.currentUser.projects.find(p => p.name === name)) {
                return alert('Já existe um projeto com esse nome.')
            }

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

export const {setCurrentUser, addUserProjects, logout} = userSlice.actions

export default userSlice.reducer;