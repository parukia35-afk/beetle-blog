import { api, authApi } from '@/composables/api'

export default{
  fetchProducts(){
    return authApi.get('/product/all')
  },
  createProduct(fd){
    return authApi.post('/product/', fd)
  },
  updateProduct(id,fd){
    return authApi.patch(`/product/${id}`,fd)
  },
  deleteProduct(id){
    return authApi.delete(`/product/${id}`)
  }
}