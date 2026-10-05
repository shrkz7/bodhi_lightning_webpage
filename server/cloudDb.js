// Cloud Database Adapter
// Zero local disk storage. Supports free cloud providers (Firebase / Supabase / Cloud REST)
import { DEFAULT_CATALOG, STORE_INFO } from './seedCatalog.js';

class CloudDatabase {
  constructor() {
    // In-memory runtime state (zero local file writes)
    this.products = [...DEFAULT_CATALOG];
    this.quotes = [];
    this.adminConfig = {
      username: process.env.ADMIN_USER || "admin",
      password: process.env.ADMIN_PASSWORD || "bodhi@8940027894",
      cloudProvider: process.env.CLOUD_PROVIDER || "cloud_ready", // "supabase" | "firebase" | "cloud_ready"
      supabaseUrl: process.env.SUPABASE_URL || "",
      supabaseKey: process.env.SUPABASE_KEY || "",
      firebaseConfig: process.env.FIREBASE_CONFIG || ""
    };
    this.storeInfo = { ...STORE_INFO };
  }

  // --- Products CRUD ---
  async getProducts() {
    // If Supabase is configured, fetch from Supabase
    if (this.adminConfig.cloudProvider === "supabase" && this.adminConfig.supabaseUrl && this.adminConfig.supabaseKey) {
      try {
        const res = await fetch(`${this.adminConfig.supabaseUrl}/rest/v1/products?select=*`, {
          headers: {
            "apikey": this.adminConfig.supabaseKey,
            "Authorization": `Bearer ${this.adminConfig.supabaseKey}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) return data;
        }
      } catch (err) {
        console.warn("Supabase fetch failed, using cloud-ready catalog:", err.message);
      }
    }
    return this.products;
  }

  async addProduct(product) {
    const newProduct = {
      ...product,
      id: product.id || `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      price: Number(product.price)
    };

    if (this.adminConfig.cloudProvider === "supabase" && this.adminConfig.supabaseUrl && this.adminConfig.supabaseKey) {
      try {
        await fetch(`${this.adminConfig.supabaseUrl}/rest/v1/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": this.adminConfig.supabaseKey,
            "Authorization": `Bearer ${this.adminConfig.supabaseKey}`
          },
          body: JSON.stringify(newProduct)
        });
      } catch (err) {
        console.error("Supabase insert error:", err.message);
      }
    }

    this.products.push(newProduct);
    return newProduct;
  }

  async updateProduct(id, updates) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.products[index] = {
      ...this.products[index],
      ...updates,
      price: updates.price !== undefined ? Number(updates.price) : this.products[index].price
    };

    if (this.adminConfig.cloudProvider === "supabase" && this.adminConfig.supabaseUrl && this.adminConfig.supabaseKey) {
      try {
        await fetch(`${this.adminConfig.supabaseUrl}/rest/v1/products?id=eq.${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "apikey": this.adminConfig.supabaseKey,
            "Authorization": `Bearer ${this.adminConfig.supabaseKey}`
          },
          body: JSON.stringify(this.products[index])
        });
      } catch (err) {
        console.error("Supabase update error:", err.message);
      }
    }

    return this.products[index];
  }

  async deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.products.splice(index, 1);

    if (this.adminConfig.cloudProvider === "supabase" && this.adminConfig.supabaseUrl && this.adminConfig.supabaseKey) {
      try {
        await fetch(`${this.adminConfig.supabaseUrl}/rest/v1/products?id=eq.${id}`, {
          method: "DELETE",
          headers: {
            "apikey": this.adminConfig.supabaseKey,
            "Authorization": `Bearer ${this.adminConfig.supabaseKey}`
          }
        });
      } catch (err) {
        console.error("Supabase delete error:", err.message);
      }
    }

    return true;
  }

  async resetCatalogToDefault() {
    this.products = [...DEFAULT_CATALOG];

    if (this.adminConfig.cloudProvider === "supabase" && this.adminConfig.supabaseUrl && this.adminConfig.supabaseKey) {
      try {
        // Clear & upsert default catalog in Supabase
        await fetch(`${this.adminConfig.supabaseUrl}/rest/v1/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": this.adminConfig.supabaseKey,
            "Authorization": `Bearer ${this.adminConfig.supabaseKey}`,
            "Prefer": "resolution=merge-duplicates"
          },
          body: JSON.stringify(DEFAULT_CATALOG)
        });
      } catch (err) {
        console.error("Supabase reset sync error:", err.message);
      }
    }

    return this.products;
  }

  // --- Quotes CRUD ---
  async saveQuote(quoteData) {
    const quote = {
      id: quoteData.id || `BLQ-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      ...quoteData
    };
    this.quotes.unshift(quote);

    if (this.adminConfig.cloudProvider === "supabase" && this.adminConfig.supabaseUrl && this.adminConfig.supabaseKey) {
      try {
        await fetch(`${this.adminConfig.supabaseUrl}/rest/v1/quotes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": this.adminConfig.supabaseKey,
            "Authorization": `Bearer ${this.adminConfig.supabaseKey}`
          },
          body: JSON.stringify(quote)
        });
      } catch (err) {
        console.error("Supabase quote insert error:", err.message);
      }
    }

    return quote;
  }

  async getQuotes() {
    return this.quotes;
  }

  async getQuoteById(id) {
    return this.quotes.find(q => q.id === id) || null;
  }

  // --- Admin Config & Cloud Settings ---
  getCloudSettings() {
    return {
      cloudProvider: this.adminConfig.cloudProvider,
      supabaseUrl: this.adminConfig.supabaseUrl ? this.adminConfig.supabaseUrl.replace(/^(https:\/\/[^/]{6}).*(\.[^.]+)$/, "$1...$2") : "",
      hasSupabaseKey: !!this.adminConfig.supabaseKey,
      hasFirebaseConfig: !!this.adminConfig.firebaseConfig,
      storeInfo: this.storeInfo,
      totalProducts: this.products.length,
      totalQuotes: this.quotes.length
    };
  }

  updateCloudSettings(settings) {
    if (settings.cloudProvider) this.adminConfig.cloudProvider = settings.cloudProvider;
    if (settings.supabaseUrl) this.adminConfig.supabaseUrl = settings.supabaseUrl;
    if (settings.supabaseKey) this.adminConfig.supabaseKey = settings.supabaseKey;
    if (settings.firebaseConfig) this.adminConfig.firebaseConfig = settings.firebaseConfig;
    if (settings.adminPassword) this.adminConfig.password = settings.adminPassword;
    return this.getCloudSettings();
  }

  verifyAdmin(username, password) {
    return username === this.adminConfig.username && password === this.adminConfig.password;
  }
}

export const cloudDb = new CloudDatabase();
