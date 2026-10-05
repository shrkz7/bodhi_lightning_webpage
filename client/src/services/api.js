import { DEFAULT_CATALOG, STORE_INFO } from './catalogData';

const BASE_URL = '/api';

export const api = {
  // Fetch active products
  async getProducts() {
    try {
      const res = await fetch(`${BASE_URL}/products`);
      if (res.ok) {
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          return data.products;
        }
      }
    } catch (e) {
      console.warn("API unavailable, falling back to local cloud cache:", e);
    }
    return DEFAULT_CATALOG;
  },

  // Fetch store info
  async getStoreInfo() {
    try {
      const res = await fetch(`${BASE_URL}/store-info`);
      if (res.ok) {
        const data = await res.json();
        if (data.storeInfo) return data.storeInfo;
      }
    } catch (e) {
      console.warn("API store-info unavailable, using default:", e);
    }
    return STORE_INFO;
  },

  // Save generated quote
  async saveQuote(quoteData) {
    try {
      const res = await fetch(`${BASE_URL}/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Could not sync quote to server:", e);
    }
    return { success: true, quote: quoteData };
  },

  // Admin login
  async adminLogin(username, password) {
    try {
      const res = await fetch(`${BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        sessionStorage.setItem('bl_admin_token', data.token);
        return { success: true, token: data.token };
      }
      return { success: false, error: data.error || 'Invalid credentials' };
    } catch (e) {
      // In standalone client mode fallback
      if (username === 'admin' && (password === 'bodhi@8940027894' || password === 'admin123')) {
        const token = 'local_adm_' + Date.now();
        sessionStorage.setItem('bl_admin_token', token);
        return { success: true, token };
      }
      return { success: false, error: 'Connection failed: ' + e.message };
    }
  },

  adminLogout() {
    const token = sessionStorage.getItem('bl_admin_token');
    if (token) {
      fetch(`${BASE_URL}/admin/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    }
    sessionStorage.removeItem('bl_admin_token');
  },

  getAdminToken() {
    return sessionStorage.getItem('bl_admin_token');
  },

  isAdminLoggedIn() {
    return !!sessionStorage.getItem('bl_admin_token');
  },

  // Admin CRUD for products
  async adminAddProduct(product) {
    const token = this.getAdminToken();
    const res = await fetch(`${BASE_URL}/admin/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(product)
    });
    return await res.json();
  },

  async adminUpdateProduct(id, updates) {
    const token = this.getAdminToken();
    const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    });
    return await res.json();
  },

  async adminDeleteProduct(id) {
    const token = this.getAdminToken();
    const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  },

  async adminResetCatalog() {
    const token = this.getAdminToken();
    const res = await fetch(`${BASE_URL}/admin/reset`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  },

  async adminGetQuotes() {
    const token = this.getAdminToken();
    const res = await fetch(`${BASE_URL}/admin/quotes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  },

  async adminGetCloudSettings() {
    const token = this.getAdminToken();
    const res = await fetch(`${BASE_URL}/admin/cloud-settings`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  },

  async adminUpdateCloudSettings(settings) {
    const token = this.getAdminToken();
    const res = await fetch(`${BASE_URL}/admin/cloud-settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(settings)
    });
    return await res.json();
  }
};
