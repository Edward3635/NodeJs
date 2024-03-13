import axios from 'axios'

const instance = axios.create({
	// baseURL: 'https://nodejs-production-9965.up.railway.app/shops'
	baseURL: 'http://localhost:5000/'
})

export const drugStoreAPI = {
	async getShops() {
		const response = await instance.get('shops')
		return response.data
	},
	async getProductsByShop(shopId) {
		const response = await instance.get(`shops/${shopId}`)
		return response.data
	},
	async submit(obj) {
		const response = await instance.post(`shops/order`, { ...obj })
		return response.data
	}
}
