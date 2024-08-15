import { createSlice } from "@reduxjs/toolkit";

// Modificar conforme necessário
const initialState = {
    user: null
}

// Modelo User
// user: {
//     name: 'Teste User',
//     uid: 1,
//     email: 'exemplar@example.com',
//     projects: [{
//         projectName:'projeto 1',
//         projectState: 'not started',
//         projectTime: '',
//         projectTasks: [{
//             task: 'tarefa 1',
//             status: 'done'
//         }]
//     }]
// }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    }
})

export default userSlice.reducer;