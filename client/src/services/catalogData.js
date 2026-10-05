// Client-side Finolex Catalog & Store configuration
// Pre-seeded with 100% accurate data from BODHILIGHTNING Price List
// List Price w.e.f. 04 Sep 2026

const WIRE_COLORS = ["Red", "Black", "Yellow", "Blue", "Green"];
const SINGLE_COLOR = ["Single Colour"];

export const DEFAULT_CATALOG = [
  // --- 1. FR GOLD (90 MTR) --- [Page 3]
  { id: "fr-gold-0.75-90", category: "FR Gold", length: "90 MTR", size: "0.75 SQ.MM", price: 2025, colors: WIRE_COLORS },
  { id: "fr-gold-1.0-90", category: "FR Gold", length: "90 MTR", size: "1.0 SQ.MM", price: 2770, colors: WIRE_COLORS },
  { id: "fr-gold-1.5-90", category: "FR Gold", length: "90 MTR", size: "1.5 SQ.MM", price: 4025, colors: WIRE_COLORS },
  { id: "fr-gold-2.5-90", category: "FR Gold", length: "90 MTR", size: "2.5 SQ.MM", price: 6400, colors: WIRE_COLORS },
  { id: "fr-gold-4.0-90", category: "FR Gold", length: "90 MTR", size: "4.0 SQ.MM", price: 9390, colors: WIRE_COLORS },
  { id: "fr-gold-6.0-90", category: "FR Gold", length: "90 MTR", size: "6.0 SQ.MM", price: 14085, colors: WIRE_COLORS },

  // --- 2. FR SILVER (45 MTR, 90 MTR, 180 MTR) --- [Page 4]
  // 45 MTR
  { id: "fr-silver-1.0-45", category: "FR Silver", length: "45 MTR", size: "1.0 SQ.MM", price: 1215, colors: WIRE_COLORS },
  { id: "fr-silver-1.5-45", category: "FR Silver", length: "45 MTR", size: "1.5 SQ.MM", price: 1800, colors: WIRE_COLORS },
  { id: "fr-silver-2.5-45", category: "FR Silver", length: "45 MTR", size: "2.5 SQ.MM", price: 2960, colors: WIRE_COLORS },
  { id: "fr-silver-4.0-45", category: "FR Silver", length: "45 MTR", size: "4.0 SQ.MM", price: 4510, colors: WIRE_COLORS },
  { id: "fr-silver-6.0-45", category: "FR Silver", length: "45 MTR", size: "6.0 SQ.MM", price: 6860, colors: WIRE_COLORS },
  // 90 MTR
  { id: "fr-silver-0.75-90", category: "FR Silver", length: "90 MTR", size: "0.75 SQ.MM", price: 1960, colors: WIRE_COLORS },
  { id: "fr-silver-1.0-90", category: "FR Silver", length: "90 MTR", size: "1.0 SQ.MM", price: 2480, colors: WIRE_COLORS },
  { id: "fr-silver-1.5-90", category: "FR Silver", length: "90 MTR", size: "1.5 SQ.MM", price: 3640, colors: WIRE_COLORS },
  { id: "fr-silver-2.5-90", category: "FR Silver", length: "90 MTR", size: "2.5 SQ.MM", price: 5940, colors: WIRE_COLORS },
  { id: "fr-silver-4.0-90", category: "FR Silver", length: "90 MTR", size: "4.0 SQ.MM", price: 9020, colors: WIRE_COLORS },
  { id: "fr-silver-6.0-90", category: "FR Silver", length: "90 MTR", size: "6.0 SQ.MM", price: 13700, colors: WIRE_COLORS },
  // 180 MTR
  { id: "fr-silver-0.75-180", category: "FR Silver", length: "180 MTR", size: "0.75 SQ.MM", price: 3715, colors: WIRE_COLORS },
  { id: "fr-silver-1.0-180", category: "FR Silver", length: "180 MTR", size: "1.0 SQ.MM", price: 4855, colors: WIRE_COLORS },
  { id: "fr-silver-1.5-180", category: "FR Silver", length: "180 MTR", size: "1.5 SQ.MM", price: 7030, colors: WIRE_COLORS },
  { id: "fr-silver-2.5-180", category: "FR Silver", length: "180 MTR", size: "2.5 SQ.MM", price: 11590, colors: WIRE_COLORS },
  { id: "fr-silver-4.0-180", category: "FR Silver", length: "180 MTR", size: "4.0 SQ.MM", price: 18065, colors: WIRE_COLORS },
  { id: "fr-silver-6.0-180", category: "FR Silver", length: "180 MTR", size: "27135", price: 27135, colors: WIRE_COLORS },

  // --- 3. FRLSH (90 MTR, 180 MTR) --- [Page 6]
  // 90 MTR
  { id: "frlsh-0.75-90", category: "FRLSH", length: "90 MTR", size: "0.75 SQ.MM", price: 1990, colors: SINGLE_COLOR },
  { id: "frlsh-1.0-90", category: "FRLSH", length: "90 MTR", size: "1.0 SQ.MM", price: 2515, colors: SINGLE_COLOR },
  { id: "frlsh-1.5-90", category: "FRLSH", length: "90 MTR", size: "1.5 SQ.MM", price: 3695, colors: SINGLE_COLOR },
  { id: "frlsh-2.5-90", category: "FRLSH", length: "90 MTR", size: "2.5 SQ.MM", price: 6030, colors: SINGLE_COLOR },
  { id: "frlsh-4.0-90", category: "FRLSH", length: "90 MTR", size: "4.0 SQ.MM", price: 9155, colors: SINGLE_COLOR },
  { id: "frlsh-6.0-90", category: "FRLSH", length: "90 MTR", size: "6.0 SQ.MM", price: 13905, colors: SINGLE_COLOR },
  // 180 MTR
  { id: "frlsh-0.75-180", category: "FRLSH", length: "180 MTR", size: "0.75 SQ.MM", price: 3755, colors: SINGLE_COLOR },
  { id: "frlsh-1.0-180", category: "FRLSH", length: "180 MTR", size: "1.0 SQ.MM", price: 4905, colors: SINGLE_COLOR },
  { id: "frlsh-1.5-180", category: "FRLSH", length: "180 MTR", size: "1.5 SQ.MM", price: 7100, colors: SINGLE_COLOR },
  { id: "frlsh-2.5-180", category: "FRLSH", length: "180 MTR", size: "2.5 SQ.MM", price: 11705, colors: SINGLE_COLOR },
  { id: "frlsh-4.0-180", category: "FRLSH", length: "180 MTR", size: "4.0 SQ.MM", price: 18245, colors: SINGLE_COLOR },
  { id: "frlsh-6.0-180", category: "FRLSH", length: "180 MTR", size: "6.0 SQ.MM", price: 27405, colors: SINGLE_COLOR },

  // --- 4. FINOULTRA (90 MTR) --- [Page 3]
  { id: "finoultra-0.75-90", category: "Finoultra", length: "90 MTR", size: "0.75 SQ.MM", price: 2095, colors: SINGLE_COLOR },
  { id: "finoultra-1.0-90", category: "Finoultra", length: "90 MTR", size: "1.0 SQ.MM", price: 2700, colors: SINGLE_COLOR },
  { id: "finoultra-1.5-90", category: "Finoultra", length: "90 MTR", size: "1.5 SQ.MM", price: 3795, colors: SINGLE_COLOR },
  { id: "finoultra-2.5-90", category: "Finoultra", length: "90 MTR", size: "2.5 SQ.MM", price: 6155, colors: SINGLE_COLOR },
  { id: "finoultra-4.0-90", category: "Finoultra", length: "90 MTR", size: "4.0 SQ.MM", price: 9790, colors: SINGLE_COLOR },
  { id: "finoultra-6.0-90", category: "Finoultra", length: "90 MTR", size: "6.0 SQ.MM", price: 14515, colors: SINGLE_COLOR },

  // --- 5. 300/200 MTR FR --- [Page 5]
  { id: "fr-300-0.75", category: "300/200 Mtr FR", length: "300 MTR", size: "0.75 SQ.MM", price: 6310, colors: SINGLE_COLOR },
  { id: "fr-300-1.0", category: "300/200 Mtr FR", length: "300 MTR", size: "1.0 SQ.MM", price: 8255, colors: SINGLE_COLOR },
  { id: "fr-300-1.5", category: "300/200 Mtr FR", length: "300 MTR", size: "1.5 SQ.MM", price: 11960, colors: SINGLE_COLOR },
  { id: "fr-300-2.5", category: "300/200 Mtr FR", length: "300 MTR", size: "2.5 SQ.MM", price: 19730, colors: SINGLE_COLOR },
  { id: "fr-200-4.0", category: "300/200 Mtr FR", length: "200 MTR", size: "4.0 SQ.MM", price: 20505, colors: SINGLE_COLOR },
  { id: "fr-200-6.0", category: "300/200 Mtr FR", length: "200 MTR", size: "6.0 SQ.MM", price: 30815, colors: SINGLE_COLOR },

  // --- 6. 300/200 MTR FRLSH --- [Page 7]
  { id: "frlsh-300-0.75", category: "300/200 Mtr FRLSH", length: "300 MTR", size: "0.75 SQ.MM", price: 6375, colors: SINGLE_COLOR },
  { id: "frlsh-300-1.0", category: "300/200 Mtr FRLSH", length: "300 MTR", size: "1.0 SQ.MM", price: 8340, colors: SINGLE_COLOR },
  { id: "frlsh-300-1.5", category: "300/200 Mtr FRLSH", length: "300 MTR", size: "1.5 SQ.MM", price: 12080, colors: SINGLE_COLOR },
  { id: "frlsh-300-2.5", category: "300/200 Mtr FRLSH", length: "300 MTR", size: "19925", price: 19925, colors: SINGLE_COLOR },
  { id: "frlsh-200-4.0", category: "300/200 Mtr FRLSH", length: "200 MTR", size: "4.0 SQ.MM", price: 20710, colors: SINGLE_COLOR },
  { id: "frlsh-200-6.0", category: "300/200 Mtr FRLSH", length: "200 MTR", size: "6.0 SQ.MM", price: 31125, colors: SINGLE_COLOR },

  // --- 7. MULTI CORE 100 MTR - SINGLE CORE FR --- [Page 8]
  { id: "mc-sc-fr-0.5", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "0.5 SQ.MM", price: 1465, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-0.75", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "0.75 SQ.MM", price: 2115, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-1.0", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "1.0 SQ.MM", price: 2700, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-1.5", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "1.5 SQ.MM", price: 3995, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-2.5", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "2.5 SQ.MM", price: 6570, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-4.0", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "4.0 SQ.MM", price: 10010, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-6.0", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "6.0 SQ.MM", price: 15215, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-10", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "10 SQ.MM", price: 26245, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-16", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "16 SQ.MM", price: 40865, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-25", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "25 SQ.MM", price: 63890, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-35", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "35 SQ.MM", price: 89225, colors: SINGLE_COLOR },
  { id: "mc-sc-fr-50", category: "Multi Core (Single Core FR)", length: "100 MTR", size: "50 SQ.MM", price: 126520, colors: SINGLE_COLOR },

  // --- 8. MULTI CORE 100 MTR - SINGLE CORE FRLSH --- [Page 8]
  { id: "mc-sc-frlsh-0.5", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "0.5 SQ.MM", price: 1500, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-0.75", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "0.75 SQ.MM", price: 2170, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-1.0", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "1.0 SQ.MM", price: 2765, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-1.5", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "1.5 SQ.MM", price: 4095, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-2.5", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "2.5 SQ.MM", price: 6735, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-4.0", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "4.0 SQ.MM", price: 10260, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-6.0", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "15595", price: 15595, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-10", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "10 SQ.MM", price: 26900, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-16", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "16 SQ.MM", price: 41885, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-25", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "25 SQ.MM", price: 65485, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-35", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "35 SQ.MM", price: 91455, colors: SINGLE_COLOR },
  { id: "mc-sc-frlsh-50", category: "Multi Core (Single Core FRLSH)", length: "100 MTR", size: "50 SQ.MM", price: 129685, colors: SINGLE_COLOR },

  // --- 9. MULTI CORE 100 MTR - TWO CORE --- [Page 9]
  { id: "mc-2c-0.5", category: "Multi Core (2 Core)", length: "100 MTR", size: "0.5 SQ.MM", price: 3685, colors: SINGLE_COLOR },
  { id: "mc-2c-0.75", category: "Multi Core (2 Core)", length: "100 MTR", size: "0.75 SQ.MM", price: 5125, colors: SINGLE_COLOR },
  { id: "mc-2c-1.0", category: "Multi Core (2 Core)", length: "100 MTR", size: "1.0 SQ.MM", price: 6410, colors: SINGLE_COLOR },
  { id: "mc-2c-1.5", category: "Multi Core (2 Core)", length: "100 MTR", size: "1.5 SQ.MM", price: 8830, colors: SINGLE_COLOR },
  { id: "mc-2c-2.5", category: "Multi Core (2 Core)", length: "100 MTR", size: "2.5 SQ.MM", price: 14360, colors: SINGLE_COLOR },
  { id: "mc-2c-4.0", category: "Multi Core (2 Core)", length: "100 MTR", size: "4.0 SQ.MM", price: 22495, colors: SINGLE_COLOR },

  // --- 10. MULTI CORE 100 MTR - THREE CORE --- [Page 9]
  { id: "mc-3c-0.5", category: "Multi Core (3 Core)", length: "100 MTR", size: "0.5 SQ.MM", price: 5110, colors: SINGLE_COLOR },
  { id: "mc-3c-0.75", category: "Multi Core (3 Core)", length: "100 MTR", size: "0.75 SQ.MM", price: 7075, colors: SINGLE_COLOR },
  { id: "mc-3c-1.0", category: "Multi Core (3 Core)", length: "100 MTR", size: "1.0 SQ.MM", price: 8975, colors: SINGLE_COLOR },
  { id: "mc-3c-1.5", category: "Multi Core (3 Core)", length: "100 MTR", size: "1.5 SQ.MM", price: 12545, colors: SINGLE_COLOR },
  { id: "mc-3c-2.5", category: "Multi Core (3 Core)", length: "100 MTR", size: "2.5 SQ.MM", price: 20245, colors: SINGLE_COLOR },
  { id: "mc-3c-4.0", category: "Multi Core (3 Core)", length: "100 MTR", size: "4.0 SQ.MM", price: 32160, colors: SINGLE_COLOR },

  // --- 11. MULTI CORE 100 MTR - FOUR CORE --- [Page 9]
  { id: "mc-4c-0.5", category: "Multi Core (4 Core)", length: "100 MTR", size: "0.5 SQ.MM", price: 6545, colors: SINGLE_COLOR },
  { id: "mc-4c-0.75", category: "Multi Core (4 Core)", length: "100 MTR", size: "0.75 SQ.MM", price: 9100, colors: SINGLE_COLOR },
  { id: "mc-4c-1.0", category: "Multi Core (4 Core)", length: "100 MTR", size: "1.0 SQ.MM", price: 11585, colors: SINGLE_COLOR },
  { id: "mc-4c-1.5", category: "Multi Core (4 Core)", length: "100 MTR", size: "1.5 SQ.MM", price: 16535, colors: SINGLE_COLOR },
  { id: "mc-4c-2.5", category: "Multi Core (4 Core)", length: "100 MTR", size: "2.5 SQ.MM", price: 26985, colors: SINGLE_COLOR },
  { id: "mc-4c-4.0", category: "Multi Core (4 Core)", length: "100 MTR", size: "4.0 SQ.MM", price: 42355, colors: SINGLE_COLOR },

  // --- 12. MULTI CORE 100 MTR - SIX CORE --- [Page 9]
  { id: "mc-6c-0.5", category: "Multi Core (6 Core)", length: "100 MTR", size: "0.5 SQ.MM", price: 9745, colors: SINGLE_COLOR },
  { id: "mc-6c-0.75", category: "Multi Core (6 Core)", length: "100 MTR", size: "0.75 SQ.MM", price: 13835, colors: SINGLE_COLOR },
  { id: "mc-6c-1.0", category: "Multi Core (6 Core)", length: "100 MTR", size: "1.0 SQ.MM", price: 18055, colors: SINGLE_COLOR },
  { id: "mc-6c-1.5", category: "Multi Core (6 Core)", length: "100 MTR", size: "1.5 SQ.MM", price: 25205, colors: SINGLE_COLOR },
  { id: "mc-6c-2.5", category: "Multi Core (6 Core)", length: "100 MTR", size: "2.5 SQ.MM", price: 40545, colors: SINGLE_COLOR },
  { id: "mc-6c-4.0", category: "Multi Core (6 Core)", length: "100 MTR", size: "4.0 SQ.MM", price: 63905, colors: SINGLE_COLOR },

  // --- 13. SOLAR DC CABLE (100 MTR) --- [Page 23]
  { id: "solar-2.5-100", category: "Solar DC Cable", length: "100 MTR", size: "2.5 SQ.MM", price: 6185, colors: SINGLE_COLOR },
  { id: "solar-4.0-100", category: "Solar DC Cable", length: "100 MTR", size: "4.0 SQ.MM", price: 9605, colors: SINGLE_COLOR },
  { id: "solar-6.0-100", category: "Solar DC Cable", length: "100 MTR", size: "6.0 SQ.MM", price: 14010, colors: SINGLE_COLOR },

  // --- 14. CCTV CABLE --- [Page 14]
  { id: "cctv-rg59-3+1-90", category: "CCTV Cable", length: "90 MTR", size: "RG59 (3+1)", price: 4510, colors: SINGLE_COLOR },
  { id: "cctv-rg59-3+1-305", category: "CCTV Cable", length: "305 MTR", size: "RG59 (3+1)", price: 15284, colors: SINGLE_COLOR },
  { id: "cctv-genz-3+1-90", category: "CCTV Cable", length: "90 MTR", size: "GENZ 3+1", price: 2565, colors: SINGLE_COLOR },
  { id: "cctv-genz-3+1-180", category: "CCTV Cable", length: "180 MTR", size: "GENZ 3+1", price: 5050, colors: SINGLE_COLOR },
  { id: "cctv-rg59-4+1-90", category: "CCTV Cable", length: "90 MTR", size: "RG59 (4+1)", price: 4965, colors: SINGLE_COLOR },
  { id: "cctv-rg59-4+1-305", category: "CCTV Cable", length: "305 MTR", size: "RG59 (4+1)", price: 16826, colors: SINGLE_COLOR },
  { id: "cctv-genz-4+1-90", category: "CCTV Cable", length: "90 MTR", size: "GENZ 4+1", price: 2895, colors: SINGLE_COLOR },
  { id: "cctv-genz-4+1-180", category: "CCTV Cable", length: "180 MTR", size: "GENZ 4+1", price: 5730, colors: SINGLE_COLOR },

  // --- 15. SUB/FLAT 3-CORE --- [Page 19]
  { id: "subflat-1.5", category: "Sub/Flat 3-Core", length: "Per Coil/MTR", size: "1.5 SQ.MM (PVC)", price: 12640, colors: SINGLE_COLOR },
  { id: "subflat-2.5", category: "Sub/Flat 3-Core", length: "Per Coil/MTR", size: "2.5 SQ.MM (PVC)", price: 19975, colors: SINGLE_COLOR },
  { id: "subflat-4.0", category: "Sub/Flat 3-Core", length: "Per Coil/MTR", size: "4.0 SQ.MM (PVC)", price: 28670, colors: SINGLE_COLOR },
  { id: "subflat-6.0", category: "Sub/Flat 3-Core", length: "Per Coil/MTR", size: "4.0 SQ.MM (PVC)", price: 42540, colors: SINGLE_COLOR },
  { id: "subflat-10", category: "Sub/Flat 3-Core", length: "Per Coil/MTR", size: "10 SQ.MM (PVC)", price: 77930, colors: SINGLE_COLOR },
  { id: "subflat-16", category: "Sub/Flat 3-Core", length: "Per Coil/MTR", size: "16 SQ.MM (PVC)", price: 122870, colors: SINGLE_COLOR },

  // --- 16. TELEPHONE CABLE (90 MTR) --- [Page 15]
  { id: "tel-1p-0.4-90", category: "Telephone Cable", length: "90 MTR", size: "1 PAIR (0.4 SQ.MM)", price: 850, colors: SINGLE_COLOR },
  { id: "tel-1p-0.5-90", category: "Telephone Cable", length: "90 MTR", size: "1 PAIR (0.5 SQ.MM)", price: 1280, colors: SINGLE_COLOR },
  { id: "tel-2p-0.4-90", category: "Telephone Cable", length: "90 MTR", size: "2 PAIR (0.4 SQ.MM)", price: 1585, colors: SINGLE_COLOR },
  { id: "tel-2p-0.5-90", category: "Telephone Cable", length: "90 MTR", size: "2 PAIR (0.5 SQ.MM)", price: 2290, colors: SINGLE_COLOR },
  { id: "tel-3p-0.4-90", category: "Telephone Cable", length: "90 MTR", size: "3 PAIR (0.4 SQ.MM)", price: 2300, colors: SINGLE_COLOR },
  { id: "tel-3p-0.5-90", category: "Telephone Cable", length: "90 MTR", size: "3 PAIR (0.5 SQ.MM)", price: 3355, colors: SINGLE_COLOR },
  { id: "tel-4p-0.4-90", category: "Telephone Cable", length: "90 MTR", size: "4 PAIR (0.4 SQ.MM)", price: 2975, colors: SINGLE_COLOR },
  { id: "tel-4p-0.5-90", category: "Telephone Cable", length: "90 MTR", size: "4 PAIR (0.5 SQ.MM)", price: 4435, colors: SINGLE_COLOR },
  { id: "tel-5p-0.4-90", category: "Telephone Cable", length: "90 MTR", size: "5 PAIR (0.4 SQ.MM)", price: 3675, colors: SINGLE_COLOR },
  { id: "tel-5p-0.5-90", category: "Telephone Cable", length: "90 MTR", size: "5 PAIR (0.5 SQ.MM)", price: 5530, colors: SINGLE_COLOR },
  { id: "tel-10p-0.4-90", category: "Telephone Cable", length: "90 MTR", size: "10 PAIR (0.4 SQ.MM)", price: 7810, colors: SINGLE_COLOR },
  { id: "tel-10p-0.5-90", category: "Telephone Cable", length: "90 MTR", size: "10 PAIR (0.5 SQ.MM)", price: 11380, colors: SINGLE_COLOR },

  // --- 17. COAXIAL CABLES (JELLY) --- [Page 13]
  { id: "coax-rg59cu-100", category: "Coaxial Cable (Jelly)", length: "100 MTR", size: "RG-59 CU", price: 2345, colors: SINGLE_COLOR },
  { id: "coax-rg59cu-305", category: "Coaxial Cable (Jelly)", length: "305 MTR", size: "RG-59 CU", price: 7152, colors: SINGLE_COLOR },
  { id: "coax-rg6cu-100", category: "Coaxial Cable (Jelly)", length: "100 MTR", size: "RG-6 CU", price: 3270, colors: SINGLE_COLOR },
  { id: "coax-rg6cu-305", category: "Coaxial Cable (Jelly)", length: "305 MTR", size: "RG-6 CU", price: 9974, colors: SINGLE_COLOR },
  { id: "coax-rg11cu-100", category: "Coaxial Cable (Jelly)", length: "100 MTR", size: "RG-11 CU", price: 7630, colors: SINGLE_COLOR },
  { id: "coax-rg11cu-305", category: "Coaxial Cable (Jelly)", length: "305 MTR", size: "RG-11 CU", price: 23272, colors: SINGLE_COLOR },
  { id: "coax-rg6ccs-100", category: "Coaxial Cable (Jelly)", length: "100 MTR", size: "RG-6 CCS", price: 1760, colors: SINGLE_COLOR },
  { id: "coax-rg6ccs-90eco", category: "Coaxial Cable (Jelly)", length: "90M Eco Light", size: "RG-6 CCS", price: 1390, colors: SINGLE_COLOR },
  { id: "coax-rg6ccs-305", category: "Coaxial Cable (Jelly)", length: "305 MTR", size: "RG-6 CCS", price: 5368, colors: SINGLE_COLOR },
  { id: "coax-rg11ccs-100", category: "Coaxial Cable (Jelly)", length: "100 MTR", size: "RG-11 CCS", price: 3440, colors: SINGLE_COLOR },
  { id: "coax-rg11ccs-305", category: "Coaxial Cable (Jelly)", length: "305 MTR", size: "RG-11 CCS", price: 10492, colors: SINGLE_COLOR },
  { id: "coax-rg11cca-100", category: "Coaxial Cable (Jelly)", length: "100 MTR", size: "RG-11 CCA", price: 3950, colors: SINGLE_COLOR },
  { id: "coax-rg11cca-305", category: "Coaxial Cable (Jelly)", length: "305 MTR", size: "RG-11 CCA", price: 12048, colors: SINGLE_COLOR },

  // --- 18. UTP LAN CABLE (305 MTR) --- [Page 16]
  { id: "lan-cat6-305", category: "UTP LAN Cable", length: "305 MTR", size: "CAT6 4P", price: 17905, colors: SINGLE_COLOR },
  { id: "lan-cat5-305", category: "UTP LAN Cable", length: "305 MTR", size: "CAT5 4P", price: 13900, colors: SINGLE_COLOR },

  // --- 19. SPEAKER CABLES (100 MTR) --- [Page 17]
  { id: "spk-0.5-100", category: "Speaker Cable", length: "100 MTR", size: "0.5 SQ.MM", price: 2745, colors: SINGLE_COLOR },
  { id: "spk-0.75-100", category: "Speaker Cable", length: "100 MTR", size: "0.75 SQ.MM", price: 4005, colors: SINGLE_COLOR },
  { id: "spk-1.0-100", category: "Speaker Cable", length: "100 MTR", size: "1.0 SQ.MM", price: 4900, colors: SINGLE_COLOR },
  { id: "spk-1.5-100", category: "Speaker Cable", length: "100 MTR", size: "1.5 SQ.MM", price: 7355, colors: SINGLE_COLOR },
  { id: "spk-2.0-100", category: "Speaker Cable", length: "100 MTR", size: "2.0 SQ.MM", price: 11490, colors: SINGLE_COLOR },
  { id: "spk-2.5-100", category: "Speaker Cable", length: "100 MTR", size: "2.5 SQ.MM", price: 12245, colors: SINGLE_COLOR }
];

export const STORE_INFO = {
  name: "BODHILIGHTNING",
  location: "Perambalur",
  phone: "8940027894",
  whatsappPhone: "918940027894",
  priceListDate: "04 Sep 2026",
  gstPercentage: 18
};
