import { api, authApi } from '@/composables/api'

export default{
  fetchProducts(){
    return api.get('/product/all')
  },
  createProduct(){
    return authApi.post('/product/')
  },
  updateProduct(id,fd){
    return authApi.patch(`/product/${id}`,fd)
  },
  deleteProduct(id){
    return authApi.delete(`/product/${id}`)
  }
}