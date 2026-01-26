import { useApi } from '@/composables/api'

const { api, authApi } = useApi()

export default{
  fetchRecords(){
    return api.get('/record/')
  },
  createRecord(form){
    return authApi.post('/record/',form)
  },
  updateRecord(id,form){
    return authApi.patch(`/record/${id}`,form)
  },
  deleteRecord(id){
    return authApi.delete(`/record/${id}`)
  }
}