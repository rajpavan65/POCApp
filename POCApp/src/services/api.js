const API_BASE_URL = 'http://10.0.2.2:3000/api'; // Android emulator localhost

class ApiService {
    constructor() {
        this.token = null;
    }

    setToken(token) {
        this.token = token;
    }

    clearToken() {
        this.token = null;
    }

    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    // Auth endpoints
    async signup(name, email, password) {
        return this.request('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
    }

    async login(email, password) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if (data.token) {
            this.setToken(data.token);
        }
        return data;
    }

    // Product endpoints
    async getProducts() {
        return this.request('/products');
    }

    async addProduct(name, price, description) {
        return this.request('/products', {
            method: 'POST',
            body: JSON.stringify({ name, price, description }),
        });
    }

    // Order endpoints
    async createOrder(productId, quantity = 1) {
        return this.request('/orders', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity }),
        });
    }

    async getOrders() {
        return this.request('/orders');
    }
}

export default new ApiService();
