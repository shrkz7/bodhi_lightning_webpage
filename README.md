# BODHILIGHTNING, Perambalur — Finolex Quotation & Admin Management Portal

A fullstack web application for **BODHILIGHTNING, Perambalur** (Finolex Wires & Cables Dealer) featuring customer quotation generation, downloadable image invoice cards, instant WhatsApp forwarding to **+91 8940027894**, and a hidden admin management portal with a 100% free cloud-ready database architecture.

---

## 🚀 Live Access

- **Website URL:** [http://localhost:5000](http://localhost:5000)
- **Hidden Admin Portal:** [http://localhost:5000/admin](http://localhost:5000/admin) (or click the lock icon in the header / footer)
  - **Default Username:** `admin`
  - **Default Password:** `bodhi@8940027894`
- **WhatsApp Recipient:** `+91 8940027894`

---

## ⚡ Key Features

### 1. Step-by-Step Customer Quotation Flow
Follows the exact specified selection sequence:
1. **Category:** FR Gold, FR Silver, FRLSH, Finoultra, Project Coils, Multi Core, CCTV, Solar DC, Submersible Flat 3-Core, Telephone, Coaxial, LAN, Speaker Cable.
2. **Length:** Dynamically filtered (e.g., 90 MTR, 45 MTR, 180 MTR, 100 MTR, 305 MTR).
3. **Size / Spec:** 0.5, 0.75, 1.0, 1.5, 2.5, 4.0, 6.0 SQ.MM, cores, and pairs with real-time price preview.
4. **Colour:**
   - **FR Gold & FR Silver:** Red, Black, Yellow, Blue, Green.
   - **FRLSH, Multi Core & all others:** Single Colour (standard).
5. **Count Needed:** Numeric counter with `+` / `-` buttons.
6. **Add to Cart:** Real-time subtotal calculation.
7. **Multi-Row Creation:** Click `+ Add Another Item Row` to build multi-item quotes.
8. **Customer Name:** Required to generate the quote.
9. **Discount Calculation:**
   $$\text{Final Price} = (\text{Sum of Items} - \text{Discount \%}) + 18\% \text{ GST}$$
10. **Official Quote Card Preview:** High-contrast invoice card with Bodhilightning Perambalur branding and authorized reference.
11. **Download Quote as Image:** Instant high-resolution PNG download via `html-to-image`.
12. **Share to WhatsApp:** Shares the quote image directly to `+918940027894` via Web Share API or downloads the image and launches WhatsApp with the itemized breakdown.

### 2. Hidden Admin Portal (`/admin` and `/api/admin`)
- **Protected Access:** Token-based admin session.
- **Product Management:** Search, filter by category, edit prices in-place, delete products, or add new items.
- **Restore Catalog:** 1-click restore to the original Finolex price sheet.
- **Quote Logs:** Review all quotes submitted by customers.
- **Free Cloud DB Settings:** Configure your free Supabase PostgreSQL or Firebase Firestore database connection with zero code changes.

### 3. 100% Free Cloud Database Architecture
- **Zero Local Disk Writes:** Completely eliminates local file persistence dependencies.
- **Cloud Ready:** Pre-seeded with the entire Finolex catalog (144 variants across 19 categories).
- **Free Cloud DB Integration:** Easily connect your free Supabase or Firebase Firestore account directly from the Admin Portal.
- **Deployment Ready:** Can be hosted on Vercel, Netlify, or Render 100% free.

---

## 📦 Finolex Price List Summary (Included in Catalog)

| Product Line | Lengths | Sizes (SQ.MM) | Colors Available |
| :--- | :--- | :--- | :--- |
| **FR Gold** | 90 MTR | 0.75, 1.0, 1.5, 2.5, 4.0, 6.0 | Red, Black, Yellow, Blue, Green |
| **FR Silver** | 45 MTR, 90 MTR, 180 MTR | 1.0, 1.5, 2.5, 4.0, 6.0 | Red, Black, Yellow, Blue, Green |
| **FRLSH** | 90 MTR, 180 MTR | 1.0, 1.5, 2.5, 4.0, 6.0 | Single Colour |
| **Finoultra** | 90 MTR | 1.0, 1.5, 2.5, 4.0, 6.0 | Single Colour |
| **300/200 Mtr FR** | 300 MTR, 200 MTR | 1.0, 1.5, 2.5, 4.0, 6.0 | Single Colour |
| **300/200 Mtr FRLSH** | 300 MTR, 200 MTR | 1.0, 1.5, 2.5, 4.0, 6.0 | Single Colour |
| **Multi Core (100 MTR)** | 100 MTR | Single, 2C, 3C, 4C, 6C (0.5 to 50 SQ.MM) | Single Colour |
| **Solar DC Cable** | 100 MTR | 2.5, 4.0, 6.0 | Single Colour |
| **CCTV Cable** | 90 MTR, 180 MTR, 305 MTR | RG59 (3+1), GENZ 3+1, RG59 (4+1), GENZ 4+1 | Single Colour |
| **Sub/Flat 3-Core** | Per Coil/MTR | 1.5, 2.5, 4.0, 6.0, 10, 16 | Single Colour |
| **Telephone Cable** | 90 MTR | 1 to 10 Pair (0.4 & 0.5 SQ.MM) | Single Colour |
| **Coaxial Cable** | 100 MTR, 90M Eco, 305 MTR | RG-59CU, RG-6CU, RG-11CU, RG-6CCS, RG-11CCS, CCA | Single Colour |
| **UTP LAN Cable** | 305 MTR | CAT6 4P, CAT5 4P | Single Colour |
| **Speaker Cable** | 100 MTR | 0.5, 0.75, 1.0, 1.5, 2.0, 2.5 | Single Colour |

---

## 🛠️ Commands

- **Run Server:** `npm start`
- **Rebuild Client:** `npm run build`
- **Run Verification Tests:** `node test_api.js`
