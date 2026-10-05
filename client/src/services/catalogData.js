// Client-side Finolex Catalog & Store configuration
// Pre-seeded with 100% accurate data from BODHILIGHTNING Price List

const WIRE_COLORS = ["Red", "Black", "Yellow", "Blue", "Green"];
const SINGLE_COLOR = ["Single Colour"];

export const DEFAULT_CATALOG = [
  // --- 1. FR GOLD (90 MTR) ---
  { id: "fr-gold-0.75-90", category: "FR Gold", length: "90 MTR", size: "0.75 SQ.MM", price: 1965, colors: WIRE_COLORS },
  { id: "fr-gold-1.0-90", category: "FR Gold", length: "90 MTR", size: "1.0 SQ.MM", price: 2690, colors: WIRE_COLORS },
  { id: "fr-gold-1.5-90", category: "FR Gold", length: "90 MTR", size: "1.5 SQ.MM", price: 3910, colors: WIRE_COLORS },
  { id: "fr-gold-2.5-90", category: "FR Gold", length: "90 MTR", size: "2.5 SQ.MM", price: 6215, colors: WIRE_COLORS },
  { id: "fr-gold-4.0-90", category: "FR Gold", length: "90 MTR", size: "4.0 SQ.MM", price: 9115, colors: WIRE_COLORS },
  { id: "fr-gold-6.0-90", category: "FR Gold", length: "90 MTR", size: "6.0 SQ.MM", price: 13675, colors: WIRE_COLORS },

  // --- 2. FR SILVER (45 MTR, 90 MTR, 180 MTR) ---
  // 45 MTR
  { id: "fr-silver-1.0-45", category: "FR Silver", length: "45 MTR", size: "1.0 SQ.MM", price: 1181, colors: WIRE_COLORS },
  { id: "fr-silver-1.5-45", category: "FR Silver", length: "45 MTR", size: "1.5 SQ.MM", price: 1747, colors: WIRE_COLORS },
  { id: "fr-silver-2.5-45", category: "FR Silver", length: "45 MTR", size: "2.5 SQ.MM", price: 2873, colors: WIRE_COLORS },
  { id: "fr-silver-4.0-45", category: "FR Silver", length: "45 MTR", size: "4.0 SQ.MM", price: 4378, colors: WIRE_COLORS },
  { id: "fr-silver-6.0-45", category: "FR Silver", length: "45 MTR", size: "6.0 SQ.MM", price: 6659, colors: WIRE_COLORS },
  // 90 MTR
  { id: "fr-silver-1.0-90", category: "FR Silver", length: "90 MTR", size: "1.0 SQ.MM", price: 2410, colors: WIRE_COLORS },
  { id: "fr-silver-1.5-90", category: "FR Silver", length: "90 MTR", size: "1.5 SQ.MM", price: 3535, colors: WIRE_COLORS },
  { id: "fr-silver-2.5-90", category: "FR Silver", length: "90 MTR", size: "5.765", price: 5765, colors: WIRE_COLORS },
  { id: "fr-silver-4.0-90", category: "FR Silver", length: "90 MTR", size: "4.0 SQ.MM", price: 8755, colors: WIRE_COLORS },
  { id: "fr-silver-6.0-90", category: "FR Silver", length: "90 MTR", size: "6.0 SQ.MM", price: 13300, colors: WIRE_COLORS },
  // 180 MTR
  { id: "fr-silver-1.0-180", category: "FR Silver", length: "180 MTR", size: "1.0 SQ.MM", price: 4785, colors: WIRE_COLORS },
  { id: "fr-silver-1.5-180", category: "FR Silver", length: "180 MTR", size: "1.5 SQ.MM", price: 6925, colors: WIRE_COLORS },
  { id: "fr-silver-2.5-180", category: "FR Silver", length: "180 MTR", size: "2.5 SQ.MM", price: 11420, colors: WIRE_COLORS },
  { id: "fr-silver-4.0-180", category: "FR Silver", length: "180 MTR", size: "4.0 SQ.MM", price: 17800, colors: WIRE_COLORS },
  { id: "fr-silver-6.0-180", category: "FR Silver", length: "180 MTR", size: "6.0 SQ.MM", price: 26735, colors: WIRE_COLORS },

  // --- 3. FRLSH (90 MTR, 180 MTR) ---
  // 90 MTR
  { id: "frlsh-1.0-90", category: "FRLSH", length: "90 MTR", size: "1.0 SQ.MM", price: 2445, colors: SINGLE_COLOR },
  { id: "frlsh-1.5-90", category: "FRLSH", length: "90 MTR", size: "1.5 SQ.MM", price: 3590, colors: SINGLE_COLOR },
  { id: "frlsh-2.5-90", category: "FRLSH", length: "90 MTR", size: "2.5 SQ.MM", price: 5850, colors: SINGLE_COLOR },
  { id: "frlsh-4.0-90", category: "FRLSH", length: "90 MTR", size: "4.0 SQ.MM", price: 8885, colors: SINGLE_COLOR },
  { id: "frlsh-6.0-90", category: "FRLSH", length: "90 MTR", size: "6.0 SQ.MM", price: 13500, colors: SINGLE_COLOR },
  // 180 MTR
  { id: "frlsh-1.0-180", category: "FRLSH", length: "180 MTR", size: "1.0 SQ.MM", price: 4880, colors: SINGLE_COLOR },
  { id: "frlsh-1.5-180", category: "FRLSH", length: "180 MTR", size: "1.5 SQ.MM", price: 7060, colors: SINGLE_COLOR },
  { id: "frlsh-2.5-180", category: "FRLSH", length: "180 MTR", size: "2.5 SQ.MM", price: 11650, colors: SINGLE_COLOR },
  { id: "frlsh-4.0-180", category: "FRLSH", length: "180 MTR", size: "4.0 SQ.MM", price: 18155, colors: SINGLE_COLOR },
  { id: "frlsh-6.0-180", category: "FRLSH", length: "180 MTR", size: "6.0 SQ.MM", price: 27265, colors: SINGLE_COLOR },

  // --- 4. FINOULTRA (90 MTR) ---
  { id: "finoultra-1.0-90", category: "Finoultra", length: "90 MTR", size: "1.0 SQ.MM", price: 2670, colors: SINGLE_COLOR },
  { id: "finoultra-1.5-90", category: "Finoultra", length: "90 MTR", size: "1.5 SQ.MM", price: 3750, colors: SINGLE_COLOR },
  { id: "finoultra-2.5-90", category: "Finoultra", length: "90 MTR", size: "2.5 SQ.MM", price: 6085, colors: SINGLE_COLOR },
  { id: "finoultra-4.0-90", category: "Finoultra", length: "90 MTR", size: "4.0 SQ.MM", price: 9670, colors: SINGLE_COLOR },
  { id: "finoultra-6.0-90", category: "Finoultra", length: "90 MTR", size: "6.0 SQ.MM", price: 14340, colors: SINGLE_COLOR },

  // --- 5. 300/200 MTR FR ---
  { id: "fr-300-1.0", category: "300/200 Mtr FR", length: "300 MTR", size: "1.0 SQ.MM", price: 8155, colors: SINGLE_COLOR },
  { id: "fr-300-1.5", category: "300/200 Mtr FR", length: "300 MTR", size: "1.5 SQ.MM", price: 11810, colors: SINGLE_COLOR },
  { id: "fr-200-2.5", category: "300/200 Mtr FR", length: "200 MTR", size: "2.5 SQ.MM", price: 19485, colors: SINGLE_COLOR },
  { id: "fr-200-4.0", category: "300/200 Mtr FR", length: "200 MTR", size: "4.0 SQ.MM", price: 20250, colors: SINGLE_COLOR },
  { id: "fr-200-6.0", category: "300/200 Mtr FR", length: "200 MTR", size: "6.0 SQ.MM", price: 30420, colors: SINGLE_COLOR },

  // --- 6. 300/200 MTR FRLSH ---
  { id: "frlsh-300-1.0", category: "300/200 Mtr FRLSH", length: "300 MTR", size: "1.0 SQ.MM", price: 8235, colors: SINGLE_COLOR },
  { id: "frlsh-300-1.5", category: "300/200 Mtr FRLSH", length: "300 MTR", size: "1.5 SQ.MM", price: 11930, colors: SINGLE_COLOR },
  { id: "frlsh-200-2.5", category: "300/200 Mtr FRLSH", length: "200 MTR", size: "2.5 SQ.MM", price: 19680, colors: SINGLE_COLOR },
  { id: "frlsh-200-4.0", category: "300/200 Mtr FRLSH", length: "200 MTR", size: "4.0 SQ.MM", price: 20455, colors: SINGLE_COLOR },
  { id: "frlsh-200-6.0", category: "300/200 Mtr FRLSH", length: "200 MTR", size: "6.0 SQ.MM", price: 30725, colors: SINGLE_COLOR },

  // --- 7. MULTI CORE 100 MTR - SINGLE CORE FR ---
  { id: "mc-sc-fr-0.5", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "0.5 SQ.MM", price: 1420, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-0.75", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "0.75 SQ.MM", price: 2054, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-1.0", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "1.0 SQ.MM", price: 2619, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-1.5", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "1.5 SQ.MM", price: 3878, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-2.5", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "2.5 SQ.MM", price: 6374, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-4.0", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "4.0 SQ.MM", price: 9711, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-6.0", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "6.0 SQ.MM", price: 14770, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-10", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "10 SQ.MM", price: 25480, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-16", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "16 SQ.MM", price: 40340, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-25", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "25 SQ.MM", price: 63065, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-35", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "35 SQ.MM", price: 88070, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-50", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "50 SQ.MM", price: 124875, colors: SINGLE_COLOR },

  // --- 8. MULTI CORE 100 MTR - SINGLE CORE FRLSH ---
  { id: "mc-sc-frlsh-0.5", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "0.5 SQ.MM", price: 1455, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-0.75", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "0.75 SQ.MM", price: 2105, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-1.0", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "1.0 SQ.MM", price: 2685, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-1.5", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "1.5 SQ.MM", price: 3975, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-2.5", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "2.5 SQ.MM", price: 6535, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-4.0", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "4.0 SQ.MM", price: 9955, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-6.0", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "6.0 SQ.MM", price: 15140, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-10", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "10 SQ.MM", price: 26115, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-16", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "16 SQ.MM", price: 41350, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-25", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "25 SQ.MM", price: 64640, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-35", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "35 SQ.MM", price: 90270, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-50", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "50 SQ.MM", price: 127995, colors: SINGLE_COLOR },

  // --- 9. MULTI CORE 100 MTR - TWO CORE ---
  { id: "mc-2c-0.5", category: "Multi Core (2 Core)", length: "100 MTR", size: "0.5 SQ.MM", price: 3605, colors: SINGLE_COLOR },
  { id: "mc-2c-0.75", category: "Multi Core (2 Core)", length: "100 MTR", size: "0.75 SQ.MM", price: 4995, colors: SINGLE_COLOR },
  { id: "mc-2c-1.0", category: "Multi Core (2 Core)", length: "100 MTR", size: "1.0 SQ.MM", price: 6240, colors: SINGLE_COLOR },
  { id: "mc-2c-1.5", category: "Multi Core (2 Core)", length: "100 MTR", size: "1.5 SQ.MM", price: 8580, colors: SINGLE_COLOR },
  { id: "mc-2c-2.5", category: "Multi Core (2 Core)", length: "100 MTR", size: "2.5 SQ.MM", price: 13395, colors: SINGLE_COLOR },
  { id: "mc-2c-4.0", category: "Multi Core (2 Core)", length: "100 MTR", size: "4.0 SQ.MM", price: 21815, colors: SINGLE_COLOR },

  // --- 10. MULTI CORE 100 MTR - THREE CORE ---
  { id: "mc-3c-0.5", category: "Multi Core (3 Core)", length: "100 MTR", size: "0.5 SQ.MM", price: 4985, colors: SINGLE_COLOR },
  { id: "mc-3c-0.75", category: "Multi Core (3 Core)", length: "100 MTR", size: "0.75 SQ.MM", price: 6880, colors: SINGLE_COLOR },
  { id: "mc-3c-1.0", category: "Multi Core (3 Core)", length: "100 MTR", size: "1.0 SQ.MM", price: 8720, colors: SINGLE_COLOR },
  { id: "mc-3c-1.5", category: "Multi Core (3 Core)", length: "100 MTR", size: "1.5 SQ.MM", price: 12465, colors: SINGLE_COLOR },
  { id: "mc-3c-2.5", category: "Multi Core (3 Core)", length: "100 MTR", size: "2.5 SQ.MM", price: 20100, colors: SINGLE_COLOR },
  { id: "mc-3c-4.0", category: "Multi Core (3 Core)", length: "100 MTR", size: "4.0 SQ.MM", price: 31895, colors: SINGLE_COLOR },

  // --- 11. MULTI CORE 100 MTR - FOUR CORE ---
  { id: "mc-4c-0.5", category: "Multi Core (4 Core)", length: "100 MTR", size: "0.5 SQ.MM", price: 6375, colors: SINGLE_COLOR },
  { id: "mc-4c-0.75", category: "Multi Core (4 Core)", length: "100 MTR", size: "0.75 SQ.MM", price: 8845, colors: SINGLE_COLOR },
  { id: "mc-4c-1.0", category: "Multi Core (4 Core)", length: "100 MTR", size: "1.0 SQ.MM", price: 11240, colors: SINGLE_COLOR },
  { id: "mc-4c-1.5", category: "Multi Core (4 Core)", length: "100 MTR", size: "1.5 SQ.MM", price: 16020, colors: SINGLE_COLOR },
  { id: "mc-4c-2.5", category: "Multi Core (4 Core)", length: "100 MTR", size: "2.5 SQ.MM", price: 26770, colors: SINGLE_COLOR },
  { id: "mc-4c-4.0", category: "Multi Core (4 Core)", length: "100 MTR", size: "4.0 SQ.MM", price: 41970, colors: SINGLE_COLOR },

  // --- 12. MULTI CORE 100 MTR - SIX CORE ---
  { id: "mc-6c-0.5", category: "Multi Core (6 Core)", length: "100 MTR", size: "0.5 SQ.MM", price: 9485, colors: SINGLE_COLOR },
  { id: "mc-6c-0.75", category: "Multi Core (6 Core)", length: "100 MTR", size: "0.75 SQ.MM", price: 13440, colors: SINGLE_COLOR },
  { id: "mc-6c-1.0", category: "Multi Core (6 Core)", length: "100 MTR", size: "1.0 SQ.MM", price: 17520, colors: SINGLE_COLOR },
  { id: "mc-6c-1.5", category: "Multi Core (6 Core)", length: "100 MTR", size: "1.5 SQ.MM", price: 24410, colors: SINGLE_COLOR },
  { id: "mc-6c-2.5", category: "Multi Core (6 Core)", length: "100 MTR", size: "2.5 SQ.MM", price: 39220, colors: SINGLE_COLOR },
  { id: "mc-6c-4.0", category: "Multi Core (6 Core)", length: "100 MTR", size: "4.0 SQ.MM", price: 61755, colors: SINGLE_COLOR },

  // --- 13. SOLAR DC CABLE (100 MTR) ---
  { id: "solar-2.5-100", category: "Solar DC Cable", length: "100 MTR", size: "2.5 SQ.MM", price: 6280, colors: SINGLE_COLOR },
  { id: "solar-4.0-100", category: "Solar DC Cable", length: "100 MTR", size: "4.0 SQ.MM", price: 9295, colors: SINGLE_COLOR },
  { id: "solar-6.0-100", category: "Solar DC Cable", length: "100 MTR", size: "6.0 SQ.MM", price: 13680, colors: SINGLE_COLOR },

  // --- 14. CCTV CABLE ---
  { id: "cctv-rg59-3+1-90", category: "CCTV Cable", length: "90 MTR", size: "RG59 (3+1)", price: 4600, colors: SINGLE_COLOR },
  { id: "cctv-rg59-3+1-305", category: "CCTV Cable", length: "305 MTR", size: "RG59 (3+1)", price: 15589, colors: SINGLE_COLOR },
  { id: "cctv-genz-3+1-90", category: "CCTV Cable", length: "90 MTR", size: "GENZ 3+1", price: 2615, colors: SINGLE_COLOR },
  { id: "cctv-genz-3+1-180", category: "CCTV Cable", length: "180 MTR", size: "GENZ 3+1", price: 5150, colors: SINGLE_COLOR },
  { id: "cctv-rg59-4+1-90", category: "CCTV Cable", length: "90 MTR", size: "RG59 (4+1)", price: 5050, colors: SINGLE_COLOR },
  { id: "cctv-rg59-4+1-305", category: "CCTV Cable", length: "305 MTR", size: "RG59 (4+1)", price: 17114, colors: SINGLE_COLOR },
  { id: "cctv-genz-4+1-90", category: "CCTV Cable", length: "90 MTR", size: "GENZ 4+1", price: 2950, colors: SINGLE_COLOR },
  { id: "cctv-genz-4+1-180", category: "CCTV Cable", length: "180 MTR", size: "GENZ 4+1", price: 5830, colors: SINGLE_COLOR },

  // --- 15. SUB/FLAT 3CORE ---
  { id: "subflat-1.5", category: "Sub/Flat 3-Core", length: "Per Coil/MTR", size: "1.5 SQ.MM (PVC)", price: 12505, colors: SINGLE_COLOR },
  { id: "subflat-2.5", category: "Sub/Flat 3-Core", length: "Per Coil/MTR", size: "2.5 SQ.MM (PVC)", price: 19755, colors: SINGLE_COLOR },
  { id: "subflat-4.0", category: "Sub/Flat 3-Core", length: "Per Coil/MTR", size: "4.0 SQ.MM (PVC)", price: 28235, colors: SINGLE_COLOR },
  { id: "subflat-6.0", category: "Sub/Flat 3-Core", length: "Per Coil/MTR", size: "6.0 SQ.MM (PVC)", price: 41910, colors: SINGLE_COLOR },
  { id: "subflat-10", category: "Sub/Flat 3-Core", length: "Per Coil/MTR", size: "10 SQ.MM (PVC)", price: 77000, colors: SINGLE_COLOR },
  { id: "subflat-16", category: "Sub/Flat 3-Core", length: "Per Coil/MTR", size: "16 SQ.MM (PVC)", price: 121375, colors: SINGLE_COLOR },

  // --- 16. TELEPHONE CABLE (90 MTR) ---
  { id: "tel-1p-0.4-90", category: "Telephone Cable", length: "90 MTR", size: "1 PAIR (0.4 SQ.MM)", price: 845, colors: SINGLE_COLOR },
  { id: "tel-1p-0.5-90", category: "Telephone Cable", length: "90 MTR", size: "1 PAIR (0.5 SQ.MM)", price: 1265, colors: SINGLE_COLOR },
  { id: "tel-2p-0.4-90", category: "Telephone Cable", length: "90 MTR", size: "2 PAIR (0.4 SQ.MM)", price: 1565, colors: SINGLE_COLOR },
  { id: "tel-2p-0.5-90", category: "Telephone Cable", length: "90 MTR", size: "2 PAIR (0.5 SQ.MM)", price: 2265, colors: SINGLE_COLOR },
  { id: "tel-3p-0.4-90", category: "Telephone Cable", length: "90 MTR", size: "3 PAIR (0.4 SQ.MM)", price: 2275, colors: SINGLE_COLOR },
  { id: "tel-3p-0.5-90", category: "Telephone Cable", length: "90 MTR", size: "3 PAIR (0.5 SQ.MM)", price: 3320, colors: SINGLE_COLOR },
  { id: "tel-4p-0.4-90", category: "Telephone Cable", length: "90 MTR", size: "4 PAIR (0.4 SQ.MM)", price: 2940, colors: SINGLE_COLOR },
  { id: "tel-4p-0.5-90", category: "Telephone Cable", length: "90 MTR", size: "4 PAIR (0.5 SQ.MM)", price: 4385, colors: SINGLE_COLOR },
  { id: "tel-5p-0.4-90", category: "Telephone Cable", length: "90 MTR", size: "5 PAIR (0.4 SQ.MM)", price: 3635, colors: SINGLE_COLOR },
  { id: "tel-5p-0.5-90", category: "Telephone Cable", length: "90 MTR", size: "5 PAIR (0.5 SQ.MM)", price: 5470, colors: SINGLE_COLOR },
  { id: "tel-10p-0.4-90", category: "Telephone Cable", length: "90 MTR", size: "10 PAIR (0.4 SQ.MM)", price: 7725, colors: SINGLE_COLOR },
  { id: "tel-10p-0.5-90", category: "Telephone Cable", length: "90 MTR", size: "10 PAIR (0.5 SQ.MM)", price: 11250, colors: SINGLE_COLOR },

  // --- 17. COAXIAL CABLES (JELLY) ---
  { id: "coax-rg59cu-100", category: "Coaxial Cable (Jelly)", length: "100 MTR", size: "RG-59 CU", price: 2490, colors: SINGLE_COLOR },
  { id: "coax-rg59cu-305", category: "Coaxial Cable (Jelly)", length: "305 MTR", size: "RG-59 CU", price: 7595, colors: SINGLE_COLOR },
  { id: "coax-rg6cu-100", category: "Coaxial Cable (Jelly)", length: "100 MTR", size: "RG-6 CU", price: 3460, colors: SINGLE_COLOR },
  { id: "coax-rg6cu-305", category: "Coaxial Cable (Jelly)", length: "305 MTR", size: "RG-6 CU", price: 10553, colors: SINGLE_COLOR },
  { id: "coax-rg11cu-100", category: "Coaxial Cable (Jelly)", length: "100 MTR", size: "RG-11 CU", price: 8115, colors: SINGLE_COLOR },
  { id: "coax-rg11cu-305", category: "Coaxial Cable (Jelly)", length: "305 MTR", size: "RG-11 CU", price: 24751, colors: SINGLE_COLOR },
  { id: "coax-rg6ccs-100", category: "Coaxial Cable (Jelly)", length: "100 MTR", size: "RG-6 CCS", price: 1865, colors: SINGLE_COLOR },
  { id: "coax-rg6ccs-90eco", category: "Coaxial Cable (Jelly)", length: "90M Eco Light", size: "RG-6 CCS", price: 1410, colors: SINGLE_COLOR },
  { id: "coax-rg6ccs-305", category: "Coaxial Cable (Jelly)", length: "305 MTR", size: "RG-6 CCS", price: 5688, colors: SINGLE_COLOR },
  { id: "coax-rg11ccs-100", category: "Coaxial Cable (Jelly)", length: "100 MTR", size: "RG-11 CCS", price: 3680, colors: SINGLE_COLOR },
  { id: "coax-rg11ccs-305", category: "Coaxial Cable (Jelly)", length: "305 MTR", size: "RG-11 CCS", price: 11224, colors: SINGLE_COLOR },
  { id: "coax-rg11cca-100", category: "Coaxial Cable (Jelly)", length: "100 MTR", size: "RG-11 CCA", price: 4270, colors: SINGLE_COLOR },
  { id: "coax-rg11cca-305", category: "Coaxial Cable (Jelly)", length: "305 MTR", size: "RG-11 CCA", price: 13024, colors: SINGLE_COLOR },

  // --- 18. UTP LAN CABLE (305 MTR) ---
  { id: "lan-cat6-305", category: "UTP LAN Cable", length: "305 MTR", size: "CAT6 4P", price: 17710, colors: SINGLE_COLOR },
  { id: "lan-cat5-305", category: "UTP LAN Cable", length: "305 MTR", size: "CAT5 4P", price: 13870, colors: SINGLE_COLOR },

  // --- 19. SPEAKER CABLES (100 MTR) ---
  { id: "spk-0.5-100", category: "Speaker Cable", length: "100 MTR", size: "0.5 SQ.MM", price: 2845, colors: SINGLE_COLOR },
  { id: "spk-0.75-100", category: "Speaker Cable", length: "100 MTR", size: "0.75 SQ.MM", price: 4150, colors: SINGLE_COLOR },
  { id: "spk-1.0-100", category: "Speaker Cable", length: "100 MTR", size: "1.0 SQ.MM", price: 5075, colors: SINGLE_COLOR },
  { id: "spk-1.5-100", category: "Speaker Cable", length: "100 MTR", size: "1.5 SQ.MM", price: 7615, colors: SINGLE_COLOR },
  { id: "spk-2.0-100", category: "Speaker Cable", length: "100 MTR", size: "2.0 SQ.MM", price: 11870, colors: SINGLE_COLOR },
  { id: "spk-2.5-100", category: "Speaker Cable", length: "100 MTR", size: "2.5 SQ.MM", price: 12655, colors: SINGLE_COLOR }
];

export const STORE_INFO = {
  name: "BODHILIGHTNING",
  location: "Perambalur",
  phone: "8940027894",
  whatsappPhone: "918940027894",
  priceListDate: "17.08.2026",
  gstPercentage: 18
};
