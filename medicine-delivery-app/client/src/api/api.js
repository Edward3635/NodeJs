import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://nodejs-production-9965.up.railway.app/'
	// baseURL:'https://nodejs-production-9965.up.railway.app/'
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
		const response = await instance.post(`orders`, { ...obj })
		return response.data
	}
}
